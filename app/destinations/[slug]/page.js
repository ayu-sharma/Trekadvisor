import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BedDouble,
  CalendarRange,
  Clock,
  Compass,
  IndianRupee,
  MapPin,
  Route as RouteIcon,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { DESTINATIONS, getDestination } from "@/app/lib/planner/destinations";
import { scoreDestination, explain, deriveTags, formatHours } from "@/app/lib/planner/scoring";
import { decodeProfile, isComplete, profileQuery } from "@/app/lib/planner/profile";
import { originLabel } from "@/app/lib/planner/geo";
import PlannerHeader from "@/app/components/planner/PlannerHeader";
import ProfileChips from "@/app/components/planner/ProfileChips";
import DestinationVisual from "@/app/components/planner/DestinationVisual";
import MatchRing from "@/app/components/planner/MatchRing";
import LevelMeter from "@/app/components/planner/LevelMeter";

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return { title: "Destination not found — TrekAdvisor" };
  return {
    title: `${d.name}, Himachal — TrekAdvisor`,
    description: d.blurb,
  };
}

export default async function DestinationPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const answers = decodeProfile(sp);
  const personalised = isComplete(answers);
  const query = profileQuery(answers);

  const scored = personalised
    ? scoreDestination(destination, answers)
    : null;
  const why = scored ? explain(scored, answers) : null;
  const tags = scored ? deriveTags(scored, answers) : null;

  return (
    <div className="min-h-screen bg-cream font-sans text-neutral-900">
      <PlannerHeader
        backHref={personalised ? `/plan-trip/results${query}` : "/"}
        backLabel={personalised ? "Matches" : "Home"}
        actions={
          <Link
            href={
              personalised
                ? `/plan-trip/itinerary${query}${query ? "&" : "?"}to=${destination.slug}`
                : "/plan-trip"
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-moss px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-moss-deep"
          >
            <Sparkles size={14} />
            {personalised ? "Build my itinerary" : "Plan your trip"}
          </Link>
        }
      />

      {/* Hero */}
      <section className="relative h-[46vh] min-h-[340px] w-full sm:h-[54vh]">
        <DestinationVisual
          destination={destination}
          className="absolute inset-0"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="text-white">
                <p className="flex items-center gap-1.5 text-sm text-white/75">
                  <MapPin size={14} />
                  {destination.region} · {destination.altitude}
                </p>
                <h1 className="mt-2 text-4xl font-semibold leading-none tracking-tight sm:text-6xl">
                  {destination.name}
                </h1>
                <p className="mt-3 max-w-xl text-base text-white/80">
                  {destination.tagline.charAt(0).toUpperCase() +
                    destination.tagline.slice(1)}
                  .
                </p>
              </div>
              {scored ? (
                <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-4">
                  <MatchRing value={scored.match} size={64} />
                  <div className="text-sm">
                    <p className="font-semibold">match for you</p>
                    <p className="text-neutral-500">
                      {formatHours(scored.access.hrs)} from{" "}
                      {originLabel(answers.from)}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* Left column */}
          <div className="pt-10 sm:pt-14">
            {personalised ? (
              <section className="rounded-3xl border border-cream-line bg-white p-6 sm:p-8">
                <ProfileChips
                  answers={answers}
                  editHref={`/plan-trip${query}${query ? "&" : "?"}q=1`}
                />
                <h2 className="mt-7 text-2xl font-semibold tracking-tight">
                  {why.headline}
                </h2>
                <p className="mt-3 leading-relaxed text-neutral-700">
                  {why.paragraph}
                </p>
                <p className="mt-3 leading-relaxed text-neutral-600">
                  {why.season}
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {why.bullets.map((b) => (
                    <li
                      key={b.label}
                      className="rounded-2xl bg-cream px-4 py-3 text-sm"
                    >
                      <p className="font-medium text-neutral-800">{b.label}</p>
                      <p className="mt-0.5 text-neutral-600">{b.note}</p>
                    </li>
                  ))}
                </ul>

                {why.caveats.length ? (
                  <div className="mt-6 rounded-2xl bg-clay/[0.07] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
                      Before you commit
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-neutral-700">
                      {why.caveats.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {tags ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-moss/10 px-3 py-1 text-xs font-medium text-moss-deep"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : (
              <section className="rounded-3xl border border-cream-line bg-white p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Is {destination.name} right for you?
                </h2>
                <p className="mt-3 leading-relaxed text-neutral-700">
                  {destination.blurb}
                </p>
                <Link
                  href="/plan-trip"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-moss px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-moss-deep"
                >
                  Answer six questions and find out
                  <ArrowRight size={16} />
                </Link>
              </section>
            )}

            {personalised ? (
              <section className="mt-10">
                <h2 className="text-2xl font-semibold tracking-tight">
                  About {destination.name}
                </h2>
                <p className="mt-3 leading-relaxed text-neutral-700">
                  {destination.blurb}
                </p>
              </section>
            ) : null}

            {/* Things to do */}
            <section className="mt-10">
              <SectionTitle icon={Compass}>Things to do</SectionTitle>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {destination.thingsToDo.map((t) => (
                  <li
                    key={t.name}
                    className="rounded-2xl border border-cream-line bg-white p-5"
                  >
                    <p className="font-medium">{t.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {t.note}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Stays */}
            <section className="mt-10">
              <SectionTitle icon={BedDouble}>Where to stay</SectionTitle>
              <ul className="mt-5 divide-y divide-cream-line overflow-hidden rounded-2xl border border-cream-line bg-white">
                {destination.stays.map((s) => (
                  <li
                    key={s.name}
                    className="flex flex-wrap items-baseline justify-between gap-2 p-5"
                  >
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-sm text-neutral-500">{s.type}</p>
                    </div>
                    <p className="text-sm font-medium tabular-nums text-neutral-700">
                      {s.price}
                      <span className="font-normal text-neutral-400"> / night</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Food */}
            <section className="mt-10">
              <SectionTitle icon={UtensilsCrossed}>Food & cafés</SectionTitle>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {destination.food.map((f) => (
                  <li
                    key={f.name}
                    className="rounded-2xl border border-cream-line bg-white p-5"
                  >
                    <p className="font-medium">{f.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {f.note}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Experiences */}
            <section className="mt-10 rounded-3xl bg-ink p-6 text-white sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                What it actually feels like
              </h2>
              <ul className="mt-5 space-y-3">
                {destination.experiences.map((e) => (
                  <li key={e} className="flex gap-3 text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                    <span className="leading-relaxed">{e}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Getting there */}
            <section className="mt-10">
              <SectionTitle icon={RouteIcon}>Getting there</SectionTitle>
              <div className="mt-5 rounded-2xl border border-cream-line bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Route
                </p>
                <p className="mt-2 text-lg font-medium">
                  {originLabel(answers.from || "flexible")} → {destination.gateway} →{" "}
                  {destination.name}
                </p>
                <p className="mt-3 leading-relaxed text-neutral-600">
                  {destination.routeNote}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-cream-line pt-5 sm:grid-cols-3">
                  <Fact label="Distance">
                    {scored ? `${scored.access.km} km` : `${destination.access.chandigarh.km} km from Chandigarh`}
                  </Fact>
                  <Fact label="Driving time">
                    {formatHours(
                      scored ? scored.access.hrs : destination.access.chandigarh.hrs
                    )}
                  </Fact>
                  <Fact label="Nearest gateway">{destination.gateway}</Fact>
                </dl>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit lg:pt-14">
            <div className="rounded-3xl border border-cream-line bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Quick facts
              </h2>
              <dl className="mt-5 space-y-4">
                <IconFact icon={CalendarRange} label="Best time to visit">
                  {destination.bestTime}
                </IconFact>
                <IconFact icon={Clock} label="Ideal trip length">
                  {destination.idealDays}
                </IconFact>
                <IconFact icon={IndianRupee} label="Budget per person, per day">
                  <span className="block">
                    Backpacker {destination.dailyBudget.backpacker}
                  </span>
                  <span className="block">
                    Comfortable {destination.dailyBudget.comfortable}
                  </span>
                  {destination.dailyBudget.premium !== "—" ? (
                    <span className="block">
                      Premium {destination.dailyBudget.premium}
                    </span>
                  ) : null}
                </IconFact>
                {scored ? (
                  <IconFact icon={CalendarRange} label="Your season">
                    {scored.season.mode === "flexible"
                      ? `Dates open — its best window is ${destination.bestTime}`
                      : `${scored.season.label} — ${scored.seasonNote.note}`}
                  </IconFact>
                ) : null}
              </dl>

              <div className="mt-7 space-y-4 border-t border-cream-line pt-6">
                <LevelMeter
                  label="Nature"
                  value={destination.levels.nature}
                  tone="moss"
                />
                <LevelMeter
                  label="Adventure"
                  value={destination.levels.adventure}
                  tone="clay"
                />
                <LevelMeter
                  label="Crowds"
                  value={destination.levels.crowd}
                  tone="slate"
                  hint={
                    destination.levels.crowd <= 3
                      ? "You'll mostly have it to yourself"
                      : destination.levels.crowd >= 8
                        ? "Expect company, especially on weekends"
                        : "Busy in season, quiet outside it"
                  }
                />
                <LevelMeter
                  label="Nightlife"
                  value={destination.levels.nightlife}
                  tone="slate"
                />
              </div>

              <Link
                href={
                  personalised
                    ? `/plan-trip/itinerary${query}${query ? "&" : "?"}to=${destination.slug}`
                    : "/plan-trip"
                }
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                <Sparkles size={16} className="text-moss" />
                {personalised
                  ? "Build my day-by-day itinerary"
                  : "Plan a trip around this"}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Nearby */}
            <div className="mt-5 rounded-3xl border border-cream-line bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Pairs well with
              </h2>
              <ul className="mt-4 space-y-2">
                {destination.nearby.slice(0, 4).map((slug) => {
                  const n = getDestination(slug);
                  if (!n) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/destinations/${slug}${query}`}
                        className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-cream"
                      >
                        <span className="font-medium">{n.name}</span>
                        <ArrowRight size={14} className="text-neutral-400" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-moss/10 text-moss-deep">
        <Icon size={16} />
      </span>
      {children}
    </h2>
  );
}

function Fact({ label, children }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.14em] text-neutral-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium">{children}</dd>
    </div>
  );
}

function IconFact({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-neutral-400" />
      <div>
        <dt className="text-xs uppercase tracking-[0.14em] text-neutral-400">
          {label}
        </dt>
        <dd className="mt-1 text-sm leading-relaxed text-neutral-700">
          {children}
        </dd>
      </div>
    </div>
  );
}
