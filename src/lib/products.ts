export type CategoryId =
  | "all"
  | "whey"
  | "mass"
  | "bcaa"
  | "creatine"
  | "preworkout"
  | "accessoires";

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
];

export const WHATSAPP_HREF = "https://wa.me/21628700958";

export const PRODUCTS: Product[] = [
  {
    id: "whey-isolate-2kg",
    name: "Whey Isolate 2 kg",
    category: "whey",
    flavour: "Chocolat",
    size: "2 kg",
    price: "189 DT",
    featured: true,
    tag: "Best-seller",
    detail: "24g protéine/dose",
    image: "/products/whey-isolate-2kg.webp",
    alt: "Pot de whey isolate Protein Shop 2 kg, saveur chocolat",
  },
  {
    id: "whey-gold-1kg",
    name: "Whey Concentrate 1 kg",
    category: "whey",
    flavour: "Vanille",
    size: "1 kg",
    price: "109 DT",
    featured: true,
    image: "/products/whey-concentrate-1kg.jpg",
    alt: "Poche de whey concentrate Protein Shop 1 kg, saveur vanille",
  },
  {
    id: "mass-gainer-5kg",
    name: "Mass Gainer 5 kg",
    category: "mass",
    flavour: "Fraise",
    size: "5 kg",
    price: "249 DT",
    featured: true,
    image: "/products/mass-gainer-5kg.jpg",
    alt: "Pot de mass gainer Protein Shop 5 kg, saveur fraise",
  },
  {
    id: "bcaa-300g",
    name: "BCAA 2:1:1 300 g",
    category: "bcaa",
    flavour: "Fruit punch",
    size: "300 g",
    price: "79 DT",
    featured: true,
    image: "/products/bcaa-fruit-punch.jpg",
    alt: "Pot de BCAA Protein Shop 300 g, saveur fruit punch",
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
    name: "Shaker Protein Shop 700 ml",
    category: "accessoires",
    flavour: "Noir",
    size: "700 ml",
    price: "29 DT",
    featured: true,
    image: "/products/shaker-700.jpg",
    alt: "Shaker Protein Shop 700 ml avec pot de protéines",
  },
  {
    id: "whey-isolate-5kg",
    name: "Whey Isolate 5 kg",
    category: "whey",
    flavour: "Cookies",
    size: "5 kg",
    price: "399 DT",
    featured: false,
    image: "/products/whey-isolate-5kg.jpg",
    alt: "Pot de whey isolate Protein Shop 5 kg, saveur cookies",
  },
  {
    id: "mass-gainer-3kg",
    name: "Mass Gainer 3 kg",
    category: "mass",
    flavour: "Chocolat",
    size: "3 kg",
    price: "169 DT",
    featured: false,
    image: "/products/mass-gainer-3kg.jpg",
    alt: "Gammes de pots et sachets Protein Shop, mass gainer 3 kg",
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
    name: "Whey Hydro 3 kg",
    category: "whey",
    flavour: "Chocolat",
    size: "3 kg",
    price: "259 DT",
    featured: false,
    image: "/products/whey-hydro-3kg.webp",
    alt: "Seau de whey hydro Protein Shop 3 kg, saveur chocolat",
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
    name: "BCAA Powder 255 g",
    category: "bcaa",
    flavour: "Neutre",
    size: "255 g",
    price: "85 DT",
    featured: false,
    image: "/products/bcaa-powder.jpg",
    alt: "Pots de BCAA powder Protein Shop 255 g",
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);

export function productImageSrc(product: Pick<Product, "image">) {
  return product.image;
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
