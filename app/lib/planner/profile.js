/**
 * The traveller profile.
 *
 * Answers live in the URL. That makes every results page, destination page
 * and itinerary shareable and refresh-proof, and means no global store is
 * needed anywhere in the flow.
 */

import { QUESTIONS, getQuestion, optionLabel } from "./questions.js";
import { resolveWhen } from "./seasons.js";
import { originLabel } from "./geo.js";

/** answers object -> query string */
export function encodeProfile(answers) {
  const params = new URLSearchParams();
  QUESTIONS.forEach((q) => {
    const v = answers[q.id];
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      if (v.length) params.set(q.id, v.join(","));
    } else {
      params.set(q.id, v);
    }
  });
  return params.toString();
}

/** URLSearchParams (or plain object) -> answers object */
export function decodeProfile(searchParams) {
  const get = (k) =>
    typeof searchParams?.get === "function"
      ? searchParams.get(k)
      : searchParams?.[k];
  const answers = {};
  QUESTIONS.forEach((q) => {
    const raw = get(q.id);
    if (raw === undefined || raw === null || raw === "") return;
    const valid = new Set(q.options.map((o) => o.id));
    if (q.kind === "multi") {
      const list = String(raw)
        .split(",")
        .map((s) => s.trim())
        .filter((s) => valid.has(s));
      if (list.length) answers[q.id] = list;
    } else if (valid.has(String(raw))) {
      answers[q.id] = String(raw);
    }
  });
  return answers;
}

/** Have the six core questions been answered? */
export function isComplete(answers) {
  return QUESTIONS.filter((q) => !q.optional).every((q) => answers[q.id]);
}

/** Number of days we plan against. */
export function tripDays(answers) {
  return { d23: 3, d45: 5, d67: 7, d8p: 9 }[answers.days] || 5;
}

/** Nights available once travel days are accounted for by the itinerary. */
export function daysLabel(answers) {
  return { d23: "2–3 days", d45: "4–5 days", d67: "6–7 days", d8p: "8+ days" }[
    answers.days
  ];
}

export function season(answers, today = new Date()) {
  return resolveWhen(answers.when, today);
}

/** Emoji + label chips, used on results and destination pages. */
const CHIP_ICONS = {
  from: "📍",
  group: { solo: "🎒", couple: "❤️", friends: "🥂", family: "👨‍👩‍👧" },
  days: "📅",
  want: { mountains: "🏔️", peace: "🌲", cafes: "☕", adventure: "🧭" },
  pace: { slow: "🧘", balanced: "⚖️", explore: "🚶", packed: "⚡" },
  budget: { backpacker: "🎫", comfortable: "💰", premium: "✨", unsure: "🤔" },
  when: "🗓️",
  avoid: "🚫",
};

function iconFor(questionId, optionId) {
  const entry = CHIP_ICONS[questionId];
  if (!entry) return "•";
  return typeof entry === "string" ? entry : entry[optionId] || "•";
}

export function profileChips(answers) {
  const chips = [];
  QUESTIONS.forEach((q) => {
    const v = answers[q.id];
    if (!v) return;
    if (Array.isArray(v)) {
      v.forEach((id) =>
        chips.push({
          questionId: q.id,
          icon: iconFor(q.id, id),
          label: `No ${optionLabel(q.id, id).toLowerCase()}`,
        })
      );
    } else {
      chips.push({
        questionId: q.id,
        icon: iconFor(q.id, v),
        label: optionLabel(q.id, v),
      });
    }
  });
  return chips;
}

/** One-line prose summary of the profile. */
export function profileSentence(answers, today = new Date()) {
  const bits = [];
  if (answers.group) bits.push(GROUP_PHRASE[answers.group]);
  if (answers.days) bits.push(`with ${daysLabel(answers).toLowerCase()}`);
  if (answers.want) bits.push(`looking for ${WANT_PHRASE[answers.want]}`);
  if (answers.pace) bits.push(PACE_PHRASE[answers.pace]);
  const s = season(answers, today);
  if (answers.when && s.mode === "month") bits.push(`in ${s.label}`);
  const from = answers.from ? `Starting from ${originLabel(answers.from)}, ` : "";
  return `${from}${bits.join(", ")}.`.replace("  ", " ");
}

export const GROUP_PHRASE = {
  solo: "travelling solo",
  couple: "travelling as a couple",
  friends: "travelling with friends",
  family: "travelling with family",
};

export const WANT_PHRASE = {
  mountains: "big mountain views",
  peace: "quiet and nature",
  cafes: "cafés and some nightlife",
  adventure: "adventure",
};

export const PACE_PHRASE = {
  slow: "at a slow pace",
  balanced: "at a balanced pace",
  explore: "covering as much ground as possible",
  packed: "with full, adventure-packed days",
};

export const BUDGET_PHRASE = {
  backpacker: "on a backpacker budget",
  comfortable: "on a comfortable budget",
  premium: "at the premium end",
  unsure: "with the budget still open",
};

/** Query string for links that should carry the profile forward. */
export function profileQuery(answers, extra = {}) {
  const params = new URLSearchParams(encodeProfile(answers));
  Object.entries(extra).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") params.set(k, v);
  });
  const s = params.toString();
  return s ? `?${s}` : "";
}

export { getQuestion, optionLabel };
