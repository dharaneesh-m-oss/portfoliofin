"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { Link as LinkIcon } from "lucide-react";

interface TeammateProps {
  member: {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string | null;
    linkedin: string | null;
  };
  index: number;
}

export default function TeammateCard({ member, index }: TeammateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: index * 0.1 }}
    >
      <GlassCard className="h-full p-8 flex flex-col justify-between group">
        <div>
          <div className="w-24 h-24 rounded-full bg-black/5 overflow-hidden mb-6 relative border border-black/10">
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-black/20">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          
          <h3 className="text-2xl font-bold tracking-tight text-text-primary mb-1">
            {member.name}
          </h3>
          <div className="text-[#0066CC] font-semibold text-sm mb-4 tracking-wider uppercase">
            {member.role}
          </div>
          <p className="text-text-muted leading-relaxed font-medium mb-6">
            {member.bio}
          </p>
        </div>

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/5 text-text-muted hover:bg-[#0066CC] hover:text-white transition-colors"
          >
            <LinkIcon className="w-5 h-5" />
          </a>
        )}
      </GlassCard>
    </motion.div>
  );
}
