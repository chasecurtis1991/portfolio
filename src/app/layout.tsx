import type { Metadata } from "next";
import { Manrope, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chase Curtis — Frontend Engineer",
  description:
    "Frontend engineer building interfaces that feel as good as they look. React, TypeScript, and a healthy obsession with the details.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
