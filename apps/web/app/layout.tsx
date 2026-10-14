import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { AppShell } from "@/components/app-shell";
import { QueryProvider } from "@/components/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Personax — the world-frame where superintelligence solves aging",
    template: "%s | Personax",
  },
  description:
    "An open-source observatory for the biotech century: a deterministic superintelligence Oracle, a 200-year world simulation engine, and a time machine for every simulated state. Zero API keys.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Personax — the world-frame where superintelligence solves aging",
    description:
      "Ask the Oracle to solve aging. Apply the intervention. Watch 200 years of the world unfold — then replay any state.",
    type: "website",
    images: [{ url: "/images/og.svg", width: 1200, height: 630, alt: "Personax" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personax — the world-frame where superintelligence solves aging",
    description: "Deterministic superintelligence simulation. Zero API keys.",
    images: ["/images/og.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070b12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-screen bg-abyss text-star-white antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <QueryProvider>
            <AppShell>{children}</AppShell>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
