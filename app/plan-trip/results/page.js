import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  CarFront,
  Info,
  Map,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { recommend, formatHours } from "@/app/lib/planner/scoring";
import {
  decodeProfile,
  encodeProfile,
  isComplete,
  profileQuery,
  profileSentence,
} from "@/app/lib/planner/profile";
import { originLabel } from "@/app/lib/planner/geo";
import PlannerHeader from "@/app/components/planner/PlannerHeader";
import ProfileChips from "@/app/components/planner/ProfileChips";
import DestinationVisual from "@/app/components/planner/DestinationVisual";
import MatchRing from "@/app/components/planner/MatchRing";

export const metadata = {
  title: "Your Himachal matches — TrekAdvisor",
  description:
    "Personalised Himachal destination matches, with the reasoning behind each one.",
};

export default async function ResultsPage({ searchParams }) {
  const sp = await searchParams;
  const answers = decodeProfile(sp);
  const query = profileQuery(answers);
  const editHref = `/plan-trip${query}`;

  if (!isComplete(answers)) {
    return <Incomplete answers={answers} />;
  }

  const picks = recommend(answers, { limit: 5 });
  const [top, ...rest] = picks;

  return (
    <div className="min-h-screen bg-cream font-sans text-neutral-900">
      <PlannerHeader
        backHref={editHref}
        backLabel="Answers"
        actions={
          <Link
            href="/plan-trip"
            className="inline-flex items-center gap-1.5 rounded-full border border-cream-line bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300"
          >
            <RotateCcw size={14} />
            Start over
          </Link>
        }
      />

      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Intro */}
        <section className="pt-12 sm:pt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-moss-deep">
            Your matches
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Your Himachal trip is calling.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
            {profileSentence(answers)} Here are the places that fit that — and
            the reasoning behind each one.
          </p>

          <div className="mt-8 max-w-3xl rounded-2xl border border-cream-line bg-white/70 p-5">
            <ProfileChips
              answers={answers}
              editHref={`${editHref}${query ? "&" : "?"}q=1`}
              title="What we matched on"
            />
          </div>
        </section>

        {/* Top pick */}
        <section className="mt-12 sm:mt-16">
          <TopPick pick={top} answers={answers} query={query} />
        </section>

        {/* Runners up */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Also strong for you
            </h2>
            <p className="hidden text-sm text-neutral-500 sm:block">
              Ranked by the same weighting
            </p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {rest.map((pick) => (
              <SecondaryCard
                key={pick.destination.slug}
                pick={pick}
                answers={answers}
                query={query}
              />
            ))}
          </div>
        </section>

        {/* Scoring transparency */}
        <section className="mt-14 rounded-3xl border border-cream-line bg-white p-6 sm:p-9">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-moss/10 text-moss-deep">
              <Info size={16} />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                How {top.destination.name} got to {top.match}%
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                Every destination carries a profile — what it's good for, who it
                suits, how it handles each season, how far it is. Your answers
                are weighted against that, factor by factor.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {top.factors.map((factor) => (
              <div key={factor.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium">{factor.label}</span>
                  <span className="text-xs tabular-nums text-neutral-400">
                    weight {factor.weight}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-full rounded-full bg-moss"
                    style={{ width: `${Math.round(factor.value * 100)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                  {factor.note}
                </p>
              </div>
            ))}
          </div>

          {top.penalties.length ? (
            <div className="mt-7 rounded-2xl bg-clay/[0.07] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
                Counted against it
              </p>
              <ul className="mt-2 space-y-1.5">
                {top.penalties.map((p) => (
                  <li key={p.id} className="text-sm text-neutral-700">
                    <span className="font-medium">{p.label}:</span> {p.note}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-7 border-t border-cream-line pt-5 text-xs leading-relaxed text-neutral-500">
            A match score is a weighted judgement call, not a measurement.
            Treat 94% and 91% as &ldquo;both of these fit you&rdquo; rather than
            a ranking to trust to the decimal.
          </p>
        </section>

        {/* Nudge */}
        <section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl bg-ink p-7 text-white sm:flex-row sm:items-center sm:p-9">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Not quite it?
            </h2>
            <p className="mt-1.5 text-sm text-white/60">
              Change one answer — pace and trip length move the results the most.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${editHref}${query ? "&" : "?"}q=5`}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Change my pace
            </Link>
            <Link
              href={`${editHref}${query ? "&" : "?"}q=3`}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Change trip length
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TopPick({ pick, answers, query }) {
  const d = pick.destination;
  return (
    <article className="overflow-hidden rounded-3xl border border-cream-line bg-white shadow-[0_2px_24px_-12px_rgba(0,0,0,0.18)]">
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[280px] lg:min-h-[440px]">
          <DestinationVisual destination={d} className="absolute inset-0" priority sizes="(max-width: 1024px) 100vw, 55vw" />
          <div className="absolute left-6 top-6 flex items-center gap-3">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-900">
              01 — Best match
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {d.name}
            </h2>
            <p className="mt-1.5 text-sm text-white/75">
              {d.region} · {d.altitude}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-9">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {pick.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-moss/10 px-3 py-1 text-xs font-medium text-moss-deep"
                >
                  {tag}
                </span>
              ))}
            </div>
            <MatchRing value={pick.match} size={78} />
          </div>

          <p className="mt-5 text-lg leading-relaxed text-neutral-700">
            {d.blurb}
          </p>

          <div className="mt-6 rounded-2xl bg-cream p-5">
            <h3 className="text-sm font-semibold tracking-tight">
              {pick.why.headline}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {pick.why.paragraph}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
              {pick.why.season}
            </p>
            {pick.why.caveats.length ? (
              <p className="mt-3 border-t border-cream-line pt-3 text-sm text-neutral-600">
                <span className="font-medium text-clay">Worth knowing: </span>
                {pick.why.caveats[0]}
              </p>
            ) : null}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2.5">
              <CarFront size={16} className="mt-0.5 shrink-0 text-neutral-400" />
              <div>
                <dt className="text-neutral-500">From {originLabel(answers.from)}</dt>
                <dd className="font-medium">
                  {formatHours(pick.access.hrs)} · {pick.access.km} km
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CalendarRange
                size={16}
                className="mt-0.5 shrink-0 text-neutral-400"
              />
              <div>
                <dt className="text-neutral-500">Ideal length</dt>
                <dd className="font-medium">{d.idealDays}</dd>
              </div>
            </div>
          </dl>

          {pick.why.pairsWith.length ? (
            <p className="mt-5 text-sm text-neutral-600">
              <Map size={14} className="mr-1.5 inline text-neutral-400" />
              Pairs well with{" "}
              {pick.why.pairsWith.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 ? " and " : ""}
                  <span className="font-medium text-neutral-800">{p.name}</span>{" "}
                  ({formatHours(p.link.hrs)} away)
                </span>
              ))}
              .
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/destinations/${d.slug}${query}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Explore {d.name}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/plan-trip/itinerary${query}${query ? "&" : "?"}to=${d.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-cream-line px-6 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-300 hover:bg-cream"
            >
              <Sparkles size={16} className="text-moss" />
              Build my itinerary
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function SecondaryCard({ pick, answers, query }) {
  const d = pick.destination;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-cream-line bg-white transition-shadow hover:shadow-[0_2px_24px_-14px_rgba(0,0,0,0.25)]">
      <div className="relative h-44">
        <DestinationVisual
          destination={d}
          className="absolute inset-0"
          sizes="(max-width: 640px) 100vw, 45vw"
        />
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-neutral-900">
          {String(pick.rank).padStart(2, "0")}
        </span>
        {pick.alternative ? (
          <span className="absolute right-5 top-5 rounded-full bg-clay px-2.5 py-1 text-[11px] font-semibold text-white">
            A different kind of trip
          </span>
        ) : null}
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-white">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{d.name}</h3>
            <p className="text-xs text-white/75">{d.region}</p>
          </div>
          <span className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-neutral-900">
            {pick.match}%
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          {pick.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {d.tagline.charAt(0).toUpperCase() + d.tagline.slice(1)}.
        </p>

        <details className="group/why mt-4">
          <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-moss-deep">
            {pick.why.headline}
            <ArrowRight
              size={14}
              className="transition-transform group-open/why:rotate-90"
            />
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {pick.why.paragraph}
          </p>
          <ul className="mt-3 space-y-1.5">
            {pick.why.bullets.slice(0, 3).map((b) => (
              <li key={b.label} className="flex gap-2 text-xs text-neutral-500">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-moss" />
                <span>
                  <span className="font-medium text-neutral-700">{b.label}:</span>{" "}
                  {b.note}
                </span>
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-xs text-neutral-500">
            {formatHours(pick.access.hrs)} from {originLabel(answers.from)}
          </span>
          <Link
            href={`/destinations/${d.slug}${query}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Explore
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Incomplete({ answers }) {
  return (
    <div className="min-h-screen bg-cream font-sans text-neutral-900">
      <PlannerHeader />
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          We need a few more answers first
        </h1>
        <p className="mt-3 text-neutral-600">
          Six quick questions and we can tell you where in Himachal you should
          actually go.
        </p>
        <Link
          href={`/plan-trip?${encodeProfile(answers)}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-moss-deep"
        >
          {Object.keys(answers).length ? "Continue planning" : "Plan your trip"}
          <ArrowRight size={16} />
        </Link>
      </main>
    </div>
  );
}
