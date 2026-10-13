"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { profileChips } from "@/app/lib/planner/profile";

/**
 * The traveller's own answers, shown back to them. This is what makes a
 * recommendation feel answered rather than generated.
 */
export default function ProfileChips({
  answers,
  editHref,
  tone = "light",
  title = "Recommended for you because you chose",
}) {
  const chips = profileChips(answers);
  if (!chips.length) return null;
  const dark = tone === "dark";

  return (
    <div>
      {title ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
              dark ? "text-white/45" : "text-neutral-500"
            }`}
          >
            {title}
          </p>
          {editHref ? (
            <Link
              href={editHref}
              className={`inline-flex items-center gap-1.5 text-xs font-medium underline-offset-4 hover:underline ${
                dark ? "text-white/70" : "text-moss-deep"
              }`}
            >
              <Pencil size={12} />
              Change answers
            </Link>
          ) : null}
        </div>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((chip, i) => (
          <span
            key={`${chip.questionId}-${i}`}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm ${
              dark
                ? "border-white/15 bg-white/[0.06] text-white/85"
                : "border-cream-line bg-white text-neutral-700"
            }`}
          >
            <span aria-hidden="true">{chip.icon}</span>
            {chip.label}
          </span>
        ))}
      </div>
    </div>
  );
}
