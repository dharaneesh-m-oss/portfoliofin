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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <nav
          className={`flex items-center justify-between transition-all duration-500 rounded-full ${
            scrolled
              ? "glass-panel px-6 py-3"
              : "bg-transparent border-transparent px-2 py-2"
          }`}
        >
          <Link href="/" className="font-semibold text-lg tracking-tight">
            DM.
          </Link>

          <ul className="flex items-center space-x-1 sm:space-x-2">
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
        </nav>
      </div>
    </motion.header>
  );
}
