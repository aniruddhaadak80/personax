"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CinematicBackdrop } from "@/components/cinematic-backdrop";

const TIMELINE = [
  { t: 0, label: "0:00", caption: "The frame opens. Seed 4093 awakens as a world of numbers." },
  {
    t: 0.18,
    label: "0:12",
    caption: "The Oracle begins its six-state cycle — perceive, decompose, research.",
  },
  {
    t: 0.36,
    label: "0:24",
    caption: "Hallmarks, interventions, clocks fuse into a six-phase plan.",
  },
  {
    t: 0.55,
    label: "0:36",
    caption: "The Century Engine propagates two hundred years of civilization.",
  },
  {
    t: 0.74,
    label: "0:48",
    caption: "Life expectancy curves escape velocity as interventions compound.",
  },
  {
    t: 0.92,
    label: "1:00",
    caption: "Every state becomes a coordinate. Scrub, fork, share the seed.",
  },
];

const FIRST_CHAPTER = TIMELINE[0] ?? { t: 0, label: "0:00", caption: "" };

export default function CinematicPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [chapter, setChapter] = useState(FIRST_CHAPTER);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const resize = () => {
      canvas.width = canvas.clientWidth * 2;
      canvas.height = canvas.clientHeight * 2;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const step = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const p = t % 1;
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#070b12");
      bg.addColorStop(1, "#101826");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      // rising LE curve
      ctx.strokeStyle = "#2dd4bf";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const x = (i / 60) * w;
        const y = h - (73.8 + 8 * Math.sqrt(i) + 90 * p * Math.sin(i * 0.13)) * 1.3;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const x = (i / 60) * w;
        const y = h - (73.8 + 2 * i * 0.8) * 1.3;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // orbital particles
      for (let i = 0; i < 40; i++) {
        const ang = p * Math.PI * 2 + (i / 40) * Math.PI * 2;
        const r = 60 + i * 1.8;
        const cx = w / 2 + Math.cos(ang) * (r + 60);
        const cy = h / 2 + Math.sin(ang) * (r * 0.6);
        ctx.fillStyle = `rgba(245,158,11,${0.3 + 0.5 * Math.sin(ang)})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      t += 0.004;
      setProgress(p);
      const chap = [...TIMELINE].reverse().find((c) => p >= c.t) ?? FIRST_CHAPTER;
      setChapter(chap);
      if (playing) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [playing]);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16">
      <h1 className="font-display text-5xl font-bold tracking-tight">The Personax film</h1>
      <p className="mt-3 max-w-2xl text-sm text-mist">
        A deterministic, fully local motion picture of the frame — no network, no renderer, no
        asset.
      </p>
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-charcoal">
        <CinematicBackdrop density={120} />
        <canvas ref={canvasRef} className="relative z-10 h-[460px] w-full" />
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-4 bg-gradient-to-t from-abyss/90 to-transparent p-6">
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="rounded-full bg-bio-teal px-5 py-2 font-display text-sm font-semibold text-abyss"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-charcoal">
            <motion.div
              className="h-full bg-bio-teal"
              animate={{ width: `${progress * 100}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          <span className="font-mono text-xs text-mist">{chapter.label}</span>
        </div>
      </div>
      <motion.div
        key={chapter.label}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl border border-charcoal bg-abyss-2 p-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-genome-violet">Chapter</p>
        <p className="mt-2 text-lg leading-relaxed text-star-white">{chapter.caption}</p>
      </motion.div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {TIMELINE.map((c) => (
          <div key={c.label} className="rounded-xl border border-charcoal bg-abyss-2 p-4">
            <p className="font-mono text-xs text-bio-teal">{c.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-mist">{c.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
