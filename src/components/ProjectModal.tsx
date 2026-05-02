"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import GlassCard from "./ui/GlassCard";
import Tag from "./ui/Tag";

interface Project {
  id: string;
  title: string;
  status: string;
  hardware?: string;
  domain: string;
  impact: string;
  tags: string[];
  description: string;
  details: string[];
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-[#FBFBFD]/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar rounded-3xl"
        >
          <GlassCard className="relative p-8 md:p-12 bg-white/90 shadow-2xl hoverable:none">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 text-text-muted hover:bg-black/10 hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-8">
              <div className="space-y-2 pr-12">
                <span className="text-sm font-semibold tracking-wider text-[#0066CC] uppercase">
                  {project.status}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                  {project.title}
                </h2>
                <div className="text-lg font-medium text-text-muted mt-2">
                  {project.domain}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </div>

              <div className="h-[1px] w-full bg-black/5 my-8"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold tracking-tight text-text-primary">Project Overview</h3>
                  <p className="text-text-muted leading-relaxed">
                    {project.description}
                  </p>
                  <div className="bg-[#0066CC]/5 border border-[#0066CC]/10 p-5 rounded-2xl mt-6">
                    <strong className="text-[#0066CC] block mb-2 text-sm font-bold uppercase tracking-wider">Impact</strong>
                    <span className="font-medium text-text-primary">{project.impact}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold tracking-tight text-text-primary">Engineering Depth</h3>
                  <ul className="space-y-4 text-text-muted list-none">
                    {project.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#0066CC] mr-3 mt-1">•</span>
                        <span className="text-sm md:text-base leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
