'use client';

import dynamic from 'next/dynamic';
import React, { useState, useCallback, useRef } from 'react';
import Experience from '../../components/Experience';
import Footer from '@/components/Footer';
import HamburgerMenu from '../../components/HamburgerMenu';
import ParticleVisualizer from '../../components/ParticleVisualizer';
import ControlsPanel from '../../components/ControlsPanel';
import { useScroll, useTransform } from 'framer-motion';

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
  const [particleConfig, setParticleConfig] = useState<ParticleConfig>({
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

  // Placeholder for updating individual particle config values - to be used by ControlsPanel
  const updateParticleConfig = useCallback((newConfig: Partial<ParticleConfig>) => {
    setParticleConfig(prevConfig => ({ ...prevConfig, ...newConfig }));
  }, []);

  // Handlers for particle interaction area (full screen div)
  const handleParticlePointerEnter = () => {
    setIsHovering(true);
  };

  const handleParticlePointerLeave = () => {
    setIsHovering(false);
  };

  // Note: onPointerMove is handled internally by ParticleVisualizer component

  // Scroll-based color transformation
  // Use window scroll
  const { scrollYProgress } = useScroll(); // Get scroll progress for the default scroll container (window/body)

  // Define your color preset (e.g., an array of color strings or hex values)
  // 7 color preset for scroll-based transition
  const colorPalette = ['#8F00FF', '#00F5A0', '#FFFFFF', '#FF00FF', '#00FFFF', '#FFFF00', '#FF69B4']; // Violet, Mint, White, Magenta, Cyan, Yellow, Hot Pink
  const scrollColor = useTransform(
    scrollYProgress,
    [0, 1/6, 2/6, 3/6, 4/6, 5/6, 1], // Map scroll progress across 7 colors
    colorPalette // The corresponding colors
  );

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
          scrollColor={scrollColor}
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
