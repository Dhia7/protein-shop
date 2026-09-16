const ITEMS = [
  "TESTÉ EN LABORATOIRE",
  "SANS SUCRE AJOUTÉ",
  "LIVRAISON 24H GRAND TUNIS",
  "PAIEMENT À LA LIVRAISON",
  "RECOMMANDÉ PAR 12 SALLES",
];

function TrustTrack({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-[60px] pr-[60px]"
    >
      {ITEMS.map((item) => (
        <span key={item} className="inline-flex items-center gap-2.5">
          ✓ {item}
        </span>
      ))}
    </div>
  );
}

export function TrustBar() {
  return (
    <div className="overflow-hidden border-b border-line bg-primary text-[#14100D]">
      <div className="trust-marquee flex w-max py-3.5 text-sm font-extrabold tracking-[0.03em] will-change-transform">
        <TrustTrack />
        <TrustTrack aria-hidden />
      </div>
      <p className="sr-only">{ITEMS.join(" · ")}</p>
    </div>
  );
}
