import { CinematicBackdrop } from "@/components/cinematic-backdrop";

export default function Loading() {
  return (
    <div className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-4 px-6 py-24">
      <CinematicBackdrop density={60} />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="h-1 w-40 overflow-hidden rounded-full bg-charcoal">
          <div className="h-full w-1/2 animate-[shimmer_1.4s_ease-in-out_infinite] rounded-full bg-bio-teal" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
          coordinating the frame…
        </p>
      </div>
    </div>
  );
}
