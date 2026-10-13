"use client";

import { Check } from "lucide-react";
import OptionIcon from "./optionIcons";

export default function OptionCard({
  option,
  index,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
      className={`group relative flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer sm:p-6
        ${
          selected
            ? "border-moss bg-moss/10 shadow-[0_0_0_1px_rgba(22,163,74,0.6)]"
            : "border-white/12 bg-white/[0.035] hover:border-white/30 hover:bg-white/[0.07]"
        }`}
    >
      <span
        className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
          selected
            ? "bg-moss text-white"
            : "bg-white/[0.07] text-white/70 group-hover:text-white"
        }`}
      >
        <OptionIcon name={option.icon} size={20} strokeWidth={1.6} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-lg font-medium tracking-tight text-white">
            {option.label}
          </span>
        </span>
        {option.hint ? (
          <span className="mt-1 block text-sm leading-relaxed text-white/55">
            {option.hint}
          </span>
        ) : null}
      </span>

      <span className="ml-auto flex h-6 items-center gap-2 self-center">
        {selected ? (
          <Check size={18} className="text-moss" strokeWidth={2.4} />
        ) : (
          <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 text-[11px] font-medium text-white/35 sm:block">
            {index + 1}
          </kbd>
        )}
      </span>
    </button>
  );
}
