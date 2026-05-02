"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-black/5 bg-white/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-text-muted text-sm font-medium">
          © {new Date().getFullYear()} Dharaneesh M. All rights reserved.
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/admin"
            className="text-[10px] uppercase tracking-widest text-text-muted/30 hover:text-text-primary transition-colors font-bold"
          >
            Admin Access
          </Link>
          <div className="text-text-muted text-sm font-medium">
            Designed by DHARANEESH
          </div>
        </div>
      </div>
    </footer>
  );
}
