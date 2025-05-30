'use client';

import dynamic from 'next/dynamic';
import React, { useState, useCallback } from 'react';
import Experience from '../../components/Experience';
import HamburgerMenu from '../../components/HamburgerMenu';
import ParticleVisualizer from '../../components/ParticleVisualizer';

// Dynamically import Hero component to ensure it only runs on the client side
const DynamicHero = dynamic(() => import('@/components/Hero').then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="text-white">Loading Hero...</div>,
});

// Define a type for the particle parameters
interface ParticleConfig {
  count: number;
  size: number;
  strobeSpeed: number;
  burstStrength: number;
  // Add more parameters as needed: e.g., color palette, algorithm type
  baseColor: string; // Example: can be used for initial color before strobing
}

export default function Home() {
  // Set initial particle configuration
  const [particleConfig] = useState<ParticleConfig>({
    count: 9000, // Increased particle count
    size: 0.03, // Increased particle size
    strobeSpeed: 1,
    burstStrength: 3,
    baseColor: '#ffffff',
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isDataTraceFullyRevealed, setIsDataTraceFullyRevealed] = useState(false);
  const [isUmbraTiltActive, setIsUmbraTiltActive] = useState(false);
  const [hasDataTraceBeenRevealedAtLeastOnce, setHasDataTraceBeenRevealedAtLeastOnce] = useState(false);
  const [hasFirstUmbraTiltOccurred, setHasFirstUmbraTiltOccurred] = useState(false);

  // Handlers for particle interaction area (full screen div)
  const handleParticlePointerEnter = () => {
    setIsHovering(true);
  };

  const handleParticlePointerLeave = () => {
    setIsHovering(false);
  };

  // Note: onPointerMove is handled internally by ParticleVisualizer component

  const handleDataTraceFullyRevealed = useCallback(() => {
    setIsDataTraceFullyRevealed(true);
    setHasDataTraceBeenRevealedAtLeastOnce(true);
    console.log("Data Trace fully revealed. At least once: true");
  }, []);

  const handleUmbraTiltTrigger = useCallback(() => {
    if (!hasDataTraceBeenRevealedAtLeastOnce) {
      console.log("Umbra tilt trigger ignored: Data Trace not yet revealed at least once.");
      return;
    }

    if (!hasFirstUmbraTiltOccurred) {
      setIsUmbraTiltActive(true);
      setHasFirstUmbraTiltOccurred(true);
      console.log("First Umbra tilt triggered (4 taps). Tilt active, First Occurred: true");
    } else {
      setIsUmbraTiltActive(prev => !prev);
      console.log("Subsequent Umbra tilt triggered (2 taps). Tilt active:", !isUmbraTiltActive);
    }
  }, [hasDataTraceBeenRevealedAtLeastOnce, hasFirstUmbraTiltOccurred, isUmbraTiltActive]);

  return (
    <main className="w-screen relative">
      {/* Particle Visualizer - Positioned absolutely behind content */}
      <div
        className="fixed inset-0 z-0 h-screen"
        onPointerEnter={handleParticlePointerEnter}
        onPointerLeave={handleParticlePointerLeave}
        // onPointerMove is handled by the Canvas component internally
      >
        <ParticleVisualizer 
          config={particleConfig}
          isHovering={isHovering}
          isDataTraceFullyRevealed={isDataTraceFullyRevealed}
          isUmbraTiltActive={isUmbraTiltActive}
        />
      </div>
      
      <HamburgerMenu />

      {/* Content Container - Positioned above the visualizer */}
      <div className="relative z-10">
        <DynamicHero 
          onUmbraTiltTriggered={handleUmbraTiltTrigger}
          hasDataTraceBeenRevealedAtLeastOnce={hasDataTraceBeenRevealedAtLeastOnce}
          hasFirstUmbraTiltOccurred={hasFirstUmbraTiltOccurred}
        />

        <Experience 
          onFullyRevealed={handleDataTraceFullyRevealed} 
          hideExperienceContent={hasFirstUmbraTiltOccurred} 
        />

        {/* Removed Footer component */}

        {/* Removed Controls for particle color and size */}

      </div>
    </main>
  );
}
