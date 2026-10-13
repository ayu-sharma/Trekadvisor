"use client";

/**
 * ● ━━━ ○ ━━━ ○  — six core questions, then the two optional ones as
 * dashed segments so nobody feels obliged to answer them.
 */
export default function ProgressTrail({ steps, currentIndex, onJump }) {
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((step, i) => {
        const done = step.answered && i !== currentIndex;
        const active = i === currentIndex;
        const reachable = step.answered || i <= currentIndex;
        return (
          <div key={step.id} className="flex items-center gap-1.5">
            {i > 0 && (
              <span
                className={`h-px w-5 sm:w-8 ${
                  step.optional
                    ? "border-t border-dashed border-white/25"
                    : done || active
                      ? "bg-moss/70"
                      : "bg-white/15"
                }`}
              />
            )}
            <button
              type="button"
              disabled={!reachable}
              onClick={() => reachable && onJump(i)}
              aria-label={`Question ${i + 1}: ${step.label}`}
              aria-current={active ? "step" : undefined}
              className={`grid place-items-center rounded-full transition-all duration-300 ${
                reachable ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active
                    ? "h-3 w-3 bg-moss ring-4 ring-moss/20"
                    : done
                      ? "h-2.5 w-2.5 bg-moss/80"
                      : "h-2.5 w-2.5 border border-white/30 bg-transparent"
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
