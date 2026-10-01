import type { TranslationKey } from "@/lib/i18n";

export type CategoryId =
  | "all"
  | "whey"
  | "mass"
  | "bcaa"
  | "creatine"
  | "preworkout"
  | "accessoires"
  | "vegan"
  | "casein"
  | "collagen"
  | "eaa";

export type ProductCategory = Exclude<CategoryId, "all">;

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  flavour: string;
  size: string;
  price: string;
  featured: boolean;
  image: string;
  alt: string;
  tag?: string;
  detail?: string;
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "whey", label: "Whey" },
  { id: "mass", label: "Mass gainer" },
  { id: "bcaa", label: "BCAA" },
  { id: "creatine", label: "Créatine" },
  { id: "preworkout", label: "Pré-workout" },
  { id: "accessoires", label: "Accessoires" },
  { id: "vegan", label: "Vegan" },
  { id: "casein", label: "Caséine" },
  { id: "collagen", label: "Collagène" },
  { id: "eaa", label: "EAA" },
];

export const WHATSAPP_HREF = "https://wa.me/21628700958";

export const PRODUCTS: Product[] = [
  {
    id: "whey-isolate-2kg",
    name: "Whey Isolate 900 g",
    category: "whey",
    flavour: "Neutre",
    size: "900 g",
    price: "145 DT",
    featured: true,
    tag: "Best-seller",
    detail: "26g protéine/dose",
    image: "/products/isolate-whey-900g-neutre.jpg",
    alt: "Pochette de whey isolate 900 g, goût neutre",
  },
  {
    id: "whey-gold-1kg",
    name: "Whey Protein 900 g",
    category: "whey",
    flavour: "Vanille",
    size: "900 g",
    price: "109 DT",
    featured: true,
    detail: "21g protéine/dose",
    image: "/products/whey-900g-vanille.jpg",
    alt: "Pochette de whey protein 900 g, saveur vanille",
  },
  {
    id: "mass-gainer-5kg",
    name: "Muscle Gainer 1,5 kg",
    category: "mass",
    flavour: "Vanille",
    size: "1,5 kg",
    price: "129 DT",
    featured: true,
    detail: "Whey & oats · 33g protéine/100g",
    image: "/products/muscle-gainer-1-5kg.jpg",
    alt: "Pochette de muscle gainer whey et avoine 1,5 kg, saveur vanille",
  },
  {
    id: "bcaa-300g",
    name: "BCAA 2:1:1 380 g",
    category: "bcaa",
    flavour: "Fruit punch",
    size: "380 g",
    price: "79 DT",
    featured: true,
    detail: "5g BCAA/dose · 40 servings",
    image: "/products/bcaa-5000-fruit-punch-380g.jpg",
    alt: "Pot de BCAA 2:1:1 380 g, saveur fruit punch",
  },
  {
    id: "vegan-protein-450g",
    name: "Vegan Protein 450 g",
    category: "vegan",
    flavour: "Chocolat noisette",
    size: "450 g",
    price: "95 DT",
    featured: true,
    tag: "Nouveau",
    detail: "21g protéine/dose · 100% végétal",
    image: "/products/vegan-protein-450g.jpg",
    alt: "Pochette de protéine vegan 450 g, saveur chocolat noisette",
  },
  {
    id: "barres-x12",
    name: "Barres protéinées x12",
    category: "accessoires",
    flavour: "Assortiment",
    size: "12 unités",
    price: "54 DT",
    featured: true,
    tag: "Snack",
    detail: "20g protéine",
    image: "/products/barres-x12.webp",
    alt: "Barres protéinées Protein Shop x12, assortiment",
  },
  {
    id: "shaker-700",
    name: "Shaker 3 compartiments",
    category: "accessoires",
    flavour: "Noir",
    size: "3-en-1",
    price: "29 DT",
    featured: true,
    detail: "Pilulier + pot poudre + boule mixeuse",
    image: "/products/shaker-3-compartments.jpg",
    alt: "Shaker 3 compartiments avec pilulier, pot poudre et boule mixeuse",
  },
  {
    id: "whey-isolate-5kg",
    name: "Whey Isolate 900 g",
    category: "whey",
    flavour: "Banane",
    size: "900 g",
    price: "145 DT",
    featured: false,
    detail: "24g protéine/dose",
    image: "/products/isolate-whey-900g-banane.jpg",
    alt: "Pochette de whey isolate 900 g, saveur banane",
  },
  {
    id: "whey-cookie-900g",
    name: "Whey Protein 900 g",
    category: "whey",
    flavour: "Cookie & cream",
    size: "900 g",
    price: "109 DT",
    featured: false,
    tag: "Nouveau",
    detail: "21g protéine/dose",
    image: "/products/whey-900g-cookie-cream.jpg",
    alt: "Pochette de whey protein 900 g, saveur cookie et crème",
  },
  {
    id: "mass-gainer-3kg",
    name: "Big Mass Gainer 3 kg",
    category: "mass",
    flavour: "Strawberry ice cream",
    size: "3 kg",
    price: "169 DT",
    featured: false,
    detail: "80g protéine · 1351 kcal/dose",
    image: "/products/big-mass-gainer-3kg.jpg",
    alt: "Pot de mass gainer 3 kg, saveur strawberry ice cream",
  },
  {
    id: "creatine-300g",
    name: "Créatine Creapure 300 g",
    category: "creatine",
    flavour: "Fruit fusion",
    size: "300 g",
    price: "69 DT",
    featured: true,
    image: "/products/creatine-300g.webp",
    alt: "Pot de créatine micronisée Protein Shop 300 g, saveur fruit fusion",
  },
  {
    id: "whey-hydro-3kg",
    name: "Lean Whey Isolate 900 g",
    category: "whey",
    flavour: "Vanille & chocolat",
    size: "900 g",
    price: "159 DT",
    featured: false,
    tag: "Nouveau",
    detail: "26g protéine/dose · low fat",
    image: "/products/lean-whey-isolate-900g.jpg",
    alt: "Pochettes Lean Whey isolate 900 g, vanille et chocolat",
  },
  {
    id: "preworkout-300g",
    name: "Pré-workout High Stim",
    category: "preworkout",
    flavour: "Framboise",
    size: "300 g",
    price: "89 DT",
    featured: true,
    tag: "Nouveau",
    detail: "30 servings",
    image: "/products/preworkout.webp",
    alt: "Pot de pré-workout Protein Shop 300 g, saveur framboise",
  },
  {
    id: "casein-900g",
    name: "Caséine micellaire 900 g",
    category: "casein",
    flavour: "Chocolat",
    size: "900 g",
    price: "135 DT",
    featured: false,
    tag: "Nouveau",
    detail: "22g protéine/dose",
    image: "/products/casein-900g-chocolat.jpg",
    alt: "Pochette de caséine micellaire 900 g, saveur chocolat",
  },
  {
    id: "collagen-250g",
    name: "Collagène marin 250 g",
    category: "collagen",
    flavour: "Neutre",
    size: "250 g",
    price: "119 DT",
    featured: false,
    tag: "Nouveau",
    detail: "Type I et II · 25 doses",
    image: "/products/marine-collagen-250g.jpg",
    alt: "Pochette de collagène marin 250 g, non aromatisé",
  },
  {
    id: "creatine-capsules",
    name: "Créatine Monohydrate",
    category: "creatine",
    flavour: "Neutre",
    size: "240 gélules",
    price: "75 DT",
    featured: false,
    detail: "750 mg / gélule",
    image: "/products/creatine-capsules.webp",
    alt: "Flacon de créatine monohydrate Protein Shop, 240 gélules",
  },
  {
    id: "bcaa-powder",
    name: "EAA Mega Strong 300 g",
    category: "eaa",
    flavour: "Mango + orange",
    size: "300 g",
    price: "85 DT",
    featured: false,
    tag: "Nouveau",
    detail: "8g EAA/dose · 25 servings",
    image: "/products/eaa-mega-strong-300g.png",
    alt: "Pot d'EAA Mega Strong 300 g, saveur mango orange",
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);

export const HOME_ARRIVALS = FEATURED_PRODUCTS.slice(0, 4);

export function categoryCount(id: CategoryId) {
  if (id === "all") return PRODUCTS.length;
  return PRODUCTS.filter((product) => product.category === id).length;
}

export const HERO_PRODUCT_ID = "whey-isolate-2kg";

export function getProduct(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}

export function getHeroProduct() {
  return getProduct(HERO_PRODUCT_ID) ?? PRODUCTS[0];
}

export function productHref(id: string) {
  return `/produit/${id}`;
}

export function relatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  ).slice(0, limit);
}

export const CATEGORY_LABEL_KEYS: Record<ProductCategory, TranslationKey> = {
  whey: "catWhey",
  mass: "catGainers",
  bcaa: "catAmino",
  creatine: "creatine",
  preworkout: "preworkout",
  accessoires: "catAccess",
  vegan: "catVegan",
  casein: "catCasein",
  collagen: "catCollagen",
  eaa: "catEaa",
};

export const PRODUCT_TAG_KEYS: Record<string, TranslationKey> = {
  "Best-seller": "tagBestSeller",
  Nouveau: "tagNew",
};

export function categoryLabel(id: ProductCategory) {
  return CATEGORIES.find((category) => category.id === id)?.label ?? id;
}

export function productOrderHref(product: Product) {
  const message = encodeURIComponent(
    `Bonjour Protein Shop, je souhaite commander : ${product.name} (${product.flavour}, ${product.size}).`,
  );
  return `${WHATSAPP_HREF}?text=${message}`;
}

export function isCategoryId(value: string | undefined): value is CategoryId {
  return CATEGORIES.some((category) => category.id === value);
}
