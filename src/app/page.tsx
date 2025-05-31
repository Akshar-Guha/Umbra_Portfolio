'use client';

import dynamic from 'next/dynamic';
import React, { useState, useCallback, useRef } from 'react';
import Experience from '../../components/Experience';
import HamburgerMenu from '../../components/HamburgerMenu';
import ParticleVisualizer from '../../components/ParticleVisualizer';
import * as THREE from 'three';

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
  speedMultiplier: number;
  zRadius: number;
  flowDirection: THREE.Vector3; // Using THREE.Vector3 for direction
}

export default function Home() {
  // Set initial particle configuration
  const [dynamicParticleConfig, setDynamicParticleConfig] = useState<ParticleConfig>({
    count: 9000, // Increased particle count
    size: 0.03, // Increased particle size
    strobeSpeed: 1,
    burstStrength: 3,
    baseColor: '#ffffff',
    speedMultiplier: 1, // Initial speed multiplier
    zRadius: 30, // Initial Z-axis radius (matches initial positions)
    flowDirection: new THREE.Vector3(0, 0, 1), // Initial flow direction (towards positive Z)
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isDataTraceFullyRevealed, setIsDataTraceFullyRevealed] = useState(false);
  const [isUmbraTiltActive, setIsUmbraTiltActive] = useState(false);
  const [hasDataTraceBeenRevealedAtLeastOnce, setHasDataTraceBeenRevealedAtLeastOnce] = useState(false);
  const [hasFirstUmbraTiltOccurred, setHasFirstUmbraTiltOccurred] = useState(false);
  const [subsequentTiltTapCount, setSubsequentTiltTapCount] = useState(0);

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
      // Handle subsequent taps after the first tilt
      setSubsequentTiltTapCount(prevCount => {
        const newCount = prevCount + 1;
        console.log("Hero: Subsequent Umbra tapped count:", newCount);
        if (newCount % 2 === 0) {
          // Every 2 subsequent taps, enhance particle effect
          setDynamicParticleConfig(prevConfig => ({
            ...prevConfig,
            // Example enhancements (adjust values as needed)
            count: Math.min(20000, prevConfig.count + 1000), // Increase count up to a limit
            speedMultiplier: prevConfig.speedMultiplier * 1.1, // Increase speed
            zRadius: Math.min(100, prevConfig.zRadius + 5), // Increase z-axis radius
            // Flow direction could be changed here as well, e.g., rotate it slightly
            // flowDirection: new THREE.Vector3(Math.sin(newCount * 0.1), 0, Math.cos(newCount * 0.1)).normalize(),
          }));
          setIsUmbraTiltActive(true); // Keep tilt active while enhancing
          console.log("Subsequent Umbra tilt triggered (2 taps). Enhancing particles.");
        } else {
          setIsUmbraTiltActive(false); // Brief deactivation between enhancements
          console.log("Subsequent Umbra tilt triggered (1 tap). Awaiting next tap.");
        }
        return newCount;
      });
    }
  }, [hasDataTraceBeenRevealedAtLeastOnce, hasFirstUmbraTiltOccurred]); // Removed isUmbraTiltActive from dependencies

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
          config={dynamicParticleConfig}
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
