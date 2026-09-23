import { BlurImage } from "@/components/blur-image";
import { RevealItem, RevealStagger } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { UGC_IMAGES } from "@/lib/media";
import { WRAP } from "@/lib/site";

const TILES = [
  {
    label: "@karim.fit",
    image: UGC_IMAGES.wheyIsolate,
    alt: "Whey isolate Protein Shop utilisée en salle",
  },
  {
    label: "Iron Club Ariana",
    image: UGC_IMAGES.creatine,
    alt: "Créatine Protein Shop au Iron Club Ariana",
  },
  {
    label: "@sarra_lifts",
    image: UGC_IMAGES.massGainer,
    alt: "Mass Gainer Protein Shop",
  },
  {
    label: "Powerhouse Sousse",
    image: UGC_IMAGES.shaker,
    alt: "Shaker Protein Shop à Powerhouse Sousse",
  },
];

const QUOTES = [
  {
    text: "Le goût passe crème et ça se dissout bien, pas de grumeaux comme les autres marques.",
    who: "— Karim B., Iron Club Ariana",
  },
  {
    text: "Livré le lendemain, j'ai payé à la réception. Simple, pas de mauvaise surprise.",
    who: "— Sarra M., La Marsa",
  },
  {
    text: "Ma salle le recommande direct, j'ai testé et j'ai gardé. Bon rapport qualité-prix.",
    who: "— Youssef T., Sousse",
  },
];

export function UgcSection() {
  return (
    <section id="avis" className="scroll-mt-[76px] py-16 md:py-24">
      <div className={WRAP}>
        <SectionHead
          title={
            <>
              Vu dans
              <br />
              vos salles
            </>
          }
          description="Vrais clients, vraies salles — pas des mannequins fitness."
        />
        <RevealStagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TILES.map((tile) => (
            <RevealItem key={tile.label}>
              <div className="relative flex aspect-square items-end overflow-hidden rounded-[2px] p-3.5">
                <BlurImage
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
                <span className="relative z-[1] rounded-full bg-[rgba(16,17,20,0.7)] px-2.5 py-1 text-xs font-bold">
                  {tile.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
        <RevealStagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {QUOTES.map((quote) => (
            <RevealItem key={quote.who}>
              <blockquote className="border-l-[3px] border-primary pl-5">
                <p className="mb-3.5 text-[15px]">&quot;{quote.text}&quot;</p>
                <footer className="text-[13px] font-bold text-chalk-dim">
                  {quote.who}
                </footer>
              </blockquote>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
