'use client';

import React, { useRef, useEffect } from 'react';

interface HeroProps {
  onUmbraTiltTriggered: () => void;
  hasDataTraceBeenRevealedAtLeastOnce: boolean;
  hasFirstUmbraTiltOccurred: boolean;
}

const Hero: React.FC<HeroProps> = ({ 
  onUmbraTiltTriggered, 
  hasDataTraceBeenRevealedAtLeastOnce, 
  hasFirstUmbraTiltOccurred 
}) => {
  const umbraTapCount = useRef(0);

  const handleUmbraClick = () => {
    if (!hasDataTraceBeenRevealedAtLeastOnce) {
      console.log("Hero: Umbra tap ignored, Data Trace not yet revealed once.");
      umbraTapCount.current = 0;
      return;
    }

    umbraTapCount.current += 1;
    console.log("Hero: Umbra tapped count:", umbraTapCount.current);

    const tapsRequired = hasFirstUmbraTiltOccurred ? 2 : 4;

    if (umbraTapCount.current >= tapsRequired) {
      console.log(`Hero: Umbra ${tapsRequired} taps reached! Triggering tilt.`);
      onUmbraTiltTriggered();
      umbraTapCount.current = 0;
    }
  };

  // Removed Three.js setup and animation logic

  return (
    <section className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      {/* Optional: Add some initial text or a loading indicator, ensure it's above the canvas */}
      <div className="z-10 pointer-events-auto">
        <h1 
          className="text-white text-4xl cursor-pointer"
          onClick={handleUmbraClick}
        >
          {'{Umbra}'}
        </h1>
      </div>
    </section>
  );
};

export default Hero; 