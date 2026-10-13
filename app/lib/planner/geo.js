/**
 * Route intelligence primitives.
 *
 * Mountain distance is not straight-line distance. We keep a table of real
 * road links for the pairs that matter (and for the ones where geography
 * lies — Manali and Kaza are 100 km apart and nine hours apart) and fall
 * back to a hill-road estimate for everything else.
 */

import { DESTINATIONS_BY_SLUG } from "./destinations.js";

/** Where a trip physically starts. */
export const ORIGINS = {
  delhi: { label: "Delhi / NCR", coords: [28.61, 77.21] },
  chandigarh: { label: "Chandigarh", coords: [30.73, 76.78] },
  punjab: { label: "Punjab", coords: [30.9, 75.85] },
  flexible: { label: "your starting point", coords: [29.7, 76.5] },
};

/** Real road links: km and honest driving hours. */
const ROAD_LINKS = {
  "jibhi|shoja": [12, 0.5],
  "jibhi|tirthan-valley": [12, 0.6],
  "shoja|tirthan-valley": [20, 1],
  "jibhi|manali": [90, 3],
  "jibhi|prashar-lake": [80, 3],
  "shoja|narkanda": [110, 4.5],
  "tirthan-valley|prashar-lake": [85, 3.2],
  "manali|sissu": [40, 1.5],
  "manali|kasol": [75, 2.5],
  "manali|prashar-lake": [110, 3.5],
  "manali|spiti-valley": [200, 9],
  "kasol|tosh": [25, 1.2],
  "kasol|kheerganga": [22, 4],
  "tosh|kheerganga": [8, 3.5],
  "sissu|spiti-valley": [170, 7],
  "shimla|chail": [45, 1.5],
  "shimla|narkanda": [65, 2.5],
  "narkanda|kalpa": [190, 6],
  "kalpa|chitkul": [70, 3],
  "kalpa|spiti-valley": [200, 8],
  "chitkul|spiti-valley": [250, 10],
  "mcleodganj|bir-billing": [60, 2],
  "bir-billing|barot-valley": [50, 2],
  "mcleodganj|dalhousie-khajjiar": [120, 4],
  "mcleodganj|barot-valley": [95, 3.2],
  "dalhousie-khajjiar|churah-valley": [90, 3.5],
  "churah-valley|pangi-valley": [150, 7],
  "dalhousie-khajjiar|pangi-valley": [230, 9],
  "sissu|pangi-valley": [200, 8],
  "prashar-lake|barot-valley": [90, 3.2],
};

function key(a, b) {
  return [a, b].sort().join("|");
}

function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371;
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/**
 * Road link between two destinations: { km, hrs, estimated }.
 * Estimates assume hill roads wind ~1.7x and average 28 km/h.
 */
export function roadLink(slugA, slugB) {
  if (slugA === slugB) return { km: 0, hrs: 0, estimated: false };
  const known = ROAD_LINKS[key(slugA, slugB)];
  if (known) return { km: known[0], hrs: known[1], estimated: false };
  const a = DESTINATIONS_BY_SLUG[slugA];
  const b = DESTINATIONS_BY_SLUG[slugB];
  if (!a || !b) return { km: 0, hrs: 0, estimated: true };
  const crow = haversine(a.coords, b.coords);
  const km = Math.round(crow * 1.7);
  const hrs = Math.round((km / 28) * 2) / 2;
  return { km, hrs: Math.max(hrs, 0.5), estimated: true };
}

/** Are two places in the same practical cluster (a short hop apart)? */
export function sameCluster(slugA, slugB, maxHours = 4) {
  return roadLink(slugA, slugB).hrs <= maxHours;
}

/**
 * Backtracking penalty: how much extra road you take by inserting `via`
 * between `from` and `to`, as a ratio. 0 means it's on the way.
 */
export function detourRatio(fromSlug, viaSlug, toSlug) {
  const direct = roadLink(fromSlug, toSlug).hrs || 0.5;
  const viaTotal =
    roadLink(fromSlug, viaSlug).hrs + roadLink(viaSlug, toSlug).hrs;
  return (viaTotal - direct) / direct;
}

export function originLabel(origin) {
  return (ORIGINS[origin] || ORIGINS.flexible).label;
}
