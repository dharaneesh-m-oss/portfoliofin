import React, { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "", hoverEffect = true, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={`glass-panel ${hoverEffect ? "hoverable" : ""} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
