import type { StaticImageData } from "next/image";
import goalCut from "../../public/goals/goal-cut.webp";
import goalMass from "../../public/goals/goal-mass.jpg";
import goalRecovery from "../../public/goals/goal-recovery.webp";
import heroAthlete from "../../public/hero-athlete.webp";
import bcaaFruitPunch from "../../public/products/bcaa-fruit-punch.jpg";
import bcaaPowder from "../../public/products/bcaa-powder.jpg";
import barresX12 from "../../public/products/barres-x12.webp";
import creatine300g from "../../public/products/creatine-300g.webp";
import creatineCapsules from "../../public/products/creatine-capsules.webp";
import massGainer3kg from "../../public/products/mass-gainer-3kg.jpg";
import massGainer5kg from "../../public/products/mass-gainer-5kg.jpg";
import preworkout from "../../public/products/preworkout.webp";
import shaker700 from "../../public/products/shaker-700.jpg";
import wheyConcentrate1kg from "../../public/products/whey-concentrate-1kg.jpg";
import wheyHydro3kg from "../../public/products/whey-hydro-3kg.webp";
import wheyIsolate2kg from "../../public/products/whey-isolate-2kg.webp";
import wheyIsolate5kg from "../../public/products/whey-isolate-5kg.jpg";
import type { Product } from "@/lib/products";

export const HERO_IMAGE = heroAthlete;

export const GOAL_IMAGES = {
  mass: goalMass,
  cut: goalCut,
  recovery: goalRecovery,
} as const;

export const PRODUCT_IMAGES: Record<string, StaticImageData> = {
  "whey-isolate-2kg": wheyIsolate2kg,
  "whey-gold-1kg": wheyConcentrate1kg,
  "mass-gainer-5kg": massGainer5kg,
  "bcaa-300g": bcaaFruitPunch,
  "barres-x12": barresX12,
  "shaker-700": shaker700,
  "whey-isolate-5kg": wheyIsolate5kg,
  "mass-gainer-3kg": massGainer3kg,
  "creatine-300g": creatine300g,
  "whey-hydro-3kg": wheyHydro3kg,
  "preworkout-300g": preworkout,
  "creatine-capsules": creatineCapsules,
  "bcaa-powder": bcaaPowder,
};

export function productImage(product: Pick<Product, "id">): StaticImageData {
  const image = PRODUCT_IMAGES[product.id];
  if (!image) {
    throw new Error(`Missing product image for ${product.id}`);
  }
  return image;
}
