import Link from "next/link";
import type { StaticImageData } from "next/image";
import { BlurImage } from "@/components/blur-image";
import { SectionHead } from "@/components/section-head";
import { GOAL_IMAGES } from "@/lib/media";
import { WRAP } from "@/lib/site";

const GOALS: {
  num: string;
  title: string;
  body: string;
  href: string;
  image: StaticImageData;
  alt: string;
}[] = [
  {
    num: "01",
    title: "Prise de masse",
    body: "Whey calorique, gainer, créatine — pour construire du volume sérieusement.",
    href: "/catalogue?categorie=mass",
    image: GOAL_IMAGES.mass,
    alt: "Sachet de mass gainer et athlète buvant un shake",
  },
  {
    num: "02",
    title: "Sèche",
    body: "Isolat léger, brûleur, coupe-faim naturel — garder le muscle, perdre le reste.",
    href: "/catalogue?categorie=whey",
    image: GOAL_IMAGES.cut,
    alt: "Tisane coupe-faim naturel",
  },
  {
    num: "03",
    title: "Récupération",
    body: "BCAA, whey rapide, électrolytes — pour encaisser les séances qui s'enchaînent.",
    href: "/catalogue?categorie=bcaa",
    image: GOAL_IMAGES.recovery,
    alt: "Pot de BCAA et glutamine",
  },
];

export function GoalFinder() {
  return (
    <section
      id="objectif"
      className="scroll-mt-[76px] border-b border-line bg-iron-2 py-16 md:py-24"
    >
      <div className={WRAP}>
        <SectionHead
          title={
            <>
              C&apos;est quoi
              <br />
              ton objectif ?
            </>
          }
          description="Réponds à 3 questions, on te propose le bon produit — pas toute la boutique."
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {GOALS.map((goal) => (
            <article
              key={goal.num}
              className="goal-card group relative z-0 flex min-h-[380px] flex-col justify-end overflow-hidden px-[30px] py-10 md:min-h-[440px]"
            >
              <BlurImage
                src={goal.image}
                alt={goal.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="goal-card-image object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,17,20,0.9)_0%,rgba(16,17,20,0.45)_46%,rgba(16,17,20,0.12)_100%)]"
              />
              <div className="relative z-[1]">
                <span className="font-display mb-5 block text-sm text-primary">
                  <span className="goal-num-digits inline-block origin-center transition-transform duration-300 ease-out group-hover:scale-110">
                    {goal.num}
                  </span>
                  <span
                    aria-hidden
                    className="goal-num-bar mt-1.5 block h-px w-[1.6em] origin-start scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </span>
                <h3 className="font-display mb-2.5 text-[26px] uppercase">
                  {goal.title}
                </h3>
                <p className="mb-5 text-sm text-chalk-dim">{goal.body}</p>
                <Link
                  href={goal.href}
                  className="text-[13px] font-extrabold text-primary no-underline"
                >
                  Voir le pack →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
