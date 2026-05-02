"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import HackathonTrackRecord from "@/components/HackathonTrackRecord";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

let hasPlayedThisSession = false;

export default function Home() {
  const [loading, setLoading] = useState(!hasPlayedThisSession);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleComplete = () => {
    setLoading(false);
    hasPlayedThisSession = true;
  };

  if (!hasMounted) return null;

  return (
    <>
      {loading ? (
        <LoadingScreen onComplete={handleComplete} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Hero />
        </div>
      )}
    </>
  );
}
