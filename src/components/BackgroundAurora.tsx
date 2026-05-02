"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BackgroundAurora() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "-5%", "5%", "0%"],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-12%] left-[-8%] w-[46vw] h-[46vw] rounded-full bg-[var(--aurora-1,#f7aed2)] opacity-40 blur-[95px]"
      />
      <motion.div
        animate={{
          x: ["0%", "-5%", "5%", "0%"],
          y: ["0%", "5%", "-5%", "0%"],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-12%] right-[-12%] w-[54vw] h-[54vw] rounded-full bg-[var(--aurora-2,#fff0a8)] opacity-38 blur-[110px]"
      />
      <motion.div
        animate={{
          x: ["-5%", "5%", "0%", "-5%"],
          y: ["5%", "0%", "-5%", "5%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] left-[30%] w-[42vw] h-[42vw] rounded-full bg-[var(--aurora-3,#c6b5ff)] opacity-42 blur-[98px]"
      />
    </div>
  );
}
