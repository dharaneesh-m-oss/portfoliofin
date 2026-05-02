"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "./ui/GlassCard";
import GlassButton from "./ui/GlassButton";
import { ChevronRight, Download } from "lucide-react";
import ScrollingWords from "./ScrollingWords";
import JourneyPopups from "./JourneyPopups";
import TextReveal from "./ui/TextReveal";
import HackathonTrackRecord from "./HackathonTrackRecord";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Image Texture with subtle motion */}
      <motion.div
        initial={{ scale: 1.25, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 0.25 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/user-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'brightness(0.9) contrast(1.1)'
        }}
      />
      {/* Subtle overlay to ensure text remains readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-white/20 to-white/60 pointer-events-none" />

      <div className="max-w-5xl w-full flex flex-col items-center text-center z-10">


        <TextReveal
          text="Engineering at the edge."
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-text-primary mb-6 text-balance"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-text-muted max-w-2xl mb-8 sm:mb-12 leading-relaxed text-pretty"
        >
          I design robust circuits and self-healing mesh networks. Hardware first. Always.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16 sm:mb-24"
        >
          <Link 
            href="/work" 
            className="w-full sm:w-auto glass-button px-8 py-4 font-semibold hoverable flex items-center justify-center gap-2 sm:px-10"
          >
            Explore Projects
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
          <a 
            href="/Dharaneesh_Hardware_Resume_9.pdf" 
            download 
            className="w-full sm:w-auto glass-button px-8 py-4 font-semibold hoverable flex items-center justify-center gap-2 sm:px-10 !bg-white !text-black border border-black/10 shadow-sm hover:!bg-black/5"
          >
            Download Resume
            <Download className="w-4 h-4 ml-1" />
          </a>
        </motion.div>

        <HackathonTrackRecord />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.6 }}
          className="w-full max-w-4xl relative"
        >
          <GlassCard className="aspect-video sm:aspect-[21/9] w-full flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 z-10 pointer-events-none">
              <svg viewBox="0 0 800 340" className="w-full h-full text-white" preserveAspectRatio="xMidYMid slice">
                <path d="M0 170h180l40-40h220l35 35h325" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M0 215h130l55-55h160l60 60h395" stroke="currentColor" strokeWidth="0.8" fill="none" />
                <circle cx="220" cy="130" r="4" fill="currentColor" />
                <circle cx="475" cy="165" r="4" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Link
                href="/about"
                className="px-6 py-3 rounded-2xl bg-white/50 backdrop-blur-md border border-white text-sm font-medium text-black shadow-sm hover:bg-white/65 transition-colors"
              >
                Engineering Journey
              </Link>
            </div>
          </GlassCard>
        </motion.div>


      </div>
    </section>
  );
}
