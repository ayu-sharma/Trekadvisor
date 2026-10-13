/**
 * Itinerary builder with route intelligence.
 *
 * Picking a destination is half the answer. This turns a chosen destination
 * plus a traveller profile into a day-by-day plan that (a) respects the
 * pace the traveller asked for, (b) doesn't zig-zag across the state, and
 * (c) puts the long drives on the days that can absorb them.
 */

import { DESTINATIONS_BY_SLUG, accessFrom } from "./destinations.js";
import { roadLink, originLabel } from "./geo.js";
import { scoreDestination, formatHours } from "./scoring.js";
import { tripDays, daysLabel } from "./profile.js";
import { optionLabel } from "./questions.js";

/** Pace determines how many bases, how far you drive, how full each day is. */
const PACE_RULES = {
  slow: { maxDriveHrs: 4, activitiesPerDay: 2, stopFactor: 4.5, label: "slow and relaxed" },
  balanced: { maxDriveHrs: 5.5, activitiesPerDay: 3, stopFactor: 3.2, label: "balanced" },
  explore: { maxDriveHrs: 7, activitiesPerDay: 3, stopFactor: 2.4, label: "keep-moving" },
  packed: { maxDriveHrs: 8, activitiesPerDay: 4, stopFactor: 2.2, label: "adventure-packed" },
};

const SLOTS = {
  1: ["Afternoon"],
  2: ["Morning", "Afternoon"],
  3: ["Morning", "Afternoon", "Evening"],
  4: ["Early start", "Late morning", "Afternoon", "Evening"],
};

const PACE_TAG_PREFERENCE = {
  slow: ["chill", "easy", "slow", "food", "nature", "water", "view"],
  balanced: ["view", "culture", "nature", "easy", "food", "hike"],
  explore: ["view", "drive", "culture", "offbeat", "hike", "trek"],
  packed: ["trek", "adventure", "drive", "hike", "view", "camp"],
};

const WANT_TAG_PREFERENCE = {
  mountains: ["view", "drive", "trek"],
  peace: ["nature", "chill", "slow", "water", "easy"],
  cafes: ["food", "chill", "culture"],
  adventure: ["adventure", "trek", "camp", "water"],
};

function rules(answers) {
  const base = PACE_RULES[answers.pace] || PACE_RULES.balanced;
  const avoid = new Set(answers.avoid || []);
  return {
    ...base,
    maxDriveHrs: avoid.has("drives")
      ? Math.min(base.maxDriveHrs, 4)
      : base.maxDriveHrs,
  };
}

/* ------------------------------------------------------------------ */
/* Choosing the stops                                                  */
/* ------------------------------------------------------------------ */

function candidateSlugs(anchor) {
  const set = new Set(anchor.nearby || []);
  (anchor.nearby || []).forEach((slug) => {
    const n = DESTINATIONS_BY_SLUG[slug];
    (n?.nearby || []).forEach((s) => {
      if (s !== anchor.slug) set.add(s);
    });
  });
  return [...set];
}

function chooseStops(anchor, answers, today) {
  const r = rules(answers);
  const days = tripDays(answers);
  const nights = days - 1;
  const maxStops = Math.max(
    1,
    Math.min(Math.floor(days / r.stopFactor) + 1, nights, 5)
  );

  const stops = [anchor];
  const rejected = [];
  // Moves, not stops: hopping to a village 20 minutes away is not the same
  // as changing valleys, so short hops only cost half a move.
  let moveBudget = maxStops - 1;
  if (moveBudget <= 0) {
    return { stops, rejected, maxStops };
  }

  const pool = candidateSlugs(anchor)
    .map((slug) => DESTINATIONS_BY_SLUG[slug])
    .filter(Boolean)
    .map((d) => ({
      destination: d,
      score: scoreDestination(d, answers, today).raw,
    }));

  while (moveBudget > 0 && pool.length) {
    let best = null;
    pool.forEach((cand) => {
      if (stops.find((s) => s.slug === cand.destination.slug)) return;
      // Distance from the nearest already-chosen stop: adding a place that is
      // a short hop from something on the route is cheap; a place on the far
      // side of the state is not.
      const hop = Math.min(
        ...stops.map((s) => roadLink(s.slug, cand.destination.slug).hrs)
      );
      if (hop > r.maxDriveHrs) {
        rejected.push({
          name: cand.destination.name,
          reason: `${formatHours(hop)} from the rest of the route — too far for a ${r.label} trip`,
        });
        return;
      }
      const value = cand.score - hop * 0.05;
      if (!best || value > best.value) best = { ...cand, hop, value };
    });
    if (!best) break;
    stops.push(best.destination);
    moveBudget -= best.hop <= 1.5 ? 0.5 : 1;
    // Drop it from the pool
    const i = pool.findIndex((p) => p.destination.slug === best.destination.slug);
    if (i >= 0) pool.splice(i, 1);
  }

  return { stops, rejected: dedupeRejected(rejected), maxStops };
}

function dedupeRejected(list) {
  const seen = new Set();
  return list.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });
}

/** Nearest-neighbour ordering from the starting point — no zig-zagging. */
function orderStops(stops, answers) {
  const remaining = [...stops];
  const ordered = [];
  let currentSlug = null;

  while (remaining.length) {
    let bestIndex = 0;
    let bestHrs = Infinity;
    remaining.forEach((d, i) => {
      const hrs = currentSlug
        ? roadLink(currentSlug, d.slug).hrs
        : accessFrom(d, answers.from).hrs;
      if (hrs < bestHrs) {
        bestHrs = hrs;
        bestIndex = i;
      }
    });
    const next = remaining.splice(bestIndex, 1)[0];
    ordered.push(next);
    currentSlug = next.slug;
  }
  return ordered;
}

function buildLegs(ordered, answers) {
  const legs = [];
  ordered.forEach((d, i) => {
    if (i === 0) {
      const a = accessFrom(d, answers.from);
      legs.push({
        from: originLabel(answers.from),
        to: d.name,
        km: a.km,
        hrs: a.hrs,
        kind: "inbound",
      });
    } else {
      const link = roadLink(ordered[i - 1].slug, d.slug);
      legs.push({
        from: ordered[i - 1].name,
        to: d.name,
        km: link.km,
        hrs: link.hrs,
        estimated: link.estimated,
        kind: "transfer",
      });
    }
  });
  const last = ordered[ordered.length - 1];
  const back = accessFrom(last, answers.from);
  legs.push({
    from: last.name,
    to: originLabel(answers.from),
    km: back.km,
    hrs: back.hrs,
    kind: "return",
  });
  return legs;
}

/** Trim stops until the total road time fits the trip and the pace. */
function trimForRoadTime(ordered, answers, anchorSlug) {
  const r = rules(answers);
  const days = tripDays(answers);
  // The drive in and the drive home are unavoidable; only the transfers
  // between bases are ours to spend. Budget them against the days that are
  // actually free to move.
  const budget = Math.max(1, days - 2) * r.maxDriveHrs * 0.5;
  const dropped = [];

  const transferHours = (list) =>
    buildLegs(list, answers)
      .filter((l) => l.kind === "transfer")
      .reduce((sum, l) => sum + l.hrs, 0);

  let stops = [...ordered];
  while (stops.length > 1) {
    const total = transferHours(stops);
    if (total <= budget) break;
    // Drop the stop that costs the most road time, never the anchor.
    let worst = null;
    stops.forEach((s, i) => {
      if (s.slug === anchorSlug) return;
      const trial = stops.filter((_, j) => j !== i);
      const saved = total - transferHours(trial);
      if (!worst || saved > worst.saved) worst = { index: i, saved, stop: s };
    });
    if (!worst) break;
    dropped.push({
      name: worst.stop.name,
      reason: `it pushed the driving between stops past ${Math.round(
        budget
      )} hrs, which is more than a ${r.label} ${days}-day trip should carry`,
    });
    stops.splice(worst.index, 1);
  }
  return { stops, dropped };
}

/** Nights per stop: the anchor gets the most, everyone else at least one. */
function allocateNights(ordered, anchorSlug, totalNights) {
  const nights = ordered.map(() => 1);
  let left = totalNights - ordered.length;
  const anchorIndex = ordered.findIndex((d) => d.slug === anchorSlug);
  let i = 0;
  while (left > 0) {
    const target = i === 0 ? Math.max(anchorIndex, 0) : i % ordered.length;
    nights[target] += 1;
    left -= 1;
    i += 1;
  }
  return nights;
}

/* ------------------------------------------------------------------ */
/* Filling the days                                                    */
/* ------------------------------------------------------------------ */

function activityPool(stop, answers, otherStopNames = []) {
  const avoid = new Set(answers.avoid || []);
  // Don't sell someone a day trip to a place they're sleeping in later.
  const elsewhere = otherStopNames
    .flatMap((n) => n.split(/[&,]/).map((part) => part.trim().toLowerCase()))
    .filter((n) => n.length > 3);
  const paceTags = PACE_TAG_PREFERENCE[answers.pace] || PACE_TAG_PREFERENCE.balanced;
  const wantTags = WANT_TAG_PREFERENCE[answers.want] || [];

  return (stop.thingsToDo || [])
    .filter((t) => {
      const tags = t.tags || [];
      if (avoid.has("trek") && (tags.includes("trek") || tags.includes("hike")))
        return false;
      if (avoid.has("drives") && tags.includes("drive")) return false;
      const lower = t.name.toLowerCase();
      if (elsewhere.some((n) => lower.includes(n))) return false;
      return true;
    })
    .map((t) => {
      const tags = t.tags || [];
      let score = 0;
      tags.forEach((tag) => {
        const pi = paceTags.indexOf(tag);
        if (pi >= 0) score += 3 - pi * 0.3;
        if (wantTags.includes(tag)) score += 2;
      });
      return { ...t, score };
    })
    .sort((a, b) => b.score - a.score);
}

const FILLERS = {
  morning: [
    { name: "Slow morning at your stay", note: "Chai on the balcony, nowhere to be." },
    { name: "Village walk before breakfast", note: "The hour when the place belongs to the people who live there." },
  ],
  day: [
    { name: "Café afternoon", note: "Books, coffee, and the valley doing nothing in particular." },
    { name: "Unplanned wander", note: "Deliberately empty time — the part people remember." },
  ],
  evening: [
    { name: "Dinner where you're staying", note: "Order a few hours ahead; most kitchens here cook to order." },
    { name: "Bonfire and an early night", note: "It gets dark and cold quickly at this altitude." },
  ],
};

function fillerFor(stop, slot, index) {
  const bucket =
    slot === "Morning" || slot === "Early start" || slot === "Late morning"
      ? "morning"
      : slot === "Evening"
        ? "evening"
        : "day";
  const list = FILLERS[bucket];
  const pick = list[index % list.length];
  if (bucket === "evening" && stop.food && stop.food.length) {
    const f = stop.food[index % stop.food.length];
    return { name: `Dinner: ${f.name}`, note: f.note };
  }
  return pick;
}

/**
 * A 20-hour drive is not a day, it's two. Find the best place on our map to
 * break the journey: roughly halfway by road time, and genuinely on the way.
 */
function findHalt(destination, answers, legHours) {
  const target = legHours / 2;
  let best = null;
  Object.values(DESTINATIONS_BY_SLUG).forEach((d) => {
    if (d.slug === destination.slug) return;
    const toHalt = accessFrom(d, answers.from).hrs;
    const onward = roadLink(d.slug, destination.slug).hrs;
    if (toHalt + onward > legHours * 1.35) return; // a detour, not a halt
    if (toHalt < 2 || toHalt > legHours - 2) return;
    const cost = Math.abs(toHalt - target);
    if (!best || cost < best.cost) {
      best = { destination: d, cost, inHrs: toHalt, onHrs: onward, inKm: accessFrom(d, answers.from).km };
    }
  });
  return best;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function buildItinerary(answers, anchorSlug, options = {}) {
  const today = options.today || new Date();
  const anchor = DESTINATIONS_BY_SLUG[anchorSlug];
  if (!anchor) return null;

  const r = rules(answers);
  const days = tripDays(answers);
  const totalNights = days - 1;

  const chosen = chooseStops(anchor, answers, today);
  const ordered0 = orderStops(chosen.stops, answers);
  const trimmed = trimForRoadTime(ordered0, answers, anchorSlug);
  let ordered = trimmed.stops;

  // Never plan more bases than there are nights.
  if (ordered.length > totalNights) {
    ordered = ordered.slice(0, Math.max(1, totalNights));
  }

  let legs = buildLegs(ordered, answers);

  // Long approaches eat a night of their own. Reserve those first, so a
  // 9-day trip stays a 9-day trip.
  const LONG_LEG = 11;
  const inboundLeg = legs[0];
  const returnLeg = legs[legs.length - 1];
  let inboundHalt =
    inboundLeg.hrs > LONG_LEG ? findHalt(ordered[0], answers, inboundLeg.hrs) : null;
  let returnHalt =
    returnLeg.hrs > LONG_LEG
      ? findHalt(ordered[ordered.length - 1], answers, returnLeg.hrs)
      : null;

  // A halt costs a night. On a trip this short there is nothing to spare —
  // the honest answer is that the destination is too far, which the match
  // score already says, so we just drop the halt rather than inventing days.
  const affordableHalts = Math.max(0, totalNights - 1);
  if (affordableHalts < 2) {
    if (affordableHalts === 0) {
      inboundHalt = null;
      returnHalt = null;
    } else if (inboundHalt && returnHalt) {
      returnHalt = null;
    }
  }
  const haltNights = (inboundHalt ? 1 : 0) + (returnHalt ? 1 : 0);

  // If halts leave too few nights for the bases we picked, drop the weakest.
  while (ordered.length > 1 && ordered.length > totalNights - haltNights) {
    const lastIndex = ordered.length - 1;
    const removable = ordered[lastIndex].slug === anchorSlug ? lastIndex - 1 : lastIndex;
    ordered = ordered.filter((_, i) => i !== removable);
  }
  legs = buildLegs(ordered, answers);

  const stopNights = Math.max(ordered.length, totalNights - haltNights);
  const nights = allocateNights(ordered, anchorSlug, stopNights);

  const pools = {};
  const usedActivities = new Set();
  ordered.forEach((s) => {
    pools[s.slug] = activityPool(
      s,
      answers,
      ordered.filter((o) => o.slug !== s.slug).map((o) => o.name)
    );
  });

  // Neighbouring valleys share attractions (Serolsar Lake belongs to both
  // Jibhi and Shoja). Don't put the same thing on two different days.
  const usedTokens = new Set();
  const STOPWORDS = new Set([
    "the", "and", "from", "with", "walk", "trek", "drive", "point", "village",
    "villages", "valley", "day", "trip", "tour", "visit", "hike", "road",
  ]);
  const tokensOf = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length >= 5 && !STOPWORDS.has(t));
  const alreadySeen = (name) => tokensOf(name).some((t) => usedTokens.has(t));
  const remember = (name) => tokensOf(name).forEach((t) => usedTokens.add(t));

  const take = (stop, count, opts = {}) => {
    const full = pools[stop.slug] || [];
    const pool = opts.easyOnly
      ? full.filter(
          (t) =>
            !(t.tags || []).some((tag) =>
              ["trek", "camp", "adventure"].includes(tag)
            )
        )
      : full;
    const slots = SLOTS[Math.min(count, 4)] || SLOTS[3];
    return slots.slice(0, count).map((slot, idx) => {
      let real = null;
      while (!real) {
        const candidate = pool.find(
          (t) => !usedActivities.has(t.name) && !alreadySeen(t.name)
        );
        if (!candidate) break;
        usedActivities.add(candidate.name);
        real = candidate;
      }
      if (real) {
        remember(real.name);
        return { slot, name: real.name, note: real.note };
      }
      return { slot, ...fillerFor(stop, slot, idx + usedActivities.size) };
    });
  };

  const dayPlans = [];
  let dayNumber = 1;

  if (inboundHalt) {
    dayPlans.push({
      day: dayNumber++,
      kind: "halt",
      base: inboundHalt.destination,
      travel: {
        from: originLabel(answers.from),
        to: inboundHalt.destination.name,
        km: inboundHalt.inKm,
        hrs: inboundHalt.inHrs,
        kind: "inbound",
      },
      title: `${originLabel(answers.from)} → ${inboundHalt.destination.name}`,
      subtitle: `Night halt — ${formatHours(
        inboundLeg.hrs
      )} in one day isn't a holiday, it's an endurance test.`,
      items: [],
      note: `Break the drive here and start fresh. ${formatHours(
        inboundHalt.onHrs
      )} left to ${ordered[0].name} tomorrow.`,
    });
  }

  ordered.forEach((stop, stopIndex) => {
    const leg = legs[stopIndex];
    const effectiveHrs =
      stopIndex === 0 && inboundHalt ? inboundHalt.onHrs : leg.hrs;
    const arrivalActivities =
      effectiveHrs >= 9 ? 0 : effectiveHrs >= 5 ? 1 : Math.min(2, r.activitiesPerDay);

    dayPlans.push({
      day: dayNumber++,
      kind: stopIndex === 0 ? "inbound" : "transfer",
      base: stop,
      travel:
        stopIndex === 0 && inboundHalt
          ? {
              from: inboundHalt.destination.name,
              to: stop.name,
              km: Math.max(leg.km - inboundHalt.inKm, 40),
              hrs: inboundHalt.onHrs,
              kind: "inbound",
            }
          : leg,
      title:
        stopIndex === 0 && inboundHalt
          ? `${inboundHalt.destination.name} → ${stop.name}`
          : `${leg.from} → ${stop.name}`,
      subtitle:
        effectiveHrs >= 9
          ? "A full day on the road. Arrive, eat, sleep."
          : effectiveHrs >= 5
            ? "Drive in, settle, one easy thing before dark."
            : "Short hop — most of the day is yours.",
      items: arrivalActivities
        ? take(stop, arrivalActivities, { easyOnly: true })
        : [],
      note: null,
    });

    for (let k = 1; k < nights[stopIndex]; k += 1) {
      dayPlans.push({
        day: dayNumber++,
        kind: "base",
        base: stop,
        title: stop.name,
        subtitle: `${stop.region} · full day`,
        items: take(stop, r.activitiesPerDay),
        note: null,
      });
    }
  });

  if (returnHalt) {
    dayPlans.push({
      day: dayNumber++,
      kind: "halt",
      base: returnHalt.destination,
      travel: {
        from: ordered[ordered.length - 1].name,
        to: returnHalt.destination.name,
        km: Math.max(returnLeg.km - returnHalt.inKm, 40),
        hrs: returnHalt.onHrs,
        kind: "return",
      },
      title: `${ordered[ordered.length - 1].name} → ${returnHalt.destination.name}`,
      subtitle: "Start the journey home, but only half of it.",
      items: [],
      note: `${formatHours(returnHalt.inHrs)} to ${originLabel(
        answers.from
      )} in the morning.`,
    });
  }

  dayPlans.push({
    day: dayNumber++,
    kind: "return",
    base: null,
    travel: returnHalt
      ? {
          from: returnHalt.destination.name,
          to: originLabel(answers.from),
          km: returnHalt.inKm,
          hrs: returnHalt.inHrs,
          kind: "return",
        }
      : returnLeg,
    title: returnHalt
      ? `${returnHalt.destination.name} → ${originLabel(answers.from)}`
      : `${returnLeg.from} → ${returnLeg.to}`,
    subtitle:
      (returnHalt ? returnHalt.inHrs : returnLeg.hrs) >= 9
        ? "Leave early. This is a full driving day."
        : "Head back, with a stop for lunch on the way.",
    items: [],
    note: null,
  });

  const totals = {
    km: legs.reduce((s, l) => s + l.km, 0),
    driveHours: Math.round(legs.reduce((s, l) => s + l.hrs, 0) * 2) / 2,
    nights: totalNights,
    stops: ordered.length,
    days: dayPlans.length,
  };

  // Say it out loud when the plan is mostly road.
  const warnings = [];
  if (totals.driveHours > totals.days * 5) {
    warnings.push(
      `This trip is ${totals.driveHours} hrs of driving across ${totals.days} days. You'd be spending more of it on the road than in the mountains — either give it more days, or pick somewhere closer.`
    );
  }

  const notes = buildNotes({
    answers,
    r,
    ordered,
    legs,
    totals,
    halts: [inboundHalt, returnHalt].filter(Boolean),
    dropped: [...trimmed.dropped, ...chosen.rejected],
  });

  return {
    anchor,
    stops: ordered.map((d, i) => ({ destination: d, nights: nights[i] })),
    route: [originLabel(answers.from), ...ordered.map((d) => d.name), originLabel(answers.from)],
    legs,
    days: dayPlans,
    totals,
    notes,
    warnings,
    considered: [...trimmed.dropped, ...chosen.rejected].slice(0, 4),
    paceLabel: r.label,
    title: `Your ${days}-day ${anchor.region.split(",")[0]} trip`,
    daysLabel: daysLabel(answers),
  };
}

function buildNotes({ answers, r, ordered, legs, totals, dropped, halts = [] }) {
  const notes = [];
  const pace = answers.pace ? optionLabel("pace", answers.pace) : null;

  if (ordered.length === 1) {
    notes.push(
      `One base for the whole trip. With ${totals.nights} nights${
        pace ? ` and a ${pace.toLowerCase()} pace` : ""
      }, moving hotels would cost you more than it gives you.`
    );
  } else {
    notes.push(
      `${ordered.length} bases, ordered so you're always driving further out and then home — no backtracking.`
    );
  }

  if (halts.length) {
    notes.push(
      `The approach is long enough that we've built in a night at ${halts
        .map((h) => h.destination.name)
        .join(" and ")} rather than pretending you can drive it in a day.`
    );
  }

  const longest = [...legs].sort((a, b) => b.hrs - a.hrs)[0];
  notes.push(
    `Longest single drive is ${formatHours(longest.hrs)} (${longest.from} → ${
      longest.to
    }), and it sits on a travel day rather than in the middle of your trip.`
  );

  if ((answers.avoid || []).includes("drives")) {
    notes.push(
      `You said you'd rather avoid long drives, so every transfer here is under ${formatHours(
        r.maxDriveHrs
      )}.`
    );
  }

  notes.push(
    `${totals.driveHours} hrs of driving in total across ${totals.days} days — about ${
      Math.round((totals.driveHours / totals.days) * 10) / 10
    } hrs a day on average.`
  );

  if (dropped.length) {
    const first = dropped[0];
    notes.push(
      `We considered ${first.name} and left it out — ${first.reason}.`
    );
  }

  return notes;
}

export { PACE_RULES };
