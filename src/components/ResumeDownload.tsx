"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import GlassButton from "./ui/GlassButton";
import { Download, Mail, Phone } from "lucide-react";

export default function ResumeDownload() {
  return (
    <section className="relative py-12 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
          Credentials.
        </h2>
        <p className="text-xl text-text-muted max-w-2xl">
          Download my full resume and connect via direct channels.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <GlassCard className="p-8 md:p-12 bg-white/70">
          <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="space-y-4">
              <div className="text-text-primary text-2xl font-bold tracking-tight">
                Dharaneesh M.
              </div>
              <div className="text-text-muted font-medium">
                Hardware Engineer · Rev 9
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="mailto:example@example.com" className="flex items-center text-text-muted hover:text-[#0066CC] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Email Transmit</span>
                </a>
                <a href="tel:+917708222195" className="flex items-center text-text-muted hover:text-[#0066CC] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-medium">+91 7708222195</span>
                </a>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <a href="/Dharaneesh_Hardware_Resume_9.pdf" download className="block">
                <GlassButton className="w-full !px-12">
                  Download PDF
                  <Download className="ml-2 w-5 h-5" />
                </GlassButton>
              </a>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
