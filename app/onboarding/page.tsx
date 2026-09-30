import { redirect } from "next/navigation";
import { claimConciergeShop } from "../lib/concierge";
import OnboardingFlow from "./OnboardingFlow";

export default async function OnboardingPage() {
  // If a concierge shop was saved for this vendor's email, attach it and skip onboarding.
  if (await claimConciergeShop()) redirect("/dashboard?new=true");
  return <OnboardingFlow />;
}
