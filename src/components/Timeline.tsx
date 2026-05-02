"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";

const staticTimelineData = [
  {
    date: "2024",
    title: "Enrolled",
    org: "MIT Anna University",
    desc: "ECE Department",
  },
  {
    date: "May 2025",
    title: "LoRa SIH",
    org: "Selected",
    desc: "College Level",
  },
  {
    date: "Dec 2025",
    title: "CureVox",
    org: "Top 3K/20K+",
    desc: "Mumbai Hackathon",
  },
  {
    date: "Jan 2026",
    title: "UZHAV",
    org: "Best Paper ×2",
    desc: "Tenkasi Hackathon Runner-up",
  },
  {
    date: "May 2026 →",
    title: "NIOT Intern",
    org: "Govt. of India",
    desc: "Ocean Tech R&D",
  },
];

interface TimelineProps {
  initialData?: Array<{
    date: string;
    title: string;
    org: string;
    desc: string;
  }>;
}

export default function Timeline({ initialData }: TimelineProps) {
  // Merge dynamic data from DB with the original static highlights
  const timelineToRender = [...staticTimelineData, ...(initialData || [])];

  return (
    <section className="relative py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-3">
          Mission Log.
        </h2>
        <p className="text-text-muted text-lg">
          Key milestones from learning to deployment.
        </p>
      </motion.div>

      <div className="relative pl-8 md:pl-10">
        <div className="absolute left-2 md:left-3 top-0 bottom-0 w-px bg-black/10" />
        <div className="space-y-6">
          {timelineToRender.map((item, index) => (
            <motion.div
              key={`${item.date}-${item.title}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: index * 0.06 }}
              className="relative"
            >
              <div className="absolute -left-[1.95rem] md:-left-[2.15rem] top-6 w-3.5 h-3.5 rounded-full bg-[#0066CC] border-2 border-white shadow" />
              <GlassCard className="p-6 md:p-7">
                <h3 className="text-xl font-bold tracking-tight text-text-primary mb-1">{item.title}</h3>
                <div className="text-text-muted font-medium text-sm mb-2">{item.org}</div>
                <div className="text-text-muted text-sm leading-relaxed">{item.desc}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
