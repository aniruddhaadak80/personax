"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CinematicBackdrop } from "@/components/cinematic-backdrop";

const FEATURED = [
  {
    href: "/oracle",
    title: "The Oracle",
    body: "A deterministic superintelligence simulator. Ask it to solve aging and watch a phased research plan unfold — reasoning traces included, zero API keys.",
  },
  {
    href: "/century",
    title: "The Century Engine",
    body: "Two hundred years of civilization as a function of biotechnology. Apply interventions, watch life expectancy, population, and biosphere health cascade.",
  },
  {
    href: "/hallmarks",
    title: "The Twelve Hallmarks",
    body: "The 2023 taxonomy of aging — genomic instability to dysbiosis — mapped to every intervention that targets it.",
  },
];

const SCREENS = [
  { src: "/images/screens/screen-oracle.svg", label: "Oracle console" },
  { src: "/images/screens/screen-century.svg", label: "Century engine" },
  { src: "/images/screens/screen-time-machine.svg", label: "Time machine" },
  { src: "/images/screens/screen-hallmarks.svg", label: "Hallmarks atlas" },
  { src: "/images/screens/screen-gene-drive.svg", label: "Gene drive lab" },
  { src: "/images/screens/screen-worldboard.svg", label: "Worldboard" },
];

export default function LandingPage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16">
      <section className="relative mb-16 overflow-hidden rounded-3xl border border-charcoal">
        <CinematicBackdrop density={180} />
        <div className="relative z-10 flex min-h-[520px] flex-col items-start justify-end gap-6 p-10 md:p-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-mono text-sm uppercase tracking-[0.3em] text-bio-teal"
          >
            world-frame observatory · seed 4093 · live render
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="max-w-4xl font-display text-6xl font-bold leading-[1.02] tracking-tight"
          >
            The frame where superintelligence solves <span className="text-bio-teal">aging</span> —
            and everything else.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl text-lg leading-relaxed text-mist"
          >
            Personax is an open-source simulation of the biotech century. A deterministic Oracle
            plans the research. A century engine propagates every intervention through two hundred
            years of demography, biology, and ethics. Every state is a coordinate you can return to.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/oracle"
              className="rounded-lg bg-bio-teal px-6 py-3 font-display font-semibold text-abyss transition hover:bg-bio-teal-dim"
            >
              Ask the Oracle
            </Link>
            <Link
              href="/century"
              className="rounded-lg border border-genome-violet px-6 py-3 font-display font-semibold text-genome-violet transition hover:bg-genome-violet hover:text-abyss"
            >
              Run the Century Engine
            </Link>
            <Link
              href="/cinematic"
              className="rounded-lg border border-bio-teal/40 px-6 py-3 font-display font-semibold text-bio-teal transition hover:bg-bio-teal/10"
            >
              Watch the film
            </Link>
          </motion.div>
        </div>
      </section>

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block h-8 w-8 rounded-lg bg-bio-teal" aria-hidden />
          <span className="font-display text-xl font-semibold tracking-tight">personax</span>
        </div>
        <nav className="flex gap-6 text-sm text-mist">
          <Link href="/oracle" className="hover:text-bio-teal">
            Oracle
          </Link>
          <Link href="/century" className="hover:text-bio-teal">
            Century Engine
          </Link>
          <Link href="/timeline" className="hover:text-bio-teal">
            Timeline
          </Link>
          <Link href="/worldboard" className="hover:text-bio-teal">
            Worldboard
          </Link>
        </nav>
      </header>

      <section className="mt-24 grid gap-6 md:grid-cols-3">
        {FEATURED.map((f) => (
          <motion.div
            key={f.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={f.href}
              className="group flex h-full flex-col gap-3 rounded-xl border border-charcoal bg-abyss-2 p-6 transition hover:border-bio-teal"
            >
              <h2 className="font-display text-xl font-semibold group-hover:text-bio-teal">
                {f.title}
              </h2>
              <p className="text-sm leading-relaxed text-mist">{f.body}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl font-bold tracking-tight">The product in motion</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
          Six live surfaces, rendered pixel-for-pixel in SVG — each one a deterministic output of
          the seed.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCREENS.map((s, i) => (
            <motion.div
              key={s.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-charcoal bg-abyss-2"
            >
              <Image
                src={s.src}
                alt={s.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/90 to-transparent p-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-bio-teal">
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="mt-32 border-t border-charcoal pt-8 text-sm text-mist">
        <p>
          Personax runs entirely on-device. Every &quot;AI&quot; behavior is a deterministic local
          simulation — no API keys, no network, no surveillance.
        </p>
      </footer>
    </main>
  );
}
