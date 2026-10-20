"use client";

import { useEffect, useRef } from "react";

/**
 * Upgraded ultra-realistic backdrop: parallax starfield, drifting bioluminescent
 * plasma wisps, shooting stars, subtle grid, cursor-reactive parallax offset.
 * Fully deterministic seed, zero assets, zero keys, 60fps with graceful fallback.
 */
export function CinematicBackdrop({ density = 160 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let mx = 0.5;
    let my = 0.5;
    let px = 0;
    let py = 0;

    const stars = Array.from({ length: density }, (_, i) => ({
      x: (i * 97.313) % 1,
      y: (i * 53.717) % 1,
      z: 0.3 + ((i * 17.101) % 1) * 0.8,
      tw: ((i * 11.337) % 1) * Math.PI * 2,
      col: i % 7 === 0 ? "245,158,11" : i % 11 === 0 ? "139,92,246" : "232,241,242",
    }));

    const wisps = [
      { x: 0.18, y: 0.3, r: 260, hue: "45,212,191", vx: 0.00016, vy: 0.0001, phase: 0 },
      { x: 0.78, y: 0.68, r: 320, hue: "139,92,246", vx: -0.00012, vy: 0.00014, phase: 1.4 },
      { x: 0.52, y: 0.5, r: 360, hue: "245,158,11", vx: 0.00009, vy: -0.0001, phase: 2.7 },
      { x: 0.33, y: 0.78, r: 220, hue: "232,241,242", vx: -0.00011, vy: -0.00008, phase: 4.1 },
    ];

    const shooters = Array.from({ length: 3 }, (_, i) => ({
      start: (i + 1) * 0.33,
      life: 0,
      maxLife: 0.9,
      x: 0,
      y: 0,
      angle: 0,
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

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    let raf = 0;
    const step = () => {
      t += 0.016;
      px += (mx - 0.5) * 0.02 - px * 0.05;
      py += (my - 0.5) * 0.02 - py * 0.05;
      ctx.clearRect(0, 0, w, h);

      // deep veil gradient
      const vg = ctx.createRadialGradient(
        w / 2 + px * 40,
        h / 2 + py * 40,
        0,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.7,
      );
      vg.addColorStop(0, "#0d1424");
      vg.addColorStop(1, "#070b12");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      // subtle grid
      ctx.strokeStyle = "rgba(45,212,191,0.035)";
      ctx.lineWidth = 1;
      const grid = 64;
      const gx = ((t * 6) % grid) - grid;
      const gy = ((t * 3) % grid) - grid;
      for (let x = gx; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = gy; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // wisps
      for (const z of wisps) {
        z.x += z.vx;
        z.y += z.vy;
        if (z.x < -0.15 || z.x > 1.15) z.vx *= -1;
        if (z.y < -0.15 || z.y > 1.15) z.vy *= -1;
        const pulse = Math.sin(t * 0.7 + z.phase) * 0.25 + 0.75;
        const ww = (mx * 2 - 1) * 20;
        const wh = (my * 2 - 1) * 20;
        const grd = ctx.createRadialGradient(
          z.x * w + ww,
          z.y * h + wh,
          0,
          z.x * w + ww,
          z.y * h + wh,
          z.r * pulse,
        );
        grd.addColorStop(0, `rgba(${z.hue},0.22)`);
        grd.addColorStop(0.5, `rgba(${z.hue},0.08)`);
        grd.addColorStop(1, `rgba(${z.hue},0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      // stars
      for (const s of stars) {
        const sx = (s.x + px * 0.6) * w;
        const sy = (s.y + py * 0.6) * h;
        const tw = Math.sin(t * 1.4 + s.tw) * 0.5 + 0.5;
        ctx.globalAlpha = 0.2 + tw * 0.8 * s.z;
        ctx.fillStyle = `rgb(${s.col})`;
        const size = s.z * 1.6;
        ctx.fillRect(sx, sy, size, size);
        if (s.z > 0.85) {
          ctx.strokeStyle = `rgba(${s.col},${0.15 + tw * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(sx - 4, sy);
          ctx.lineTo(sx + 4, sy);
          ctx.moveTo(sx, sy - 4);
          ctx.lineTo(sx, sy + 4);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // shooting stars (cyclic)
      const cycle = (t % 6) / 6;
      for (const sh of shooters) {
        const phase = (cycle + sh.start) % 1;
        if (phase < sh.maxLife) {
          const progress = phase / sh.maxLife;
          const len = 120;
          const x1 = (0.2 + sh.start * 0.5) * w + progress * (0.4 * w);
          const y1 = (0.15 + sh.start * 0.2) * h + progress * (0.35 * h);
          const tail = ctx.createLinearGradient(
            x1 - len * progress,
            y1 - len * progress * 0.5,
            x1,
            y1,
          );
          tail.addColorStop(0, "rgba(255,255,255,0)");
          tail.addColorStop(1, "rgba(232,241,242,0.9)");
          ctx.strokeStyle = tail;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1 - len, y1 - len * 0.5);
          ctx.lineTo(x1, y1);
          ctx.stroke();
          ctx.fillStyle = "rgba(232,241,242,0.95)";
          ctx.beginPath();
          ctx.arc(x1, y1, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // vignette
      const vig = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      if (!reduced) raf = requestAnimationFrame(step);
    };

    step();
    if (!reduced) raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
