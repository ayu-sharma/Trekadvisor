"use client";

/**
 * Icon names in `questions.js` are plain strings so the question data stays
 * free of React imports. This is the only place that maps them to lucide.
 */
import {
  Backpack,
  BedDouble,
  Building2,
  CalendarDays,
  CalendarPlus,
  CalendarRange,
  CalendarSearch,
  CarFront,
  Coffee,
  Compass,
  Footprints,
  HelpCircle,
  Home,
  Milestone,
  MoonStar,
  Mountain,
  Music,
  Plane,
  Route,
  Scale,
  Snowflake,
  Sparkles,
  Sunrise,
  Tent,
  TreePine,
  User,
  Users,
  UsersRound,
  Heart,
  Wheat,
  Zap,
} from "lucide-react";

const ICONS = {
  Backpack,
  BedDouble,
  Building2,
  CalendarDays,
  CalendarPlus,
  CalendarRange,
  CalendarSearch,
  CarFront,
  Coffee,
  Compass,
  Footprints,
  FootprintsIcon: Footprints,
  HelpCircle,
  Home,
  Milestone,
  MoonStar,
  Mountain,
  Music,
  Plane,
  Route,
  Scale,
  Snowflake,
  Sparkles,
  Sunrise,
  Tent,
  TreePine,
  User,
  Users,
  UsersRound,
  Heart,
  Wheat,
  Zap,
};

export default function OptionIcon({ name, ...props }) {
  const Cmp = ICONS[name] || Compass;
  return <Cmp {...props} />;
}
