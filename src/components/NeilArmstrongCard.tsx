"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark } from "lucide-react";
import Image from "next/image";

type Effect = "zoom" | "blur" | "color";

export default function NeilArmstrongCard() {
  const [effect, setEffect] = useState<Effect>("zoom");

  const effects = [
    { id: "zoom", label: "Zoom out" },
    { id: "blur", label: "Blur" },
    { id: "color", label: "Colors" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <nav className="mb-12">
        <ul className="flex gap-4 p-2 bg-white/30 backdrop-blur-md rounded-2xl border border-white/50">
          {effects.map((eff) => (
            <li
              key={eff.id}
              onClick={() => setEffect(eff.id as Effect)}
              className={`px-6 py-2 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm ${
                effect === eff.id
                  ? "bg-black text-white shadow-lg"
                  : "text-text-primary hover:bg-black/5"
              }`}
            >
              {eff.label}
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        layout
        className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-white shadow-2xl transition-all duration-700 ease-in-out"
        style={{
          filter: effect === "blur" ? "blur(8px)" : effect === "color" ? "grayscale(100%)" : "none",
          transform: effect === "zoom" ? "scale(0.9)" : "scale(1)",
        }}
      >
        <button className="absolute top-6 right-6 z-20 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors">
          <Bookmark className="w-5 h-5 text-black" />
        </button>

        <figure className="relative h-64 w-full overflow-hidden">
          <Image
            src="https://c1.staticflickr.com/4/3935/32253842574_d3d449ab86_c.jpg"
            alt="Moon Landscape"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
        </figure>

        <div className="relative pt-12 pb-8 px-8 text-center">
          <figure className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl bg-white">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Neil_Armstrong.jpg"
              alt="Neil Armstrong"
              fill
              className="object-cover"
            />
          </figure>

          <h3 className="text-2xl font-bold text-text-primary mb-1">Neil Armstrong</h3>
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
            astronaut & engineer
          </p>
          <p className="text-text-muted leading-relaxed">
            American astronaut, engineer, and the first person to walk on the Moon.
          </p>
        </div>

        <div className="px-8 py-6 border-t border-black/5 flex justify-between items-center bg-black/5">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">
            Feb 10 2018
          </p>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-black/10" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
