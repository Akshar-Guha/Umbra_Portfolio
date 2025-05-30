import React, { useState, useMemo } from 'react';
import GlassmorphicModal from './GlassmorphicModal';
import { motion } from 'framer-motion'; // Import motion from framer-motion

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    glyph: string; // Or whatever representation the glyph takes
    hash: string; // The full SHA-256 hash
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a subtle deterministic color for the glyph based on project ID
  const dynamicGlyphColor = useMemo(() => {
    const colors = [
      '#60a5fa', // blue-400
      '#a78bfa', // violet-400
      '#f0abfc', // fuchsia-300
      '#22d3ee', // cyan-400
      '#facc15', // yellow-400
    ];
    const colorIndex = project.id % colors.length;
    return colors[colorIndex];
  }, [project.id]);

  // Generate a subtle deterministic background texture position based on project ID
  const backgroundPosition = useMemo(() => {
    // Vary the background position slightly based on ID to give a unique starting point for the texture
    const x = (project.id * 10) % 100; // vary x position
    const y = (project.id * 15) % 100; // vary y position
    return `${x}% ${y}%`;
  }, [project.id]);

  // Function to get a partial hash - showing the first 8 characters (no longer needed here but keeping for reference or potential future use)
  // const getPartialHash = (hash: string) => {
  //   return hash.substring(0, 8) + '...';
  // };

  return (
    <motion.div // Use motion.div for animations
      className="relative p-6 border border-gray-800 rounded-lg overflow-hidden bg-black group flex flex-col items-center justify-center text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minHeight: '200px',
        // Add a subtle noise texture using a repeating linear gradient
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 10px)',
        backgroundSize: '10px 10px',
        backgroundPosition: backgroundPosition, // Apply deterministic position
        backgroundColor: dynamicGlyphColor, // Use glyph color as background base
      }}
      whileHover={{
        scale: 1.05, // Increased scale
        y: -5, // Subtle upward translation
        rotate: project.id % 2 === 0 ? 1 : -1, // Subtle rotation based on ID parity
        boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", // More pronounced shadow
        borderColor: '#6b7280', // Lighter border on hover
        transition: { duration: 0.4 }, // Slightly longer transition
      }}
      initial={{ scale: 1, y: 0, rotate: 0, boxShadow: "0 0 #000", borderColor: '#1f2937' }} // Ensure initial state matches resting state
      transition={{ duration: 0.4, ease: "easeInOut" }} // Global transition for the motion properties
    >
      {/* Glyph - Visible when not hovered, fades out on hover, much larger */}
      <div className={`transition-opacity duration-300 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <div
          className="text-7xl font-mono mb-2 transition-colors duration-300 ease-in-out group-hover:text-gray-400"
          style={{ color: dynamicGlyphColor }} // Apply dynamic color to glyph
        >
          {project.glyph}
        </div>
        {/* Project Name - Visible when not hovered, less prominent */}
        <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300 ease-in-out">{project.name}</div>
      </div>

      {/* Glassmorphic Modal - Hidden when not hovered, fades in on hover */}
      <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}> {/* Added ease-in-out and visible/invisible classes */}
        <GlassmorphicModal hash={project.hash} />
      </div>
    </motion.div>
  );
};

export default ProjectCard; 