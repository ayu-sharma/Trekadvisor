"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Slim header for the planner surfaces. The landing page keeps its own
 * navbar; here the point is to stay out of the way of the answer.
 */
export default function PlannerHeader({
  tone = "light",
  backHref,
  backLabel = "Back",
  actions = null,
}) {
  const dark = tone === "dark";
  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md ${
        dark
          ? "border-white/10 bg-ink/80 text-white"
          : "border-cream-line bg-cream/85 text-neutral-900"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {backHref ? (
            <Link
              href={backHref}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition-colors ${
                dark
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-neutral-600 hover:bg-black/5 hover:text-neutral-900"
              }`}
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{backLabel}</span>
            </Link>
          ) : null}
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-moss text-sm font-bold text-white">
              T
            </span>
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-moss">Trek</span>
              <span className={dark ? "text-white" : "text-neutral-900"}>
                Advisor
              </span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </header>
  );
}
