"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CATEGORIES,
  PRODUCTS,
  type CategoryId,
} from "@/lib/products";

export function CatalogueBrowser({
  initialCategory,
}: {
  initialCategory: CategoryId;
}) {
  const [category, setCategory] = useState<CategoryId>(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const catOk = category === "all" || product.category === category;
      const haystack =
        `${product.name} ${product.flavour} ${product.size}`.toLowerCase();
      return catOk && (q.length === 0 || haystack.includes(q));
    });
  }, [category, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un produit…"
          className="sm:max-w-xs"
          aria-label="Rechercher un produit"
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={category === item.id ? "default" : "outline"}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Aucun produit ne correspond à cette recherche. Essayez une autre
          catégorie ou un autre mot-clé.
        </p>
      )}
    </div>
  );
}
