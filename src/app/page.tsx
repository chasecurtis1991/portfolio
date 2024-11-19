"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/sections/Header";
import { HeroSection as Hero } from "@/sections/Hero";
import { AboutSection as About } from "@/sections/About";
import { ProjectsSection as Projects } from "@/sections/Projects";
import { ContactSection as Contact } from "@/sections/Contact";
import { Blog } from "@/sections/Blog";
import { Footer } from "@/sections/Footer";
import { TestimonialsSection } from "@/sections/Testimonials";
import { TapeSection } from "@/sections/Tape";

export default function Home() {
  const [isBlogVisible, setIsBlogVisible] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Header onBlogVisibilityChange={setIsBlogVisible} />
      
      <motion.main
        className="relative"
        animate={{
          x: isBlogVisible ? "-100%" : 0,
          opacity: isBlogVisible ? 0 : 1
        }}
        transition={{
          type: "tween",
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        <Hero />
        <Projects />
        <TapeSection />
        <TestimonialsSection />
        <About />
        <Contact />
      </motion.main>

      <AnimatePresence>
        {isBlogVisible && (
          <motion.div
            className="fixed top-0 right-0 w-full h-screen overflow-y-auto bg-gray-900"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <div className="min-h-screen flex flex-col">
              <div className="pt-20 flex-grow">
                <Blog />
              </div>
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isBlogVisible && <Footer />}
    </div>
  );
}
