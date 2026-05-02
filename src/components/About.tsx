"use client";

import React from "react";
import GlassCard from "./ui/GlassCard";
import StatCard from "./ui/StatCard";
import { MapPin, GraduationCap, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import TextReveal from "./ui/TextReveal";

export default function About() {
  return (
    <section className="relative py-12 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="mb-16"
      >
        <TextReveal 
          as="h2"
          text="Identity."
          className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-4"
        />
        <p className="text-xl text-text-muted max-w-2xl">
          A brief overview of who I am and where I come from.
        </p>
      </motion.div>

      <GlassCard className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 mb-16">
        {/* Left - Identity Block */}
        <div className="flex flex-col space-y-8 justify-center">
          <div>
            <TextReveal
              as="h3"
              text="Dharaneesh M."
              className="text-3xl font-semibold text-text-primary mb-4"
              delayOffset={0.5}
            />
            <p className="text-lg font-body text-text-muted leading-relaxed mb-8">
              Hardware Engineer in the making. <br />
              Already competing at the national level. Building robust solutions that bridge the physical and digital.
            </p>
          </div>

          <div className="space-y-6 font-medium text-text-primary">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4">
                <MapPin className="w-5 h-5 text-black/60" />
              </div>
              Chennai, India
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4">
                <GraduationCap className="w-5 h-5 text-black/60" />
              </div>
              MIT Anna University — ECE (CGPA: 8.3)
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4">
                <Cpu className="w-5 h-5 text-black/60" />
              </div>
              LoRa · ESP32 · KiCad · IoT
            </div>
          </div>
        </div>

        {/* Right - Photo + Stat Cards */}
        <div className="grid grid-cols-2 gap-6">
          <GlassCard className="col-span-2 h-56 overflow-hidden relative">
            <Image
              src="/api/photos/shoreline"
              alt="Dharaneesh at shoreline"
              fill
              className="object-cover contrast-120"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </GlassCard>
          <StatCard value="20K+" label="Hackathon Competitors" className="aspect-square" />
          <StatCard value="2Km" label="LoRa Campus Coverage" className="aspect-square" />
          <StatCard value="8.3" label="CGPA MIT Anna Univ" className="aspect-square" />
          <StatCard value="3×" label="National Finalist" className="aspect-square" />
        </div>
      </GlassCard>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <GlassCard className="relative overflow-hidden p-8 md:p-12">
          <motion.div
            animate={{ x: ["-10%", "10%", "-10%"], y: ["-5%", "5%", "-5%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-10 h-56 w-56 rounded-full bg-pink-200/40 blur-3xl pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          />
          <motion.div
            animate={{ x: ["10%", "-10%", "10%"], y: ["5%", "-5%", "5%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-24 -right-6 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-72 rounded-3xl overflow-hidden">
              <Image src="/api/photos/shoreline" alt="Journey visual" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-text-muted mb-3">Creative Focus</p>
              <TextReveal
                as="h3"
                text="Building human-centered hardware experiences."
                className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4"
                delayOffset={0.2}
              />
              <p className="text-text-muted leading-relaxed">
                I blend embedded systems, communication networks, and product thinking into real-world solutions.
                This section now highlights the journey with a cleaner cinematic glass effect.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
