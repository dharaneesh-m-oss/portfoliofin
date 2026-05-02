"use client";

import React from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delayOffset?: number;
}

export default function TextReveal({ 
  text, 
  className = "", 
  as: Component = "h1",
  delayOffset = 0
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Component className={`${Component === "h1" ? "text-reveal-h1" : ""} ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="text-reveal-span"
          style={{ 
            "--delay": `${(i * 0.1) + delayOffset}s` 
          } as React.CSSProperties}
        >
          {word}&nbsp;
        </span>
      ))}
    </Component>
  );
}
