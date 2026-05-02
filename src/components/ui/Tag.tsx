import React from "react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span 
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-black/5 text-[#1D1D1F] border border-black/10 ${className}`}
    >
      {children}
    </span>
  );
}
