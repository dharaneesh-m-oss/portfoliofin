"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import { Award, FileText, Zap, ShieldAlert } from "lucide-react";

const achievements = [
  {
    icon: <Award className="w-6 h-6 text-[#1D1D1F]" />,
    title: "1st Place · Digital Electronics MCQ",
    event: "Binary Blitz",
    context: "Ascentron Symposium, MIT ECE",
  },
  {
    icon: <FileText className="w-6 h-6 text-[#1D1D1F]" />,
    title: "Best Business Paper",
    event: "MIT Anna University",
    context: "UZHAV Flood Early Warning System",
  },
  {
    icon: <FileText className="w-6 h-6 text-[#1D1D1F]" />,
    title: "Best Tech Paper",
    event: "eFocus Symposium, MIT ECE",
    context: "LoRa Wireless Architecture",
  },
  {
    icon: <Award className="w-6 h-6 text-[#1D1D1F]" />,
    title: "Runner-up",
    event: "Tenkasi Hackathon",
    context: "Industry + Govt. Panel Judges",
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-[#1D1D1F]" />,
    title: "Top 3,000 / 20,000+",
    event: "Mumbai Hackathon",
    context: "National Top 15% · CureVox",
  },
  {
    icon: <Zap className="w-6 h-6 text-[#1D1D1F]" />,
    title: "College Level Selected",
    event: "Smart India Hackathon",
    context: "LoRa Emergency Network",
  },
  {
    icon: <Award className="w-6 h-6 text-[#1D1D1F]" />,
    title: "Ocean Technology R&D",
    event: "NIOT Internship",
    context: "Govt. of India · Ministry of Earth Sciences",
  },
];

export default function Achievements() {
  return (
    <section className="relative py-24 px-6 max-w-5xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
          Recognition.
        </h2>
      </motion.div>

      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory hide-scrollbar gap-6">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: idx * 0.1 }}
            className="snap-center shrink-0 w-[280px] md:w-[320px]"
          >
            <GlassCard className="h-full p-8 relative overflow-hidden bg-white/70">
              <div className="mb-6 bg-black/5 w-12 h-12 rounded-2xl flex items-center justify-center">
                {achievement.icon}
              </div>
              
              <h3 className="text-xl font-bold tracking-tight text-text-primary mb-2">
                {achievement.event}
              </h3>
              <div className="text-[#0066CC] font-semibold text-sm mb-3">
                {achievement.title}
              </div>
              <p className="font-medium text-text-muted text-sm leading-relaxed">
                {achievement.context}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
