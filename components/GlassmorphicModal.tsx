import React from 'react';

interface GlassmorphicModalProps {
  hash: string;
}

const GlassmorphicModal: React.FC<GlassmorphicModalProps> = ({ hash }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="backdrop-filter backdrop-blur-2xl bg-white bg-opacity-10 rounded-lg p-6 text-white text-center border border-gray-600 shadow-2xl transition-all duration-300 ease-in-out">
        <p className="text-xs mb-2 uppercase text-gray-300">Full SHA-256 Hash:</p>
        <p className="text-sm break-all font-mono tracking-wider text-gray-100">{hash}</p>
      </div>
    </div>
  );
};

export default GlassmorphicModal;