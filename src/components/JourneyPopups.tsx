"use client";

import { motion } from "framer-motion";

const POPUPS = [
  { text: "PCB Design", x: "2%", y: "-15%", delay: 0.8, color: "bg-blue-50/60 text-blue-600 border-blue-100" },
  { text: "Mesh Networks", x: "82%", y: "-10%", delay: 1.2, color: "bg-purple-50/60 text-purple-600 border-purple-100" },
  { text: "Firmware", x: "-5%", y: "45%", delay: 1.5, color: "bg-emerald-50/60 text-emerald-600 border-emerald-100" },
  { text: "IoT Architecture", x: "85%", y: "55%", delay: 1.8, color: "bg-orange-50/60 text-orange-600 border-orange-100" },
  { text: "Prototyping", x: "12%", y: "-45%", delay: 2.1, color: "bg-pink-50/60 text-pink-600 border-pink-100" },
  { text: "Signal Integrity", x: "68%", y: "-40%", delay: 2.4, color: "bg-indigo-50/60 text-indigo-600 border-indigo-100" },
  { text: "Embedded C", x: "90%", y: "15%", delay: 2.7, color: "bg-cyan-50/60 text-cyan-600 border-cyan-100" },
  { text: "Circuit Analysis", x: "-8%", y: "10%", delay: 3.0, color: "bg-rose-50/60 text-rose-600 border-rose-100" },
];

const DECORATIVE_DOTS = [
  { x: "15%", y: "10%", size: "w-2 h-2", color: "bg-blue-400/30", delay: 1 },
  { x: "85%", y: "30%", size: "w-1.5 h-1.5", color: "bg-purple-400/30", delay: 1.5 },
  { x: "40%", y: "-20%", size: "w-3 h-3", color: "bg-emerald-400/20", delay: 2 },
  { x: "60%", y: "80%", size: "w-2 h-2", color: "bg-orange-400/30", delay: 2.5 },
];

export default function JourneyPopups() {
  return (
    <div className="absolute -inset-10 pointer-events-none z-30 overflow-visible hidden sm:block">
      {POPUPS.map((item, index) => (
        <motion.div
          key={`popup-${index}`}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: item.delay },
            scale: { duration: 1, delay: item.delay, ease: [0.25, 1, 0.5, 1] },
            y: {
              duration: 5 + index % 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }
          }}
          className={`absolute px-4 py-1.5 rounded-full border backdrop-blur-sm text-[10px] uppercase tracking-wider font-bold shadow-sm ${item.color}`}
          style={{ left: item.x, top: item.y }}
        >
          {item.text}
        </motion.div>
      ))}

      {DECORATIVE_DOTS.map((dot, index) => (
        <motion.div
          key={`dot-${index}`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: dot.delay,
          }}
          className={`absolute rounded-full blur-[1px] ${dot.size} ${dot.color}`}
          style={{ left: dot.x, top: dot.y }}
        />
      ))}
    </div>
  );
}
