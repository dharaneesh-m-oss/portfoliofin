"use client";

import React from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GlassButton({ children, className = "", ...props }: GlassButtonProps) {
  return (
    <button 
      className={`glass-button px-8 py-4 font-semibold hoverable flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
