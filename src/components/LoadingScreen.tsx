"use client";

import { useEffect, useRef } from "react";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to play immediately
    const tryPlay = () => {
      audio.play().catch(() => {
        // If blocked, wait for any user interaction
        const unlock = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", unlock);
          document.removeEventListener("keydown", unlock);
          document.removeEventListener("touchstart", unlock);
        };
        document.addEventListener("click", unlock);
        document.addEventListener("keydown", unlock);
        document.addEventListener("touchstart", unlock);
      });
    };

    // Small delay so audio element is ready
    const playTimer = setTimeout(tryPlay, 100);

    // Transition to main site after animation completes
    const doneTimer = setTimeout(() => {
      audio.pause();
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(playTimer);
      clearTimeout(doneTimer);
      audio.pause();
    };
  }, [onComplete]);

  // Helper function to render fur spans - High quality
  const renderFur = () => {
    return Array.from({ length: 31 }, (_, i) => (
      <span key={i} className={`fur-${31 - i}`}></span>
    ));
  };

  // Helper function to render lamp spans - High quality
  const renderLamps = () => {
    return Array.from({ length: 28 }, (_, i) => (
      <span key={i} className={`lamp-${i + 1}`}></span>
    ));
  };




  return (
    <div className="netflix-container" id="container">
      {/* Audio element - autoPlay + muted=false for max browser compatibility */}
      <audio
        ref={audioRef}
        src="/Netflix intro - QuickSounds.com.mp3"
        preload="auto"
      />

      <div className="netflix-intro" data-letter="D">
        {/* Helper 1: Left Vertical */}
        <div className="helper-1">
          <div className="effect-brush">
            {renderFur()}
          </div>
          <div className="effect-lumieres">
            {renderLamps()}
          </div>
        </div>

        {/* Helper 2: Top Horizontal */}
        <div className="helper-2">
          <div className="effect-brush">
            {renderFur()}
          </div>
        </div>

        {/* Helper 3: Right Vertical */}
        <div className="helper-3">
          <div className="effect-brush">
            {renderFur()}
          </div>
        </div>

        {/* Helper 4: Bottom Horizontal */}
        <div className="helper-4">
          <div className="effect-brush">
            {renderFur()}
          </div>
        </div>
      </div>
    </div>
  );
}
