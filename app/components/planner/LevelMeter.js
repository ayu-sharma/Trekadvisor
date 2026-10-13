"use client";

export default function LevelMeter({ label, value, max = 10, hint, tone = "moss" }) {
  const pct = Math.round((value / max) * 100);
  const tones = {
    moss: "bg-moss",
    clay: "bg-clay",
    slate: "bg-slate-ink",
  };
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-neutral-800">{label}</span>
        <span className="text-xs font-medium tabular-nums text-neutral-500">
          {value}/{max}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.07]">
        <div
          className={`h-full rounded-full ${tones[tone] || tones.moss}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {hint ? <p className="mt-1.5 text-xs text-neutral-500">{hint}</p> : null}
    </div>
  );
}
