import type { StaticImageData } from "next/image";
import goalCut from "../../public/goals/goal-cut.webp";
import goalMass from "../../public/goals/goal-mass.jpg";
import goalRecovery from "../../public/goals/goal-recovery.webp";
import heroAthlete from "../../public/hero-athlete.webp";
import bcaa5000FruitPunch from "../../public/products/bcaa-5000-fruit-punch-380g.jpg";
import barresX12 from "../../public/products/barres-x12.webp";
import bigMassGainer3kg from "../../public/products/big-mass-gainer-3kg.jpg";
import casein900g from "../../public/products/casein-900g-chocolat.jpg";
import creatine300g from "../../public/products/creatine-300g.webp";
import creatineCapsules from "../../public/products/creatine-capsules.webp";
import eaaMegaStrong from "../../public/products/eaa-mega-strong-300g.png";
import isolateWheyBanane from "../../public/products/isolate-whey-900g-banane.jpg";
import isolateWheyNeutre from "../../public/products/isolate-whey-900g-neutre.jpg";
import leanWheyIsolate from "../../public/products/lean-whey-isolate-900g.jpg";
import marineCollagen from "../../public/products/marine-collagen-250g.jpg";
import muscleGainer15kg from "../../public/products/muscle-gainer-1-5kg.jpg";
import preworkout from "../../public/products/preworkout.webp";
import shaker3Compartments from "../../public/products/shaker-3-compartments.jpg";
import veganProtein450g from "../../public/products/vegan-protein-450g.jpg";
import wheyCookie900g from "../../public/products/whey-900g-cookie-cream.jpg";
import wheyVanille900g from "../../public/products/whey-900g-vanille.jpg";
import type { Product } from "@/lib/products";

export const HERO_IMAGE = heroAthlete;

export const GOAL_IMAGES = {
  mass: goalMass,
  cut: goalCut,
  recovery: goalRecovery,
} as const;

export const PRODUCT_IMAGES: Record<string, StaticImageData> = {
  "whey-isolate-2kg": isolateWheyNeutre,
  "whey-gold-1kg": wheyVanille900g,
  "mass-gainer-5kg": muscleGainer15kg,
  "bcaa-300g": bcaa5000FruitPunch,
  "vegan-protein-450g": veganProtein450g,
  "barres-x12": barresX12,
  "shaker-700": shaker3Compartments,
  "whey-isolate-5kg": isolateWheyBanane,
  "whey-cookie-900g": wheyCookie900g,
  "mass-gainer-3kg": bigMassGainer3kg,
  "creatine-300g": creatine300g,
  "whey-hydro-3kg": leanWheyIsolate,
  "preworkout-300g": preworkout,
  "casein-900g": casein900g,
  "collagen-250g": marineCollagen,
  "creatine-capsules": creatineCapsules,
  "bcaa-powder": eaaMegaStrong,
};

export function productImage(product: Pick<Product, "id">): StaticImageData {
  const image = PRODUCT_IMAGES[product.id];
  if (!image) {
    throw new Error(`Missing product image for ${product.id}`);
  }
  return image;
}
