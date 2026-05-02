"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";

const skillCategories = [
  {
    title: "Microcontrollers",
    skills: [
      { name: "ESP32", percent: 85 },
      { name: "Arduino Uno", percent: 80 },
      { name: "Arduino Nano", percent: 78 },
    ],
  },
  {
    title: "PCB Design",
    skills: [
      { name: "KiCad", percent: 90 },
      { name: "Schematic Cap", percent: 85 },
      { name: "Gerber Output", percent: 82 },
      { name: "DFM Review", percent: 75 },
    ],
  },
  {
    title: "Protocols & Wireless",
    skills: [
      { name: "LoRa 868MHz", percent: 88 },
      { name: "I2C / UART", percent: 85 },
      { name: "GPS Interface", percent: 72 },
      { name: "IoT Pipeline", percent: 78 },
    ],
  },
  {
    title: "Simulation & Tools",
    skills: [
      { name: "LTspice (SPICE)", percent: 65 },
      { name: "QGIS", percent: 60 },
      { name: "AutoCAD", percent: 65 },
      { name: "SolidWorks", percent: 58 },
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "C", percent: 80 },
      { name: "C++", percent: 78 },
      { name: "Python", percent: 55 },
    ],
  },
];

const ProgressBar = ({ percent }: { percent: number }) => {
  return (
    <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden mt-2">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        className="h-full bg-black/80 rounded-full"
      />
    </div>
  );
};

export default function Skills() {
  return (
    <section className="relative pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="mb-10 sm:mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4 text-balance">
          Technical Stack.
        </h2>
        <p className="text-lg sm:text-xl text-text-muted max-w-2xl text-pretty">
          The tools and technologies I use to build robust hardware systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: idx * 0.1 }}
          >
            <GlassCard className="p-6 sm:p-8 h-full bg-white/40">
              <h3 className="text-xl font-semibold tracking-tight text-text-primary mb-6">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm font-medium text-text-primary mb-1">
                      <span>{skill.name}</span>
                      <span className="text-text-muted">{skill.percent}%</span>
                    </div>
                    <ProgressBar percent={skill.percent} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
