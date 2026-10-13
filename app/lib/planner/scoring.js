/**
 * The recommendation engine.
 *
 * A traveller profile is scored against every destination's attribute
 * profile, factor by factor. Nothing is precomputed and nothing is
 * enumerated: change a weight below and every one of the 4,096+ possible
 * answer combinations changes with it.
 *
 * To add a new question to the engine: add it to `questions.js`, then add a
 * factor here. Questions without a factor are collected but don't score.
 */

import { DESTINATIONS, accessFrom } from "./destinations.js";
import { optionLabel } from "./questions.js";
import {
  seasonInfo,
  flexibleScore,
  bestMonth,
  isColdMonth,
  monthLabel,
} from "./seasons.js";
import { roadLink, originLabel } from "./geo.js";
import {
  tripDays,
  daysLabel,
  season as resolveSeason,
  GROUP_PHRASE,
  WANT_PHRASE,
  PACE_PHRASE,
} from "./profile.js";

/**
 * Factor weights. These are the dials — they're relative, not percentages,
 * and the engine renormalises over whichever factors apply.
 */
export const WEIGHTS = {
  want: 24,
  group: 16,
  pace: 14,
  days: 12,
  season: 12,
  feasibility: 12,
  budget: 10,
};

/** How much one-way road time a trip of each length can absorb. */
const ROAD_TIME_BUDGET = { d23: 5, d45: 8, d67: 11, d8p: 16 };

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ------------------------------------------------------------------ */
/* Factors                                                             */
/* ------------------------------------------------------------------ */

export const FACTORS = [
  {
    id: "want",
    label: "What you want",
    weight: WEIGHTS.want,
    applies: (ctx) => Boolean(ctx.answers.want),
    score: (d, ctx) => {
      const v = d.interests[ctx.answers.want] ?? 5;
      return {
        value: v / 10,
        note: `${optionLabel("want", ctx.answers.want)} — ${v}/10 here`,
      };
    },
  },
  {
    id: "group",
    label: "Who's travelling",
    weight: WEIGHTS.group,
    applies: (ctx) => Boolean(ctx.answers.group),
    score: (d, ctx) => {
      const v = d.groups[ctx.answers.group] ?? 5;
      const g = optionLabel("group", ctx.answers.group);
      return {
        value: v / 10,
        note:
          v >= 9
            ? `One of the best places in our set for ${g.toLowerCase()} trips`
            : v >= 7
              ? `Works well for ${g.toLowerCase()} trips`
              : `Not really built for ${g.toLowerCase()} trips`,
      };
    },
  },
  {
    id: "pace",
    label: "Your pace",
    weight: WEIGHTS.pace,
    applies: (ctx) => Boolean(ctx.answers.pace),
    score: (d, ctx) => {
      const v = d.pace[ctx.answers.pace] ?? 5;
      return {
        value: v / 10,
        note: `${optionLabel("pace", ctx.answers.pace)} — ${
          v >= 9
            ? "exactly how this place is best used"
            : v >= 7
              ? "a good fit"
              : "you'd be fighting the place a little"
        }`,
      };
    },
  },
  {
    id: "days",
    label: "Trip length",
    weight: WEIGHTS.days,
    applies: (ctx) => Boolean(ctx.answers.days),
    score: (d, ctx) => {
      const v = d.duration[ctx.answers.days] ?? 5;
      return {
        value: v / 10,
        note: `${daysLabel(ctx.answers)} — ideal here is ${d.idealDays}`,
      };
    },
  },
  {
    id: "season",
    label: "Season",
    weight: WEIGHTS.season,
    applies: () => true,
    score: (d, ctx) => {
      if (ctx.season.mode === "flexible") {
        const v = flexibleScore(d);
        const best = bestMonth(d);
        return {
          value: v / 10,
          note: `Dates open — scored on its best window (${monthLabel(best)})`,
        };
      }
      const primary = seasonInfo(d, ctx.season.month);
      const secondary =
        ctx.season.secondary !== undefined
          ? seasonInfo(d, ctx.season.secondary)
          : null;
      const v = secondary
        ? (primary.score + secondary.score) / 2
        : primary.score;
      return {
        value: v / 10,
        note: `${ctx.season.label}: ${primary.note}`,
      };
    },
  },
  {
    id: "feasibility",
    label: "Getting there",
    weight: WEIGHTS.feasibility,
    applies: (ctx) => Boolean(ctx.answers.days),
    score: (d, ctx) => {
      const { hrs } = ctx.access;
      const allowed = ROAD_TIME_BUDGET[ctx.answers.days] ?? 8;
      const value =
        hrs <= allowed
          ? clamp(1 - (hrs / allowed) * 0.25, 0.75, 1)
          : clamp(1 - (hrs - allowed) / (allowed * 0.9), 0, 0.75);
      const from = originLabel(ctx.answers.from);
      const assumed = ctx.access.assumed
        ? " (averaged from Delhi and Chandigarh, since you haven't picked a start)"
        : "";
      return {
        value,
        note:
          hrs <= allowed
            ? `${formatHours(hrs)} from ${from} — comfortable for ${daysLabel(
                ctx.answers
              ).toLowerCase()}${assumed}`
            : `${formatHours(hrs)} from ${from} — a lot of road for ${daysLabel(
                ctx.answers
              ).toLowerCase()}${assumed}`,
      };
    },
  },
  {
    id: "budget",
    label: "Budget",
    weight: WEIGHTS.budget,
    applies: (ctx) => Boolean(ctx.answers.budget),
    score: (d, ctx) => {
      const b = d.budget;
      const a = ctx.answers.budget;
      const v =
        a === "unsure"
          ? b.backpacker * 0.3 + b.comfortable * 0.5 + b.premium * 0.2
          : (b[a] ?? 5);
      return {
        value: v / 10,
        note:
          a === "unsure"
            ? `Works across budgets — comfortable is ${d.dailyBudget.comfortable} a day`
            : `${optionLabel("budget", a)} — around ${
                d.dailyBudget[a] === "—"
                  ? "not really an option here"
                  : `${d.dailyBudget[a]} a day`
              }`,
      };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Penalties — the "things I want to avoid" answer                     */
/* ------------------------------------------------------------------ */

export const AVOIDANCES = {
  drives: (d, ctx) => {
    const { hrs } = ctx.access;
    if (hrs > 12)
      return {
        amount: 0.16,
        note: `${formatHours(hrs)} of driving each way from ${originLabel(
          ctx.answers.from
        )}`,
      };
    if (hrs > 8)
      return { amount: 0.09, note: `${formatHours(hrs)} each way is a long haul` };
    return null;
  },
  crowds: (d) => {
    if (d.levels.crowd >= 8)
      return { amount: 0.13, note: "This is one of the busier places in the state" };
    if (d.levels.crowd >= 6)
      return { amount: 0.06, note: "Gets busy in peak season and on weekends" };
    return null;
  },
  trek: (d) => {
    if (d.trekEssential)
      return { amount: 0.28, note: "You can only get here on foot" };
    if (d.levels.adventure >= 9)
      return { amount: 0.06, note: "Most of the good stuff here involves walking" };
    return null;
  },
  nightlife: (d) => {
    if (d.levels.nightlife >= 8)
      return { amount: 0.12, note: "There's a party scene here whether you want it or not" };
    if (d.levels.nightlife >= 6)
      return { amount: 0.05, note: "Some late-night café and music scene" };
    return null;
  },
  cold: (d, ctx) => {
    const month =
      ctx.season.mode === "flexible" ? bestMonth(d) : ctx.season.month;
    if (isColdMonth(d, month))
      return {
        amount: d.altitudeM >= 2800 ? 0.16 : 0.09,
        note: `At ${d.altitude} in ${monthLabel(month)}, nights go below freezing`,
      };
    if (d.altitudeM >= 3000)
      return { amount: 0.05, note: `It's ${d.altitude} — nights are cold year-round` };
    return null;
  },
};

function formatHours(hrs) {
  if (hrs < 1) return `${Math.round(hrs * 60)} min`;
  const whole = Math.floor(hrs);
  const half = hrs - whole >= 0.5;
  if (whole === 1 && !half) return "1 hr";
  return `${whole}${half ? ".5" : ""} hrs`;
}

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

function buildContext(answers, today) {
  return {
    answers,
    season: resolveSeason(answers, today),
    days: tripDays(answers),
  };
}

/** Score one destination against one profile. */
export function scoreDestination(destination, answers, today = new Date()) {
  const ctx = buildContext(answers, today);
  ctx.access = accessFrom(destination, answers.from);

  const factors = [];
  let weighted = 0;
  let totalWeight = 0;

  FACTORS.forEach((f) => {
    if (!f.applies(ctx)) return;
    const { value, note } = f.score(destination, ctx);
    factors.push({
      id: f.id,
      label: f.label,
      weight: f.weight,
      value: clamp(value, 0, 1),
      note,
    });
    weighted += clamp(value, 0, 1) * f.weight;
    totalWeight += f.weight;
  });

  const base = totalWeight ? weighted / totalWeight : 0.5;

  const penalties = [];
  (answers.avoid || []).forEach((id) => {
    const fn = AVOIDANCES[id];
    if (!fn) return;
    const hit = fn(destination, ctx);
    if (hit)
      penalties.push({
        id,
        label: optionLabel("avoid", id),
        amount: hit.amount,
        note: hit.note,
      });
  });

  const penalty = penalties.reduce((sum, p) => sum + p.amount, 0);
  const raw = clamp(base - penalty, 0.02, 0.99);

  return {
    destination,
    raw,
    base,
    match: Math.round(clamp(raw, 0.28, 0.98) * 100),
    factors: factors.sort((a, b) => b.value * b.weight - a.value * a.weight),
    penalties,
    access: ctx.access,
    season: ctx.season,
    seasonNote:
      ctx.season.mode === "flexible"
        ? seasonInfo(destination, bestMonth(destination))
        : seasonInfo(destination, ctx.season.month),
  };
}

/**
 * Rank every destination for a profile.
 *
 * For longer trips we add a small cluster bonus: a valley whose neighbours
 * also suit you is a better answer than an equally good place with nothing
 * around it, because it can carry a multi-stop route.
 */
export function recommend(answers, options = {}) {
  const { limit = 5, today = new Date(), diversify = true } = options;

  const scored = DESTINATIONS.map((d) => scoreDestination(d, answers, today));
  const byslug = {};
  scored.forEach((s) => {
    byslug[s.destination.slug] = s;
  });

  const wantsRoute = answers.days === "d67" || answers.days === "d8p";
  scored.forEach((s) => {
    const partners = (s.destination.nearby || [])
      .map((slug) => byslug[slug])
      .filter(Boolean)
      .map((p) => ({
        slug: p.destination.slug,
        name: p.destination.name,
        raw: p.raw,
        link: roadLink(s.destination.slug, p.destination.slug),
      }))
      .filter((p) => p.link.hrs <= 5)
      .sort((a, b) => b.raw - a.raw);

    s.pairsWith = partners.slice(0, 2);
    if (wantsRoute && partners.length) {
      const bonus = Math.min(0.05, partners[0].raw * 0.05);
      s.raw = clamp(s.raw + bonus, 0.02, 0.99);
      s.match = Math.round(clamp(s.raw, 0.28, 0.98) * 100);
      s.routeBonus = bonus;
    }
  });

  scored.sort(
    (a, b) => b.raw - a.raw || a.destination.name.localeCompare(b.destination.name)
  );

  let picks = scored.slice(0, limit);

  // Keep one genuinely different option in view, so the list isn't five
  // versions of the same valley.
  if (diversify && picks.length === limit && limit >= 3) {
    const cluster = picks.map((p) => p.destination.slug);
    const allClose = cluster.every((slug) =>
      cluster.every((other) => roadLink(slug, other).hrs <= 4)
    );
    if (allClose) {
      const outsider = scored.find(
        (s) =>
          !cluster.includes(s.destination.slug) &&
          cluster.every((slug) => roadLink(slug, s.destination.slug).hrs > 4)
      );
      if (outsider) {
        outsider.alternative = true;
        picks = [...picks.slice(0, limit - 1), outsider];
      }
    }
  }

  picks.forEach((p, i) => {
    p.rank = i + 1;
    p.why = explain(p, answers);
    p.tags = deriveTags(p, answers);
  });

  return picks;
}

/* ------------------------------------------------------------------ */
/* Explanation                                                         */
/* ------------------------------------------------------------------ */

/** Human-readable "why did I get this" for a scored destination. */
export function explain(scored, answers) {
  const d = scored.destination;
  const profileBits = [];
  if (answers.group) profileBits.push(`you're ${GROUP_PHRASE[answers.group]}`);
  if (answers.days) profileBits.push(`have ${daysLabel(answers).toLowerCase()}`);
  if (answers.want) profileBits.push(`want ${WANT_PHRASE[answers.want]}`);
  if (answers.pace) profileBits.push(PACE_WANT_PHRASE[answers.pace]);

  const said = profileBits.length
    ? `You said ${joinList(profileBits)}.`
    : "";

  const strength = `${d.name} — ${d.tagline} — lines up with that`;
  const roadHeavy =
    scored.access && scored.access.hrs > (ROAD_TIME_BUDGET[answers.days] ?? 8);
  const travelClause = !scored.access
    ? ""
    : roadHeavy
      ? `. Be honest with yourself about the road, though — ${formatHours(
          scored.access.hrs
        )} each way only works if you give the driving its own days`
      : ` and at ${formatHours(scored.access.hrs)} from ${originLabel(
          answers.from
        )} you won't spend the trip getting there`;

  const seasonSentence =
    scored.season.mode === "flexible"
      ? `Your dates are open, so we scored it on its own best window: ${d.bestTime}.`
      : `${scored.season.label}: ${scored.seasonNote.note}`;

  const caveats = [
    ...scored.penalties.map((p) => p.note),
    ...(d.heads || []),
  ];

  const bullets = scored.factors.slice(0, 4).map((f) => ({
    label: f.label,
    note: f.note,
    value: f.value,
  }));

  return {
    headline: `Why ${d.name}?`,
    paragraph: `${said} ${strength}${travelClause}.`.replace(/\s+/g, " ").trim(),
    season: seasonSentence,
    bullets,
    caveats,
    pairsWith: scored.pairsWith || [],
  };
}

/** Same idea as PACE_PHRASE, but grammatical after "You said you're…". */
const PACE_WANT_PHRASE = {
  slow: "prefer a slow pace",
  balanced: "prefer a balanced pace",
  explore: "want to cover as much ground as possible",
  packed: "want full, adventure-packed days",
};

function joinList(items) {
  if (items.length <= 1) return items[0] || "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Short tags for a recommendation card, chosen against the profile. */
export function deriveTags(scored, answers) {
  const d = scored.destination;
  const tags = [];

  const interestOrder = Object.entries(d.interests).sort((a, b) => b[1] - a[1]);
  const primary = answers.want && d.interests[answers.want] >= 7
    ? answers.want
    : interestOrder[0][0];
  tags.push(
    { mountains: "Mountains", peace: "Nature", cafes: "Cafés", adventure: "Adventure" }[
      primary
    ]
  );

  if (answers.pace && d.pace[answers.pace] >= 8) {
    tags.push(
      {
        slow: "Slow travel",
        balanced: "Balanced",
        explore: "Cover ground",
        packed: "Packed days",
      }[answers.pace]
    );
  }

  if (answers.group && d.groups[answers.group] >= 8) {
    tags.push(
      { solo: "Solo-friendly", couple: "Couples", friends: "Groups", family: "Family" }[
        answers.group
      ]
    );
  }

  if (answers.days) tags.push(daysLabel(answers));
  if (d.levels.crowd <= 3) tags.push("Uncrowded");

  return tags.filter(Boolean).slice(0, 4);
}

export { formatHours };
