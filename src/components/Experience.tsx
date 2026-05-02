"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";

interface ExperienceItem {
  id?: string;
  title: string;
  org: string;
  date: string;
  desc: string;
}

interface ExperienceProps {
  initialData?: ExperienceItem[];
}

const staticExperience: ExperienceItem = {
  title: "Hardware Engineering Intern",
  org: "National Institute of Ocean Technology (NIOT)",
  date: "May 2026 - Present",
  desc: "Division: Image Processing & Embedded Instrumentation\nScope: Signal interfacing & Sensor acquisition pipelines\nStandard: Defence-grade discipline & Fault-tolerance protocols"
};

export default function Experience({ initialData }: ExperienceProps) {
  const experiences = [staticExperience, ...(initialData || [])];

  return (
    <section className="relative py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
          Experience.
        </h2>
      </motion.div>

      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: idx * 0.1 }}
          >
            <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-white/70">
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between mb-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
                      {exp.title}
                    </h3>
                    {exp.date.toLowerCase().includes("present") && (
                      <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-black/5 border border-black/10">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                        <span className="text-text-primary font-semibold text-xs uppercase tracking-wider">Active</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium text-xl text-text-primary">
                      {exp.org}
                    </p>
                    <p className="text-text-muted">
                      {exp.date}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end space-y-2 font-medium text-text-muted">
                  <div className="text-text-primary">Chennai, India</div>
                </div>
              </div>

              <div className="h-[1px] w-full bg-black/5 my-8 relative z-10" />

              <div className="relative z-10">
                <p className="text-text-muted leading-relaxed whitespace-pre-line">
                  {exp.desc}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
