/**
 * Questionnaire definition.
 *
 * This file is the single source of truth for the "Plan Your Trip" flow.
 * Adding a question here adds it to the UI, the URL profile and the profile
 * summary automatically. It only starts influencing recommendations once a
 * matching scorer is registered in `scoring.js` (see FACTORS) — so new
 * questions can be shipped for research before they change results.
 */

export const QUESTIONS = [
  {
    id: "from",
    kind: "single",
    label: "Starting point",
    title: "Where are you starting from?",
    subtitle:
      "Everything in Himachal is a road trip. Where you begin decides how much of your holiday is spent driving.",
    options: [
      {
        id: "delhi",
        label: "Delhi / NCR",
        hint: "10–14 hrs by road to most valleys",
        icon: "Building2",
      },
      {
        id: "chandigarh",
        label: "Chandigarh",
        hint: "The fastest gateway — 3–8 hrs",
        icon: "Milestone",
      },
      {
        id: "punjab",
        label: "Punjab",
        hint: "Ludhiana, Amritsar, Jalandhar",
        icon: "Wheat",
      },
      {
        id: "flexible",
        label: "Somewhere else",
        hint: "We'll assume you fly or train into the plains first",
        icon: "Plane",
      },
    ],
  },
  {
    id: "group",
    kind: "single",
    label: "Travelling with",
    title: "Who's coming with you?",
    subtitle:
      "A village homestay that's perfect for two is a bad idea for six friends. This changes a lot.",
    options: [
      { id: "solo", label: "Solo", hint: "Just me", icon: "User" },
      { id: "couple", label: "Couple", hint: "The two of us", icon: "Heart" },
      { id: "friends", label: "Friends", hint: "A group of us", icon: "Users" },
      {
        id: "family",
        label: "Family",
        hint: "Parents, kids, or both",
        icon: "Home",
      },
    ],
  },
  {
    id: "days",
    kind: "single",
    label: "Trip length",
    title: "How many days do you have?",
    subtitle:
      "This decides whether you settle into one valley or string a few together.",
    options: [
      {
        id: "d23",
        label: "2–3 days",
        hint: "A weekend escape",
        icon: "Coffee",
      },
      {
        id: "d45",
        label: "4–5 days",
        hint: "The sweet spot for one valley",
        icon: "Tent",
      },
      {
        id: "d67",
        label: "6–7 days",
        hint: "Room for two or three stops",
        icon: "Route",
      },
      {
        id: "d8p",
        label: "8+ days",
        hint: "Deep Himachal — Spiti, Kinnaur, Pangi",
        icon: "Mountain",
      },
    ],
  },
  {
    id: "want",
    kind: "single",
    label: "Looking for",
    title: "What do you want out of this trip?",
    subtitle: "Pick the one that matters most. We'll weight everything around it.",
    options: [
      {
        id: "mountains",
        label: "Mountains & views",
        hint: "Snow peaks, passes, big skies",
        icon: "Mountain",
      },
      {
        id: "peace",
        label: "Peace & nature",
        hint: "Forests, rivers, quiet villages",
        icon: "TreePine",
      },
      {
        id: "cafes",
        label: "Cafés & nightlife",
        hint: "Good coffee, music, people",
        icon: "Music",
      },
      {
        id: "adventure",
        label: "Adventure",
        hint: "Treks, paragliding, high passes",
        icon: "Compass",
      },
    ],
  },
  {
    id: "pace",
    kind: "single",
    label: "Pace",
    title: "What pace do you actually enjoy?",
    subtitle:
      "Two people can want the same valley and need completely different trips.",
    options: [
      {
        id: "slow",
        label: "Slow & relaxed",
        hint: "One base, long mornings",
        icon: "Sunrise",
      },
      {
        id: "balanced",
        label: "Balanced",
        hint: "See things, but don't rush",
        icon: "Scale",
      },
      {
        id: "explore",
        label: "Explore as much as possible",
        hint: "Cover ground, move often",
        icon: "Footprints",
      },
      {
        id: "packed",
        label: "Adventure-packed",
        hint: "Early starts, full days",
        icon: "Zap",
      },
    ],
  },
  {
    id: "budget",
    kind: "single",
    label: "Budget",
    title: "What's the budget like?",
    subtitle: "Per person, per day, excluding how you get to Himachal.",
    options: [
      {
        id: "backpacker",
        label: "Budget / Backpacker",
        hint: "₹1,200–2,000 a day",
        icon: "Backpack",
      },
      {
        id: "comfortable",
        label: "Comfortable",
        hint: "₹2,500–4,500 a day",
        icon: "BedDouble",
      },
      {
        id: "premium",
        label: "Premium",
        hint: "₹6,000+ a day",
        icon: "Sparkles",
      },
      {
        id: "unsure",
        label: "Not sure yet",
        hint: "Show me a bit of everything",
        icon: "HelpCircle",
      },
    ],
  },
  {
    id: "when",
    kind: "single",
    optional: true,
    label: "When",
    title: "When are you thinking of going?",
    subtitle:
      "Season matters more than anything else in Himachal — snow, monsoon and pass closures completely change the answer.",
    options: [
      { id: "now", label: "This month", hint: "", icon: "CalendarDays" },
      { id: "next", label: "Next month", hint: "", icon: "CalendarPlus" },
      {
        id: "soon",
        label: "In 2–3 months",
        hint: "",
        icon: "CalendarRange",
      },
      {
        id: "open",
        label: "Haven't decided",
        hint: "Score me on each place's best window",
        icon: "CalendarSearch",
      },
    ],
  },
  {
    id: "avoid",
    kind: "multi",
    optional: true,
    label: "Avoiding",
    title: "Anything you'd rather avoid?",
    subtitle: "Pick as many as you like, or skip this.",
    options: [
      {
        id: "drives",
        label: "Long drives",
        hint: "Keep road time down",
        icon: "CarFront",
      },
      {
        id: "crowds",
        label: "Crowded places",
        hint: "No tourist traffic",
        icon: "UsersRound",
      },
      {
        id: "trek",
        label: "Trekking",
        hint: "Nothing that needs a hike in",
        icon: "FootprintsIcon",
      },
      {
        id: "nightlife",
        label: "Nightlife & party crowds",
        hint: "Quiet evenings",
        icon: "MoonStar",
      },
      {
        id: "cold",
        label: "Very cold weather",
        hint: "Skip sub-zero nights",
        icon: "Snowflake",
      },
    ],
  },
];

export const CORE_QUESTIONS = QUESTIONS.filter((q) => !q.optional);
export const OPTIONAL_QUESTIONS = QUESTIONS.filter((q) => q.optional);

export function getQuestion(id) {
  return QUESTIONS.find((q) => q.id === id);
}

export function getOption(questionId, optionId) {
  const q = getQuestion(questionId);
  return q ? q.options.find((o) => o.id === optionId) : undefined;
}

export function optionLabel(questionId, optionId) {
  const o = getOption(questionId, optionId);
  return o ? o.label : optionId;
}
