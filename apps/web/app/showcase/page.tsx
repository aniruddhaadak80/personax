"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const HUE_CLASS: Record<string, string> = {
  "bio-teal": "text-bio-teal",
  "genome-violet": "text-genome-violet",
  "helix-amber": "text-helix-amber",
};

const CARDS = [
  {
    title: "Deterministic Oracle",
    body: "Six-state FSM. Same prompt + seed = byte-identical plan.",
    stat: "6 phases",
    hue: "bio-teal",
  },
  {
    title: "Century Engine",
    body: "RK4-propagated 200 years of civilization, anchored to UN WPP.",
    stat: "200y",
    hue: "genome-violet",
  },
  {
    title: "Time Machine",
    body: "Every year a coordinate. Fork, replay, compare worlds side by side.",
    stat: "201 coordinates",
    hue: "helix-amber",
  },
  {
    title: "Gene Drive Lab",
    body: "Three-allele recursion over 60 generations with resistance.",
    stat: "3 alleles",
    hue: "bio-teal",
  },
  {
    title: "Epigenetic Clocks",
    body: "Horvath → GrimAge → DunedinPACE, with real CpG counts.",
    stat: "8 clocks",
    hue: "genome-violet",
  },
  {
    title: "Scenario Priors",
    body: "Six futures, each with its own adoption and knowledge multipliers.",
    stat: "6 worlds",
    hue: "helix-amber",
  },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // simple CSS-driven count via motion not worth; render static labeled value
  return (
    <span ref={ref} className="font-display text-5xl font-bold tabular-nums">
      {to.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ShowcasePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-bio-teal">
          showcase · ultra
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-6xl font-bold leading-[1.02] tracking-tight">
          Six surfaces. One seed. <span className="text-genome-violet">Infinite worlds.</span>
        </h1>
      </motion.div>

      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24, rotateX: 4 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-charcoal bg-abyss-2 p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(45,212,191,0.08),transparent_50%)] opacity-0 transition group-hover:opacity-100" />
            <div className="relative z-10 flex flex-col gap-3">
              <span className={`font-mono text-xs uppercase tracking-[0.2em] ${HUE_CLASS[c.hue]}`}>
                {c.stat}
              </span>
              <h2 className="font-display text-xl font-semibold">{c.title}</h2>
              <p className="text-sm leading-relaxed text-mist">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="mt-20 grid gap-8 sm:grid-cols-3">
        {[
          { label: "routes", to: 82 },
          { label: "tests", to: 97 },
          { label: "planes of simulation", to: 200 },
        ].map(({ label, to }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-charcoal bg-abyss-2 p-8 text-center"
          >
            <Counter to={to} />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-mist">{label}</p>
          </motion.div>
        ))}
      </section>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link
          href="/cinematic"
          className="rounded-lg bg-bio-teal px-6 py-3 font-display font-semibold text-abyss"
        >
          Watch the film
        </Link>
        <Link
          href="/oracle"
          className="rounded-lg border border-genome-violet px-6 py-3 font-display font-semibold text-genome-violet"
        >
          Ask the Oracle
        </Link>
      </div>
    </div>
  );
}
