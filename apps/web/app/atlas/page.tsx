"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SCREENS = [
  { src: "/images/screens/screen-oracle.svg", label: "Oracle console", hue: "bio-teal" },
  { src: "/images/screens/screen-century.svg", label: "Century engine", hue: "genome-violet" },
  { src: "/images/screens/screen-time-machine.svg", label: "Time machine", hue: "helix-amber" },
  { src: "/images/screens/screen-hallmarks.svg", label: "Hallmarks atlas", hue: "bio-teal" },
  { src: "/images/screens/screen-gene-drive.svg", label: "Gene drive lab", hue: "genome-violet" },
  { src: "/images/screens/screen-worldboard.svg", label: "Worldboard", hue: "helix-amber" },
];

const HUE: Record<string, string> = {
  "bio-teal": "text-bio-teal",
  "genome-violet": "text-genome-violet",
  "helix-amber": "text-helix-amber",
};

export default function AtlasPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setTilt({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ transform: `translate3d(${tilt.x * -8}px, ${tilt.y * -8}px, 0)` }}
      >
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-bio-teal">
          visual atlas · parallax
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-6xl font-bold leading-[1.02] tracking-tight">
          Every surface, <span className="text-genome-violet">tilted by your gaze.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist">
          Six deterministic screens rendered from the seed. Move your cursor — the atlas breathes
          with you.
        </p>
      </motion.div>

      <section className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SCREENS.map((s, i) => (
          <motion.div
            key={s.src}
            initial={{ opacity: 0, y: 30, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, rotateX: -2, rotateY: 2, scale: 1.02 }}
            style={{ transformStyle: "preserve-3d" }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-charcoal bg-abyss-2"
          >
            <Image
              src={s.src}
              alt={s.label}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className={`font-mono text-xs uppercase tracking-[0.2em] ${HUE[s.hue]}`}>
                {s.label}
              </p>
            </div>
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
          href="/showcase"
          className="rounded-lg border border-genome-violet px-6 py-3 font-display font-semibold text-genome-violet"
        >
          Open showcase
        </Link>
      </div>
    </div>
  );
}
