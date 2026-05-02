"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GlassCard from "./ui/GlassCard";
import Tag from "./ui/Tag";
import ProjectModal from "./ProjectModal";

const staticProjectsData = [
  {
    id: "dso",
    title: "ESP32 Digital Oscilloscope",
    status: "PROTOTYPE COMPLETE",
    hardware: "ESP32 · SSD1306 OLED · ADC",
    domain: "Bench Instrumentation",
    impact: "Pocket-sized DSO. Zero bench dependency.",
    tags: ["ESP32", "I2C", "Firmware", "OLED"],
    description: "Designed a portable Digital Storage Oscilloscope (DSO) to remove the dependency on expensive lab bench equipment. Built entirely around the ESP32 micro-controller and an SSD1306 OLED screen.",
    details: [
      "Interfaced high-speed ADC for waveform sampling",
      "Optimized I2C communication for real-time display updates",
      "Implemented hardware interrupts for trigger stabilization",
      "Designed an ultra-low footprint firmware structure in C++"
    ]
  },
  {
    id: "lora-mesh",
    title: "LoRa Emergency Mesh Network",
    status: "SIH COLLEGE SELECTED",
    hardware: "Arduino + LoRa + GPS",
    coverage: "~2000m · Zero cellular dependency",
    domain: "Emergency Comms",
    impact: "Self-healing network. Deployable in minutes.",
    tags: ["LoRa 868MHz", "Mesh", "GPS", "SIH"],
    description: "A decentralized, self-healing mesh network built to provide critical communication channels during disasters when cellular infrastructure fails. Currently selected for the Smart India Hackathon at the college level.",
    details: [
      "Custom mesh topology utilizing LoRa 868MHz transceivers",
      "Integrated GPS modules for node tracking without internet",
      "Designed a self-healing algorithm to bypass dead nodes",
      "Tested for ~2000m coverage per hop in semi-urban environments"
    ]
  },
  {
    id: "uzhav",
    title: "UZHAV Flood Early Warning System",
    status: "RUNNER-UP · BEST PAPER ×2",
    hardware: "QGIS · LoRa · Native Language Alerts",
    domain: "Disaster-Tech · Rural India",
    impact: "Flood warning in your language. No smartphone needed.",
    tags: ["QGIS", "LoRa", "Satellite", "Rural-Tech"],
    description: "An early warning system specifically tailored for rural Indian environments. Utilizing satellite data and long-range communication to send localized, native-language flood alerts directly to custom hardware receivers.",
    details: [
      "Processed GIS satellite data using QGIS for flood zone mapping",
      "Developed a custom alert payload over LoRa to bypass ISPs",
      "Integrated text-to-speech module for native language alerts",
      "Awarded Best Paper twice and runner-up at Tenkasi Hackathon"
    ]
  },
  {
    id: "curevox",
    title: "CureVox Medical Alert System",
    status: "TOP 3,000 / 20,000+ NATIONALLY",
    hardware: "ESP32 · GSM · GPS · Vitals Sensors",
    domain: "Smart Healthcare IoT",
    impact: "Live vitals + location. Before the patient arrives.",
    tags: ["ESP32", "GSM", "IoT", "Healthcare"],
    description: "A wearable and vehicular medical alert pipeline that transmits live patient vitals and GPS coordinates to hospitals while the ambulance is still in transit. Ranked in the top 15% nationally.",
    details: [
      "Interfaced real-time vitals sensors (SpO2, Heart Rate) via I2C",
      "Implemented a reliable GSM/GPRS data pipeline for live telemetry",
      "Built a redundant fallback mechanism via SMS for poor signal areas",
      "Optimized power consumption for extended battery life during transit"
    ]
  }
];

export interface ProjectData {
  id: string;
  title: string;
  status: string;
  hardware: string | null;
  domain: string;
  impact: string;
  tags: string[];
  description: string;
  details: string[];
  coverage?: string;
}

interface ProjectProps {
  initialData?: ProjectData[];
}

export default function Projects({ initialData }: ProjectProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projectsToRender = initialData && initialData.length > 0 ? initialData : staticProjectsData;

  return (
    <section className="relative py-12 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-4">
          Projects.
        </h2>
        <p className="text-xl text-text-muted max-w-2xl">
          Deployed systems and prototypes engineered from the ground up.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsToRender.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: idx * 0.1 }}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer group"
          >
            <GlassCard className="p-10 h-full flex flex-col justify-between hover:bg-white/70">
              <div>
                <div className="text-xs font-semibold tracking-wider mb-4 text-[#0066CC] uppercase">
                  {project.status}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-2">
                  {project.title}
                </h3>
                <div className="text-sm font-medium text-text-muted mb-8">
                  {project.hardware}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </div>
                <div className="bg-black/5 rounded-xl p-4">
                  <p className="font-medium text-sm text-text-primary">
                    {project.impact}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
