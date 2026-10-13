"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Destination artwork.
 *
 * Where we have a real photograph of a place we use it. Where we don't, we
 * draw a mountain scene generated deterministically from the destination's
 * name — never another valley's photo with the wrong label on it.
 */

const PALETTES = {
  // [sky top, sky base, mid ridge, far ridge, light, front ridge]
  forest: ["#0c241d", "#123a2e", "#2b6b52", "#8cc0a2", "#dce9de", "#04120d"],
  river: ["#0b2430", "#123f4e", "#2a7f8a", "#96cfd6", "#dbeaec", "#03141b"],
  ridge: ["#16241a", "#26402a", "#587a49", "#b3cb90", "#e3ead4", "#0a130c"],
  alpine: ["#111d2f", "#1f3652", "#4a6f97", "#a9c6e0", "#dfeaf3", "#080f1c"],
  snow: ["#141c28", "#253345", "#576f8c", "#b2c4d5", "#eaf1f6", "#090f18"],
  heritage: ["#241a20", "#3b2a34", "#6b5361", "#bda49a", "#ecdfd4", "#130c11"],
  desert: ["#241a15", "#3f2c21", "#7d5b3f", "#cda474", "#f0dfc4", "#130c08"],
};
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function prng(seed) {
  let a = seed;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ridge(rand, baseline, amplitude, steps = 7) {
  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = (100 / steps) * i;
    const peak = baseline - rand() * amplitude;
    points.push(`${x.toFixed(1)},${peak.toFixed(1)}`);
  }
  return `M0,100 L0,${baseline.toFixed(1)} L${points.join(" L")} L100,${baseline.toFixed(
    1
  )} L100,100 Z`;
}

/** A few pine silhouettes on the front ridge, for scale and character. */
function pines(rand, baseline, count = 6) {
  const trees = [];
  for (let i = 0; i < count; i += 1) {
    const x = 6 + rand() * 88;
    const h = 4 + rand() * 5;
    const w = h * 0.4;
    trees.push(
      `M${(x - w).toFixed(1)},${baseline.toFixed(1)} L${x.toFixed(1)},${(
        baseline - h
      ).toFixed(1)} L${(x + w).toFixed(1)},${baseline.toFixed(1)} Z`
    );
  }
  return trees.join(" ");
}

export function MountainScene({ slug, palette = "forest", className = "" }) {
  const colors = PALETTES[palette] || PALETTES.forest;
  const id = (slug || "himachal").replace(/[^a-z0-9-]/gi, "");
  const rand = prng(hash(slug || "himachal"));
  const glowX = 22 + rand() * 56;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="62%" stopColor={colors[1]} />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors[4]} stopOpacity="0.3" />
          <stop offset="55%" stopColor={colors[4]} stopOpacity="0.08" />
          <stop offset="100%" stopColor={colors[4]} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="100" height="100" fill={`url(#sky-${id})`} />
      {/* Haze rather than a hard sun disc — a disc reads as a UI artifact */}
      <ellipse cx={glowX} cy="32" rx="44" ry="28" fill={`url(#glow-${id})`} />

      <path d={ridge(rand, 52, 22, 5)} fill={colors[3]} opacity="0.18" />
      <path d={ridge(rand, 68, 26, 6)} fill={colors[2]} opacity="0.5" />
      <path d={ridge(rand, 82, 24, 8)} fill={colors[0]} opacity="0.95" />
      <path d={ridge(rand, 94, 17, 11)} fill={colors[5]} />
      <path d={pines(rand, 95, 7)} fill={colors[5]} />
    </svg>
  );
}

export default function DestinationVisual({
  destination,
  className = "",
  overlay = true,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}) {
  const { slug, name, image, palette } = destination;
  const [failed, setFailed] = useState(false);

  // Callers usually position this themselves (`absolute inset-0`). Adding our
  // own `relative` on top of that is a conflicting position utility, and the
  // one Tailwind emits last wins — which collapsed the layer to zero height.
  const positioned = /\b(absolute|fixed|sticky|relative)\b/.test(className);

  return (
    <div
      className={`${positioned ? "" : "relative"} overflow-hidden bg-ink ${className}`}
    >
      {/* The artwork is always the base layer: it fills the frame while a
          large photo loads, and stays if the photo is missing entirely. */}
      <div className="absolute inset-0">
        <MountainScene slug={slug} palette={palette} />
      </div>

      {image && !failed ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : null}

      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
      ) : null}
    </div>
  );
}
