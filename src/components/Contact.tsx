"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GlassCard from "./ui/GlassCard";
import GlassButton from "./ui/GlassButton";
import { Send, MapPin, Phone, GraduationCap } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="relative py-12 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Form Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <GlassCard className="p-8 md:p-12 bg-white/70">
            <h3 className="text-2xl font-bold tracking-tight text-text-primary mb-8">Send a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 focus:border-[#0066CC] transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 focus:border-[#0066CC] transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 focus:border-[#0066CC] transition-all resize-none"
                  placeholder="How can we work together?"
                ></textarea>
              </div>

              <GlassButton type="submit" disabled={status !== "idle"} className="w-full">
                {status === "idle" && (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent"}
              </GlassButton>
            </form>
          </GlassCard>
        </motion.div>

        {/* Right - Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="flex flex-col justify-center space-y-6"
        >
          <GlassCard className="p-2 overflow-hidden">
            <div className="relative h-48 w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/portrait.png"
                alt="Portrait"
                fill
                className="object-cover contrast-110"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </GlassCard>

          <div className="flex items-center group">
            <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mr-6 group-hover:scale-105 transition-transform">
              <MapPin className="text-text-primary w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-text-muted mb-1">Location</div>
              <div className="text-lg font-medium text-text-primary">Chennai, India</div>
            </div>
          </div>

          <div className="flex items-center group">
            <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mr-6 group-hover:scale-105 transition-transform">
              <Phone className="text-text-primary w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-text-muted mb-1">Direct Line</div>
              <div className="text-lg font-medium text-text-primary">+91 7708222195</div>
            </div>
          </div>

          <div className="flex items-center group">
            <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mr-6 group-hover:scale-105 transition-transform">
              <GraduationCap className="text-text-primary w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-text-muted mb-1">Institution</div>
              <div className="text-lg font-medium text-text-primary">MIT Anna University · ECE</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
