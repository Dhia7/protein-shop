import { WRAP } from "@/lib/site";

const PARTNERS = [
  "IRON CLUB",
  "POWERHOUSE",
  "FLEX GYM",
  "TITAN FITNESS",
  "APEX",
];

export function PartnersBar() {
  return (
    <div id="partenaires" className="scroll-mt-[76px] border-y border-line bg-iron-2">
      <div
        className={`${WRAP} flex flex-wrap items-center justify-between gap-5 py-9`}
      >
        <span className="text-xs font-extrabold tracking-[0.04em] text-chalk-dim">
          RECOMMANDÉ PAR
        </span>
        <div className="font-display flex flex-wrap gap-10 text-xl tracking-[0.02em] opacity-50">
          {PARTNERS.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
