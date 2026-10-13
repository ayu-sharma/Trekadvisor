"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";
import { QUESTIONS, CORE_QUESTIONS } from "@/app/lib/planner/questions";
import { decodeProfile, encodeProfile, isComplete } from "@/app/lib/planner/profile";
import OptionCard from "@/app/components/planner/OptionCard";
import ProgressTrail from "@/app/components/planner/ProgressTrail";
import { MountainScene } from "@/app/components/planner/DestinationVisual";

const CORE_COUNT = CORE_QUESTIONS.length;

const BUILD_STEPS = [
  "Reading your answers",
  "Scoring every destination against your profile",
  "Checking seasons, roads and travel time",
  "Ranking your matches",
];

export default function PlanFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialAnswers = useMemo(
    () => decodeProfile(searchParams),
    [searchParams]
  );

  const [answers, setAnswers] = useState(initialAnswers);
  const [index, setIndex] = useState(() => {
    const q = Number(searchParams.get("q"));
    if (!Number.isNaN(q) && q >= 1 && q <= QUESTIONS.length) return q - 1;
    const firstUnanswered = QUESTIONS.findIndex((question) => {
      const v = initialAnswers[question.id];
      return Array.isArray(v) ? v.length === 0 : !v;
    });
    return firstUnanswered === -1 ? 0 : firstUnanswered;
  });
  const [building, setBuilding] = useState(false);
  const [buildStep, setBuildStep] = useState(0);

  const question = QUESTIONS[index];
  const answer = answers[question.id];
  const answered = Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
  const isLast = index === QUESTIONS.length - 1;

  const steps = QUESTIONS.map((q) => ({
    id: q.id,
    label: q.label,
    optional: Boolean(q.optional),
    answered: Array.isArray(answers[q.id])
      ? answers[q.id].length > 0
      : Boolean(answers[q.id]),
  }));

  const finish = useCallback(
    (finalAnswers) => {
      setBuilding(true);
      const query = encodeProfile(finalAnswers);
      // Show the work for a beat — then hand over the results.
      let step = 0;
      const timer = setInterval(() => {
        step += 1;
        setBuildStep(step);
        if (step >= BUILD_STEPS.length) {
          clearInterval(timer);
          router.push(`/plan-trip/results?${query}`);
        }
      }, 320);
    },
    [router]
  );

  const goNext = useCallback(
    (nextAnswers = answers) => {
      if (index < QUESTIONS.length - 1) {
        setIndex(index + 1);
      } else {
        finish(nextAnswers);
      }
    },
    [answers, finish, index]
  );

  const select = useCallback(
    (optionId) => {
      if (question.kind === "multi") {
        setAnswers((prev) => {
          const current = prev[question.id] || [];
          const next = current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId];
          return { ...prev, [question.id]: next };
        });
        return;
      }
      const next = { ...answers, [question.id]: optionId };
      setAnswers(next);
      // A short beat so the selection registers visually before moving on.
      setTimeout(() => goNext(next), 260);
    },
    [answers, goNext, question]
  );

  const goBack = useCallback(() => {
    if (index > 0) setIndex(index - 1);
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (building) return;
      if (e.key >= "1" && e.key <= "9") {
        const i = Number(e.key) - 1;
        if (question.options[i]) select(question.options[i].id);
      } else if (e.key === "Enter") {
        if (answered || question.optional) goNext();
      } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
        goBack();
      } else if (e.key === "ArrowRight") {
        if (answered || question.optional) goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, building, goBack, goNext, question, select]);

  const counter = question.optional
    ? `Optional · ${index - CORE_COUNT + 1} of ${QUESTIONS.length - CORE_COUNT}`
    : `Question ${index + 1} of ${CORE_COUNT}`;

  if (building) {
    return (
      <BuildingState answers={answers} step={buildStep} />
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-ink font-sans text-white">
      <Backdrop />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-moss text-sm font-bold text-white">
            T
          </span>
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-moss">Trek</span>Advisor
          </span>
        </Link>

        <div className="hidden sm:block">
          <ProgressTrail
            steps={steps}
            currentIndex={index}
            onJump={(i) => setIndex(i)}
          />
        </div>

        <Link
          href="/"
          aria-label="Leave the planner"
          className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </Link>
      </header>

      {/* Question */}
      <main className="relative z-10 flex flex-1 items-center px-4 pb-10 sm:px-8">
        <div key={question.id} className="mx-auto w-full max-w-3xl">
          <p className="planner-rise text-[11px] font-semibold uppercase tracking-[0.22em] text-moss">
            {counter}
          </p>
          <h1 className="planner-rise planner-delay-1 mt-4 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
            {question.title}
          </h1>
          <p className="planner-rise planner-delay-2 mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            {question.subtitle}
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
            {question.options.map((option, i) => (
              <div
                key={option.id}
                className={`planner-rise planner-delay-${Math.min(i + 2, 5)}`}
              >
                <OptionCard
                  option={option}
                  index={i}
                  selected={
                    Array.isArray(answer)
                      ? answer.includes(option.id)
                      : answer === option.id
                  }
                  onSelect={select}
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={goBack}
              disabled={index === 0}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="flex items-center gap-3">
              {question.optional && !answered ? (
                <button
                  type="button"
                  onClick={() => goNext()}
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Skip this
                </button>
              ) : null}

              {(question.kind === "multi" || isLast || answered) && (
                <button
                  type="button"
                  onClick={() => goNext()}
                  className="inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-moss-deep hover:shadow-xl"
                >
                  {isLast ? (
                    <>
                      <Sparkles size={16} />
                      Find my matches
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Mobile progress */}
          <div className="mt-8 flex justify-center sm:hidden">
            <ProgressTrail
              steps={steps}
              currentIndex={index}
              onJump={(i) => setIndex(i)}
            />
          </div>

          <p className="mt-8 text-center text-xs text-white/30">
            {/* Keyboard hints are noise on a phone */}
            <span className="hidden sm:inline">
              Press{" "}
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">1</kbd>
              –
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">4</kbd>{" "}
              to choose ·{" "}
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">←</kbd>{" "}
              to go back
            </span>
            {isComplete(answers) && index < QUESTIONS.length - 1 ? (
              <>
                <span className="hidden sm:inline"> · </span>
                <button
                  type="button"
                  onClick={() => finish(answers)}
                  className="underline underline-offset-4 hover:text-white/70"
                >
                  skip ahead to my results
                </button>
              </>
            ) : null}
          </p>
        </div>
      </main>
    </div>
  );
}

function Backdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(22,163,74,0.16),transparent_60%)]" />
      <div className="planner-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] opacity-40">
        <MountainScene slug="planner-canvas" palette="forest" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] bg-gradient-to-t from-ink via-ink/55 to-transparent" />
    </>
  );
}

function BuildingState({ answers, step }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-6 font-sans text-white">
      <Backdrop />
      <div className="relative z-10 w-full max-w-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-moss">
          Building your traveller profile
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Matching you to Himachal.
        </h2>

        <ul className="mt-8 space-y-3">
          {BUILD_STEPS.map((label, i) => (
            <li
              key={label}
              className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
                i <= step ? "opacity-100" : "opacity-30"
              }`}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] ${
                  i < step
                    ? "border-moss bg-moss text-white"
                    : i === step
                      ? "border-moss text-moss"
                      : "border-white/25 text-white/40"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </span>
              {label}
            </li>
          ))}
        </ul>

        <div className="planner-sweep relative mt-8 h-1 overflow-hidden rounded-full bg-white/10" />

        <p className="mt-6 text-xs text-white/35">
          {Object.keys(answers).length} answers · 21 destinations · weighted on
          interests, group, pace, length, budget, season and travel time.
        </p>
      </div>
    </div>
  );
}
