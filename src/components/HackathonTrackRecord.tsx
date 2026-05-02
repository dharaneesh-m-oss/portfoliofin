"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import { Users, Trophy, Target, Award } from "lucide-react";

export default function HackathonTrackRecord() {
  const metrics = [
    { label: "Success Rate", value: "90%", icon: <Target className="w-5 h-5" /> },
    { label: "Teams Led", value: "8+", icon: <Users className="w-5 h-5" /> },
    { label: "National Finals", value: "3x", icon: <Trophy className="w-5 h-5" /> },
    { label: "Awards Won", value: "5+", icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full mt-24 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
          Leadership Track Record.
        </h2>
      </motion.div>

      <GlassCard className="relative overflow-hidden p-8 md:p-12 bg-white/70 text-left">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/30 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 blur-3xl rounded-full -ml-20 -mb-20 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-6">
              Proven Team Lead
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-6 leading-tight">
              Leading from the front <br />
              at every national stage.
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex items-center text-text-muted mb-1">
                    <span className="mr-2 text-[#E50914]">{metric.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{metric.label}</span>
                  </div>
                  <div className="text-2xl font-black text-text-primary">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <GlassCard className="p-5 bg-white/80 border-l-4 border-l-[#E50914]">
              <div className="text-xs font-bold text-[#E50914] mb-1 uppercase tracking-wide">Mumbai National Hackathon</div>
              <div className="text-base font-bold text-text-primary">Led "CureVox" to Top 15%</div>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">Managed a 4-person team to build a real-time medical alert IoT system in 36 hours.</p>
            </GlassCard>

            <GlassCard className="p-5 bg-white/80 border-l-4 border-l-[#E50914]">
              <div className="text-xs font-bold text-[#E50914] mb-1 uppercase tracking-wide">Smart India Hackathon</div>
              <div className="text-base font-bold text-text-primary">National Finalist Selection</div>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">Orchestrated a self-healing LoRa mesh network, outperforming senior teams.</p>
            </GlassCard>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
