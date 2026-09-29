import { BundleCta } from "@/components/bundle-cta";
import { EssentialsGrid } from "@/components/essentials-grid";
import { GoalFinder } from "@/components/goal-finder";
import { HomeCta } from "@/components/home-cta";
import { HomeHero } from "@/components/home-hero";
import { PartnersBar } from "@/components/partners-bar";
import { TrustBar } from "@/components/trust-bar";
import { HOME_ARRIVALS } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HomeHero />
      <TrustBar />
      <EssentialsGrid products={HOME_ARRIVALS} />
      <GoalFinder />
      <BundleCta />
      <PartnersBar />
      <HomeCta />
    </div>
  );
}
