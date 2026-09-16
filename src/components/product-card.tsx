import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WHATSAPP_HREF, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const message = encodeURIComponent(
    `Bonjour Protein Shop, je souhaite commander : ${product.name} (${product.flavour}, ${product.size}).`,
  );

  return (
    <Card className="h-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1">
      <div className="relative aspect-[4/3] bg-background">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{product.name}</CardTitle>
          <Badge>{product.price}</Badge>
        </div>
        <CardDescription>
          {product.flavour} · {product.size}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Paiement à la livraison.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild className="flex-1">
          <a
            href={`${WHATSAPP_HREF}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Commander
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/catalogue">Catalogue</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
