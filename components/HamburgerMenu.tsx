'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link'; // Not used, can be removed

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    event.preventDefault();
    setIsOpen(false); // Close menu on link click
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 0; 
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Adjusted translateY for new icon size (approx 20px container -> 5px movement)
  const line1Variants = {
    opened: { 
        rotate: 45, 
        translateY: 5.5, // Fine-tuned for 20px (h-5) container and 1px line (h-px)
        transition: { duration: 0.3, ease: "easeOut" }
    },
    closed: { 
        rotate: 0, 
        translateY: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const line2Variants = {
    opened: { 
        opacity: 0, 
        transition: { duration: 0.1, ease: "easeOut" } 
    },
    closed: { 
        opacity: 1, 
        transition: { duration: 0.3, ease: "easeOut", delay: 0.2 }
    }
  };

  const line3Variants = {
    opened: { 
        rotate: -45, 
        translateY: -5.5, // Fine-tuned for 20px (h-5) container and 1px line (h-px)
        transition: { duration: 0.3, ease: "easeOut" } 
    },
    closed: { 
        rotate: 0, 
        translateY: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const menuContainerVariants = {
    opened: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } 
    },
    closed: {
      opacity: 0,
      y: "-20%",
      transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  return (
    <div ref={menuRef} className="fixed top-5 right-5 z-[100]"> {/* Adjusted position slightly */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 border-none outline-none"
        aria-label="Toggle menu"
        whileHover={{ scale: 1.15 }} // Slightly increased hover scale for no-bg button
        whileTap={{ scale: 0.9 }}
      >
        {/* Icon container reduced to w-5 h-5 (20px) */}
        <div className="w-5 h-5 flex flex-col justify-around items-center">
          <motion.span 
            className="block h-px w-full bg-white rounded-full" // Thinner line: h-px (1px)
            variants={line1Variants}
            animate={isOpen ? "opened" : "closed"}
          ></motion.span>
          <motion.span 
            className="block h-px w-full bg-white rounded-full" // Thinner line: h-px (1px)
            variants={line2Variants}
            animate={isOpen ? "opened" : "closed"}
          ></motion.span>
          <motion.span 
            className="block h-px w-full bg-white rounded-full" // Thinner line: h-px (1px)
            variants={line3Variants}
            animate={isOpen ? "opened" : "closed"}
          ></motion.span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Removed background classes for 100% transparency
            className="absolute top-12 right-0 mt-1 w-56 rounded-lg shadow-2xl p-4 font-mono" // Adjusted width, padding, margins
            variants={menuContainerVariants}
            initial="closed"
            animate="opened"
            exit="closed"
          >
            {/* Updated Logo and styling */}
            <div className="text-2xl font-bold text-gray-100 mb-5 text-center tracking-wider">&lbrace;U&rbrace;</div>
            <nav>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#"
                    onClick={(e) => handleSmoothScroll(e, '')} 
                    // Adjusted link styling for potentially transparent background
                    className="block text-gray-200 hover:text-white transition-colors duration-200 text-sm py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10"
                  >
                    Trace Start
                  </a>
                </li>
                <li>
                  <a 
                    href="#experience" 
                    onClick={(e) => handleSmoothScroll(e, 'experience')} 
                    className="block text-gray-200 hover:text-white transition-colors duration-200 text-sm py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10"
                  >
                    Data Trace
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu; 