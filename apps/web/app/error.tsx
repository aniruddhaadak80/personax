"use client";

import Link from "next/link";
import { CinematicBackdrop } from "@/components/cinematic-backdrop";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center px-6 py-24">
      <CinematicBackdrop density={80} />
      <div className="relative z-10 mx-auto max-w-lg text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-helix-amber">
          coordinate lost
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">The frame tripped.</h1>
        <p className="mt-4 text-sm leading-relaxed text-mist">
          A deterministic system hit an unexpected state{error.digest ? ` (${error.digest})` : ""}.
          The seed is safe; nothing left the machine.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-bio-teal px-5 py-2.5 font-display text-sm font-semibold text-abyss"
          >
            Retry the run
          </button>
          <Link
            href="/"
            className="rounded-lg border border-charcoal px-5 py-2.5 text-sm text-mist"
          >
            Return to origin
          </Link>
        </div>
      </div>
    </div>
  );
}
