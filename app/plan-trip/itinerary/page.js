import Link from "next/link";
import {
  ArrowRight,
  Bed,
  CarFront,
  Compass,
  Gauge,
  Info,
  MapPin,
  Moon,
  Route as RouteIcon,
} from "lucide-react";
import { buildItinerary } from "@/app/lib/planner/itinerary";
import { recommend, formatHours } from "@/app/lib/planner/scoring";
import { decodeProfile, isComplete, profileQuery } from "@/app/lib/planner/profile";
import { getDestination } from "@/app/lib/planner/destinations";
import { QUESTIONS } from "@/app/lib/planner/questions";
import PlannerHeader from "@/app/components/planner/PlannerHeader";
import DestinationVisual from "@/app/components/planner/DestinationVisual";

export const metadata = {
  title: "Your itinerary — TrekAdvisor",
  description:
    "A day-by-day Himachal itinerary built around your pace, your dates and your starting point.",
};

const PACE_OPTIONS = QUESTIONS.find((q) => q.id === "pace").options;

export default async function ItineraryPage({ searchParams }) {
  const sp = await searchParams;
  const answers = decodeProfile(sp);
  const query = profileQuery(answers);

  if (!isComplete(answers)) {
    return (
      <div className="min-h-screen bg-cream font-sans text-neutral-900">
        <PlannerHeader />
        <main className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Let&rsquo;s get your answers first
          </h1>
          <p className="mt-3 text-neutral-600">
            An itinerary is only useful if it's built around your pace, your
            dates and where you're starting from.
          </p>
          <Link
            href="/plan-trip"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-sm font-semibold text-white hover:bg-moss-deep"
          >
            Plan your trip
            <ArrowRight size={16} />
          </Link>
        </main>
      </div>
    );
  }

  const picks = recommend(answers, { limit: 5 });
  const requested = sp?.to ? getDestination(String(sp.to)) : null;
  const anchor = requested || picks[0].destination;
  const itinerary = buildItinerary(answers, anchor.slug);
  const alternatives = picks.filter((p) => p.destination.slug !== anchor.slug);

  return (
    <div className="min-h-screen bg-cream font-sans text-neutral-900">
      <PlannerHeader
        backHref={`/destinations/${anchor.slug}${query}`}
        backLabel={anchor.name}
        actions={
          <Link
            href={`/plan-trip/results${query}`}
            className="rounded-full border border-cream-line bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300"
          >
            All matches
          </Link>
        }
      />

      <main className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        {/* Header */}
        <section className="pt-12 sm:pt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-moss-deep">
            Your itinerary
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {itinerary.title}
          </h1>

          {/* Route chain */}
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
            {itinerary.route.map((stop, i) => (
              <span key={`${stop}-${i}`} className="flex items-center gap-2">
                {i > 0 ? (
                  <ArrowRight size={14} className="text-neutral-400" />
                ) : null}
                <span
                  className={`rounded-full px-3 py-1.5 font-medium ${
                    i === 0 || i === itinerary.route.length - 1
                      ? "bg-black/[0.05] text-neutral-600"
                      : "bg-ink text-white"
                  }`}
                >
                  {stop}
                </span>
              </span>
            ))}
          </div>

          {itinerary.warnings.length ? (
            <div className="mt-7 rounded-2xl border border-clay/30 bg-clay/[0.07] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
                Worth reconsidering
              </p>
              {itinerary.warnings.map((w) => (
                <p key={w} className="mt-2 text-sm leading-relaxed text-neutral-700">
                  {w}
                </p>
              ))}
            </div>
          ) : null}

          {/* Stats */}
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat icon={Compass} label="Days" value={itinerary.totals.days} />
            <Stat icon={Moon} label="Nights" value={itinerary.totals.nights} />
            <Stat
              icon={Bed}
              label={itinerary.totals.stops === 1 ? "Base" : "Bases"}
              value={itinerary.totals.stops}
            />
            <Stat
              icon={CarFront}
              label="On the road"
              value={`${itinerary.totals.driveHours} hrs`}
              hint={`${itinerary.totals.km} km round trip`}
            />
          </dl>

          {/* Pace control */}
          <div className="mt-8 rounded-2xl border border-cream-line bg-white p-5">
            <div className="flex items-center gap-2">
              <Gauge size={15} className="text-moss-deep" />
              <p className="text-sm font-medium">
                Built for a{" "}
                <span className="text-moss-deep">{itinerary.paceLabel}</span> trip
              </p>
            </div>
            <p className="mt-1.5 text-sm text-neutral-500">
              Change the pace and the whole plan rebuilds — fewer bases, shorter
              drives, emptier days.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {PACE_OPTIONS.map((option) => {
                const active = answers.pace === option.id;
                const params = new URLSearchParams(query.replace(/^\?/, ""));
                params.set("pace", option.id);
                params.set("to", anchor.slug);
                return (
                  <Link
                    key={option.id}
                    href={`/plan-trip/itinerary?${params.toString()}`}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-ink text-white"
                        : "border border-cream-line text-neutral-700 hover:border-neutral-300 hover:bg-cream"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Days */}
        <section className="mt-12">
          <ol className="space-y-4">
            {itinerary.days.map((day) => (
              <li key={day.day}>
                <DayCard day={day} query={query} />
              </li>
            ))}
          </ol>
        </section>

        {/* Route reasoning */}
        <section className="mt-12 rounded-3xl border border-cream-line bg-white p-6 sm:p-9">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-moss/10 text-moss-deep">
              <RouteIcon size={16} />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Why this route
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Distance, direction and your pace, not just match scores.
              </p>
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {itinerary.notes.map((note) => (
              <li key={note} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                <span className="text-neutral-700">{note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 border-t border-cream-line pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
              The legs
            </p>
            <ul className="mt-3 space-y-2">
              {itinerary.legs.map((leg, i) => (
                <li
                  key={`${leg.from}-${leg.to}-${i}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                >
                  <span className="text-neutral-700">
                    {leg.from} → {leg.to}
                  </span>
                  <span className="tabular-nums text-neutral-500">
                    {leg.km} km · {formatHours(leg.hrs)}
                    {leg.estimated ? (
                      <span className="ml-1.5 text-neutral-400">(estimated)</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 flex gap-2 text-xs leading-relaxed text-neutral-500">
            <Info size={14} className="mt-0.5 shrink-0" />
            Hill driving times assume daylight, dry roads and Himachal traffic —
            not what a maps app tells you. Add buffer in monsoon and after snow.
          </p>
        </section>

        {/* Swap anchor */}
        {alternatives.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">
              Build this around somewhere else
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {alternatives.slice(0, 4).map((pick) => (
                <Link
                  key={pick.destination.slug}
                  href={`/plan-trip/itinerary${query}${query ? "&" : "?"}to=${pick.destination.slug}`}
                  className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-cream-line bg-white p-3 transition-shadow hover:shadow-[0_2px_18px_-12px_rgba(0,0,0,0.25)]"
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                    <DestinationVisual
                      destination={pick.destination}
                      className="absolute inset-0"
                      overlay={false}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{pick.destination.name}</p>
                    <p className="truncate text-sm text-neutral-500">
                      {pick.match}% match · {pick.destination.region}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function DayCard({ day, query }) {
  const travel = day.travel;
  const isTravelDay = day.kind !== "base";

  return (
    <article className="overflow-hidden rounded-3xl border border-cream-line bg-white">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-cream-line p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink text-sm font-semibold text-white">
            {day.day}
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              Day {day.day}
              {day.kind === "halt" ? " · night halt" : ""}
              {day.kind === "return" ? " · heading home" : ""}
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              {day.base && day.kind === "base" ? (
                <Link
                  href={`/destinations/${day.base.slug}${query}`}
                  className="underline-offset-4 hover:underline"
                >
                  {day.title}
                </Link>
              ) : (
                day.title
              )}
            </h3>
            <p className="mt-1 text-sm text-neutral-500">{day.subtitle}</p>
          </div>
        </div>

        {travel ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-neutral-600">
            <CarFront size={13} />
            {travel.km} km · {formatHours(travel.hrs)}
          </span>
        ) : day.base ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-neutral-600">
            <MapPin size={13} />
            {day.base.region}
          </span>
        ) : null}
      </div>

      {day.items.length || day.note ? (
        <div className="p-5 sm:p-6">
          {day.items.length ? (
            <ul className="space-y-4">
              {day.items.map((item) => (
                <li key={`${day.day}-${item.slot}-${item.name}`} className="flex gap-4">
                  <span className="w-24 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    {item.slot}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{item.name}</span>
                    {item.note ? (
                      <span className="mt-0.5 block text-sm leading-relaxed text-neutral-600">
                        {item.note}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {day.note ? (
            <p
              className={`${
                day.items.length ? "mt-5 border-t border-cream-line pt-4" : ""
              } text-sm text-neutral-600`}
            >
              <Info size={13} className="mr-1.5 inline text-neutral-400" />
              {day.note}
            </p>
          ) : null}
        </div>
      ) : isTravelDay ? (
        <p className="p-5 text-sm text-neutral-500 sm:p-6">
          Nothing scheduled — the road is the day.
        </p>
      ) : null}
    </article>
  );
}

function Stat({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-cream-line bg-white p-4">
      <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-neutral-400">
        <Icon size={13} />
        {label}
      </dt>
      <dd className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">
        {value}
      </dd>
      {hint ? <p className="mt-0.5 text-xs text-neutral-500">{hint}</p> : null}
    </div>
  );
}
