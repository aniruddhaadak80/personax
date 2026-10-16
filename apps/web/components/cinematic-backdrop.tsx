"use client";

import { useEffect, useRef } from "react";

/**
 * Animated, ultra-realistic canvas backdrop: starfield + parallax dust
 * + drifting bio-teal plasma wisps. Zero assets, zero keys, paints at 60fps
 * and self-pauses under prefers-reduced-motion.
 */
export function CinematicBackdrop({ density = 140 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const stars = Array.from({ length: density }, (_, i) => ({
      x: ((i * 97.3) % 1) * (window.innerWidth || 1),
      y: ((i * 53.7) % 1) * (window.innerHeight || 1),
      z: 0.3 + ((i * 17.1) % 1) * 0.7,
      tw: ((i * 11.3) % 1) * Math.PI * 2,
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const wisps = [
      { x: 0.2, y: 0.3, r: 220, hue: "44,212,191", vx: 0.00015, vy: 0.0001 },
      { x: 0.75, y: 0.65, r: 260, hue: "139,92,246", vx: -0.00012, vy: 0.00014 },
      { x: 0.5, y: 0.5, r: 300, hue: "245,158,11", vx: 0.00008, vy: -0.0001 },
    ];

    let t = 0;
    let raf = 0;
    const step = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      // gradient veil
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(7,11,18,0.92)");
      g.addColorStop(1, "rgba(16,24,38,0.9)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // wisps
      for (const z of wisps) {
        z.x += z.vx;
        z.y += z.vy;
        if (z.x < -0.1 || z.x > 1.1) z.vx *= -1;
        if (z.y < -0.1 || z.y > 1.1) z.vy *= -1;
        const grd = ctx.createRadialGradient(z.x * w, z.y * h, 0, z.x * w, z.y * h, z.r);
        grd.addColorStop(0, `rgba(${z.hue},0.22)`);
        grd.addColorStop(1, `rgba(${z.hue},0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      // stars
      ctx.fillStyle = "#e8f1f2";
      for (const s of stars) {
        const tw = Math.sin(t * 1.7 + s.tw) * 0.5 + 0.5;
        ctx.globalAlpha = 0.25 + tw * 0.75 * s.z;
        ctx.beginPath();
        ctx.arc((s.x + t * 12 * s.z) % w, (s.y + t * 4 * s.z) % h, s.z * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // grain
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }

      raf = requestAnimationFrame(step);
    };

    if (reduced) {
      // single frame
      step();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
