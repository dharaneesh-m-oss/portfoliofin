"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#fbfbfd]">
      {/* Primary blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 120, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#82b4ff] opacity-20 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 150, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#ffa0c8] opacity-[0.15] blur-[110px]"
      />
      <motion.div
        animate={{
          x: [0, 60, -100, 0],
          y: [0, -100, 150, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-[#c8b4ff] opacity-[0.18] blur-[105px]"
      />
      
      {/* Secondary accent blobs */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-[#ffbe96] opacity-[0.08] blur-[90px]"
      />
    </div>
  );
}
