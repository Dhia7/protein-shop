"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { BadgeCheck, MessageCircle, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WHATSAPP_HREF } from "@/lib/products";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-primary/15">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -top-24 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <motion.div
          className="flex flex-col gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={item}
            className="text-xs font-medium tracking-[0.18em] text-primary uppercase"
          >
            Paiement à la livraison · Tunisie
          </motion.p>
          <motion.h1
            variants={item}
            className="max-w-xl text-4xl font-semibold tracking-tight text-balance md:text-6xl"
          >
            La boutique protéines pensée pour vendre
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-xl text-muted-foreground md:text-lg"
          >
            Catalogue clair, fiches lisibles et commande simple : WhatsApp et
            paiement à la livraison — le socle de la formule Starter.
          </motion.p>
          <motion.div variants={item}>
            <Badge className="h-auto rounded-lg px-3 py-1 text-xs">
              Soldes du mois : -10 % sur la whey isolate
            </Badge>
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/catalogue">Voir le catalogue</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                Commander sur WhatsApp
              </a>
            </Button>
          </motion.div>
          <motion.ul
            variants={item}
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            <li className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-primary" aria-hidden />
              Paiement à la livraison
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4 text-primary" aria-hidden />
              Commande WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <Truck className="size-4 text-primary" aria-hidden />
              Livraison à réception
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <div
            aria-hidden
            className="hero-glow absolute top-1/2 left-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35 blur-3xl"
          />
          <div className="hero-float relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-primary/40">
            <Image
              src="/products/whey-isolate-2kg.jpg"
              alt="Whey isolate Protein Shop, saveur chocolat"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
