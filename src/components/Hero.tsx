'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Hero = () => {
  // Removed Three.js setup and animation logic

  return (
    <section className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      {/* Optional: Add some initial text or a loading indicator, ensure it's above the canvas */}
      <div className="z-10 pointer-events-none">
        <h1 className="text-white text-4xl">Umbra</h1>
      </div>
    </section>
  );
};

export default Hero; 