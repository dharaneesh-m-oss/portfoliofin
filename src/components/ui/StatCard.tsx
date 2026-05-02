"use client";

import React, { useRef, useState, useEffect } from "react";
import GlassCard from "./GlassCard";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export default function StatCard({ value, label, className = "" }: StatCardProps) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <GlassCard ref={cardRef} className={`p-6 flex flex-col items-center justify-center text-center hover:bg-white/80 transition-colors ${className}`}>
      <h3 className={`text-4xl md:text-5xl font-bold mb-3 text-text-primary tracking-tight transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {value}
      </h3>
      <p className={`text-sm text-text-muted font-medium transition-all duration-1000 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        {label}
      </p>
    </GlassCard>
  );
}
