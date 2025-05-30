'use client';

import React from 'react';

// Mirroring ParticleConfig from page.tsx
interface ParticleConfig {
  count: number;
  size: number;
  strobeSpeed: number;
  burstStrength: number;
  baseColor: string;
}

interface ControlsPanelProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
  particleConfig: ParticleConfig;
  onUpdateParticleConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  isVisible,
  onToggleVisibility,
  particleConfig,
  onUpdateParticleConfig,
}) => {
  if (!isVisible) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    onUpdateParticleConfig({ [name]: parsedValue });
  };

  return (
    <div className="fixed top-0 left-0 h-full w-72 bg-gray-900 bg-opacity-95 text-gray-200 p-6 z-[100] overflow-y-auto shadow-2xl font-mono">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-400">Particle Controls</h2>
        <button 
          onClick={onToggleVisibility} 
          className="text-gray-400 hover:text-white bg-purple-600 hover:bg-purple-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Close controls panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-purple-300 mb-1">Particle Count</label>
          <input 
            type="number" 
            name="count" 
            id="count" 
            value={particleConfig.count}
            onChange={handleChange} 
            min="100" 
            max="50000" 
            step="100"
            className="w-full bg-gray-800 border-gray-700 text-gray-200 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500 text-sm shadow-inner"
          />
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-purple-300 mb-1">Particle Size</label>
          <input 
            type="number" 
            name="size" 
            id="size" 
            value={particleConfig.size}
            onChange={handleChange} 
            min="0.001" 
            max="0.5" 
            step="0.001"
            className="w-full bg-gray-800 border-gray-700 text-gray-200 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500 text-sm shadow-inner"
          />
        </div>

        <div>
          <label htmlFor="strobeSpeed" className="block text-sm font-medium text-purple-300 mb-1">Strobe Speed (Hz)</label>
          <input 
            type="number" 
            name="strobeSpeed" 
            id="strobeSpeed" 
            value={particleConfig.strobeSpeed}
            onChange={handleChange} 
            min="0.1" 
            max="10" 
            step="0.1"
            className="w-full bg-gray-800 border-gray-700 text-gray-200 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500 text-sm shadow-inner"
          />
        </div>

        <div>
          <label htmlFor="burstStrength" className="block text-sm font-medium text-purple-300 mb-1">Burst Strength</label>
          <input 
            type="number" 
            name="burstStrength" 
            id="burstStrength" 
            value={particleConfig.burstStrength}
            onChange={handleChange} 
            min="0.5" 
            max="20" 
            step="0.1"
            className="w-full bg-gray-800 border-gray-700 text-gray-200 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500 text-sm shadow-inner"
          />
        </div>

        <div>
          <label htmlFor="baseColor" className="block text-sm font-medium text-purple-300 mb-1">Base Color</label>
          <input 
            type="color" // Color picker input
            name="baseColor" 
            id="baseColor" 
            value={particleConfig.baseColor}
            onChange={handleChange} 
            className="w-full h-10 bg-gray-800 border-gray-700 rounded-md p-1 focus:ring-purple-500 focus:border-purple-500 shadow-inner cursor-pointer"
          />
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-8 text-center">More advanced controls & algorithms coming soon!</p>
    </div>
  );
};

export default ControlsPanel; 