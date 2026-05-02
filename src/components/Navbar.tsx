"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/work", label: "Work" },
  { path: "/team", label: "Team" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 sm:py-4" : "py-5 sm:py-6"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between transition-all duration-500 rounded-full relative ${
            scrolled
              ? "glass-panel px-4 sm:px-6 py-2 sm:py-3"
              : "bg-transparent border-transparent px-2 py-2"
          }`}
        >
          <Link href="/" className="font-bold text-xl tracking-tighter hover:opacity-70 transition-opacity">
            DM.
          </Link>

          {/* Desktop & Compact Mobile Links */}
          <ul className="hidden sm:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path} className="relative">
                  <Link
                    href={item.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "text-text-primary"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-black/5 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button - Same UI aesthetic */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 hover:bg-black/5 rounded-full transition-colors relative z-50"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center space-y-1.5">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-text-primary block rounded-full" 
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-text-primary block rounded-full" 
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-text-primary block rounded-full" 
              />
            </div>
          </button>

          {/* Mobile Dropdown - Preserves "Same UI" look */}
          <motion.div
            initial={false}
            animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.95 }}
            className={`absolute top-full left-0 right-0 mt-4 sm:hidden glass-panel p-4 overflow-hidden z-[100] pointer-events-none ${isOpen ? "pointer-events-auto" : ""}`}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="flex flex-col space-y-2 relative z-[101]">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-black/5 text-text-primary"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </nav>
      </div>
    </motion.header>


  );
}
