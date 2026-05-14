"use client";

import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { AboutSection } from "@/sections/About";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { ContactSection } from "@/sections/Contact";
import { GradientMesh } from "@/components/effects/GradientMesh";
import { Grain } from "@/components/effects/Grain";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { MagneticCursor } from "@/components/effects/MagneticCursor";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  const rootRef = useReveal<HTMLDivElement>();

  return (
    <div ref={rootRef}>
      <GradientMesh />
      <Grain />
      <ScrollProgress />
      <MagneticCursor enabled />
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <TapeSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <div className="corner-label">CHASE · CURTIS / KNX · 2026</div>
      <div className="corner-label-right">SCROLL ↓</div>
    </div>
  );
}
