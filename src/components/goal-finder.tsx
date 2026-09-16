import Link from "next/link";
import { SectionHead } from "@/components/section-head";
import { WRAP } from "@/lib/site";

const GOALS = [
  {
    num: "01",
    title: "Prise de masse",
    body: "Whey calorique, gainer, créatine — pour construire du volume sérieusement.",
    href: "/catalogue?categorie=mass",
  },
  {
    num: "02",
    title: "Sèche",
    body: "Isolat léger, brûleur, coupe-faim naturel — garder le muscle, perdre le reste.",
    href: "/catalogue?categorie=whey",
  },
  {
    num: "03",
    title: "Récupération",
    body: "BCAA, whey rapide, électrolytes — pour encaisser les séances qui s'enchaînent.",
    href: "/catalogue?categorie=bcaa",
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
              className="bg-iron-2 px-[30px] py-10 transition-colors hover:bg-iron"
            >
              <span className="font-display mb-5 block text-sm text-primary">
                {goal.num}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
