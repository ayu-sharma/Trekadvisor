/**
 * Seasonality.
 *
 * Himachal is the same state in January and June and a completely different
 * trip. Instead of hand-writing 12 numbers per destination we group places
 * into season curves — the curve is the honest part (what the roads and the
 * weather do), the destination just points at the one it belongs to.
 *
 * Scores are 0–10 for "how good is this place in this month".
 */

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SEASON_CURVES = {
  // Shimla, Chail, McLeod Ganj, Dalhousie, Bir — open all year
  midHills: {
    scores: [7, 7, 8, 9, 9, 8, 5, 4, 8, 10, 9, 8],
    notes: {
      winter: "Cold but open all year. Occasional snow spells, rarely blocking.",
      monsoon: "Heavy rain, leeches on the trails and washed-out views.",
      shoulder: "Clear air, thin crowds, warm days and cold nights.",
    },
  },
  // Jibhi, Tirthan, Shoja, Barot, Narkanda, Prashar
  midValley: {
    scores: [6, 6, 8, 9, 9, 8, 4, 4, 8, 10, 9, 7],
    notes: {
      winter: "Quiet and often snowy. Some link roads and passes shut for days.",
      monsoon: "Landslide season on NH305 — plans slip by hours, not minutes.",
      shoulder: "Peak season for a reason: golden forests, low crowds.",
    },
  },
  // Kasol, Tosh, Kheerganga
  parvati: {
    scores: [5, 5, 7, 9, 10, 9, 4, 3, 8, 9, 7, 5],
    notes: {
      winter: "Snowed-in charm at Tosh; the Kheerganga trail gets icy.",
      monsoon: "The Parvati floods hard. Avoid unless you like being stuck.",
      shoulder: "Best light of the year on the valley.",
    },
  },
  // Manali and the Kullu valley floor
  manaliBelt: {
    scores: [7, 7, 8, 9, 9, 9, 5, 4, 8, 9, 7, 8],
    notes: {
      winter: "Snow tourism season — Solang is busy, Rohtang shut.",
      monsoon: "Rain most days, but cafés and the old town still work.",
      shoulder: "Everything open, everything visible.",
    },
  },
  // Kalpa and lower Kinnaur
  kinnaur: {
    scores: [4, 4, 6, 8, 9, 9, 4, 3, 9, 10, 7, 4],
    notes: {
      winter: "Very cold, apple country asleep, NH5 slow after snow.",
      monsoon: "NH5 through Kinnaur is the most landslide-prone road in the state.",
      shoulder: "Kinnaur Kailash at its clearest.",
    },
  },
  // Chitkul, Sissu — high, seasonal
  highSeasonal: {
    scores: [2, 2, 3, 6, 9, 10, 7, 6, 9, 8, 4, 2],
    notes: {
      winter: "Effectively closed or barely reachable. Locals move down.",
      monsoon: "Rain is lighter up here, but the approach roads are not.",
      shoulder: "The short, perfect window.",
    },
  },
  // Spiti
  spiti: {
    scores: [3, 3, 3, 5, 8, 10, 9, 8, 10, 8, 4, 3],
    notes: {
      winter: "Only via Shimla–Kinnaur, on ice, for people who want exactly that.",
      monsoon: "The cold desert stays dry — the Kinnaur approach does not.",
      shoulder: "Both circuits open. The trip Spiti is famous for.",
    },
  },
  // Pangi, upper Churah — summer only
  remoteSummer: {
    scores: [1, 1, 2, 4, 7, 10, 9, 8, 9, 7, 3, 1],
    notes: {
      winter: "Passes closed. Sach Pass opens late and shuts early.",
      monsoon: "Rockfall country. Go with buffer days or don't go.",
      shoulder: "Short season, almost no other travellers.",
    },
  },
  // Offbeat Chamba
  offbeatChamba: {
    scores: [3, 3, 5, 8, 9, 9, 5, 4, 9, 9, 6, 3],
    notes: {
      winter: "Cold, sparse transport, beautiful if you're equipped.",
      monsoon: "Roads hold up better than Kullu's, but slides happen.",
      shoulder: "Meadows, orchards and nobody around.",
    },
  },
};

const MONSOON = [6, 7]; // Jul, Aug
const WINTER = [11, 0, 1, 2]; // Dec–Mar

export function monthLabel(index) {
  return MONTHS[((index % 12) + 12) % 12];
}

/** Score + a plain-English note for one destination in one month. */
export function seasonInfo(destination, monthIndex) {
  const curve = SEASON_CURVES[destination.seasonCurve] || SEASON_CURVES.midHills;
  const m = ((monthIndex % 12) + 12) % 12;
  const score = curve.scores[m];
  let note = curve.notes.shoulder;
  if (MONSOON.includes(m)) note = curve.notes.monsoon;
  else if (WINTER.includes(m)) note = curve.notes.winter;
  return { score, note, month: MONTHS[m] };
}

/** The month this destination is at its best — used when dates are open. */
export function bestMonth(destination) {
  const curve = SEASON_CURVES[destination.seasonCurve] || SEASON_CURVES.midHills;
  let best = 0;
  curve.scores.forEach((s, i) => {
    if (s > curve.scores[best]) best = i;
  });
  return best;
}

/** Average of a destination's three best months — a fair "flexible dates" score. */
export function flexibleScore(destination) {
  const curve = SEASON_CURVES[destination.seasonCurve] || SEASON_CURVES.midHills;
  const top = [...curve.scores].sort((a, b) => b - a).slice(0, 3);
  return top.reduce((a, b) => a + b, 0) / top.length;
}

/** Is this place genuinely cold in this month? Drives the "avoid cold" penalty. */
export function isColdMonth(destination, monthIndex) {
  const m = ((monthIndex % 12) + 12) % 12;
  const wintery = [10, 11, 0, 1, 2].includes(m); // Nov–Mar
  if (!wintery) return false;
  return destination.altitudeM >= 2000;
}

/**
 * Turns the "when are you going" answer into a month we can score against.
 * `today` is injected so this stays testable.
 */
export function resolveWhen(whenAnswer, today = new Date()) {
  const current = today.getMonth();
  switch (whenAnswer) {
    case "now":
      return { mode: "month", month: current, label: MONTHS[current] };
    case "next":
      return {
        mode: "month",
        month: (current + 1) % 12,
        label: MONTHS[(current + 1) % 12],
      };
    case "soon":
      return {
        mode: "month",
        month: (current + 2) % 12,
        label: `${MONTHS[(current + 2) % 12]}–${MONTHS[(current + 3) % 12]}`,
        secondary: (current + 3) % 12,
      };
    default:
      return { mode: "flexible", month: null, label: "Flexible dates" };
  }
}
