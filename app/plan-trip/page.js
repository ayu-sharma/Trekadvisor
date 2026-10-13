import { Suspense } from "react";
import PlanFlow from "./PlanFlow";

export const metadata = {
  title: "Plan Your Trip — TrekAdvisor",
  description:
    "Six questions. We'll tell you where in Himachal you should actually go, and why.",
};

export default function PlanTripPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-ink" aria-busy="true" />}
    >
      <PlanFlow />
    </Suspense>
  );
}
