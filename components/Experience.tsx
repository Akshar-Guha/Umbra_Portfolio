import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Placeholder experience data
const experiences = [
  {
    year: '2 more to Go', // Placeholder year
    title: 'Umbra is my In game Name', // Updated title
    description: 'OOoooK—so you\'ve been told what to do. Don\'t hesitate now.\nTake a deep breath, then **&&*** double-tap, like you\'re calling up something Faster than you.think', // Updated description for 1st block
  },
  {
    year: 'what a waste,', // Placeholder year
    title: 'Whats Up', // Updated title
    description: 'You just wasted your focus with a single tap. Someone who knew what they were doing would\'ve skipped that and gone straight for the {Umbra} icon with a double-tap. &&', // Updated description for 2nd block
  },
  {
    year: 'Lets end this perfectly', // Placeholder year
    title: 'Here, Data Is handled with Privacy Not Piracy,', // Updated title
    description: 'But fine—if you still need your little routine, **tap four times** on {Umbra}. Watch how the shadows change into shapes you won\'t forget.\nRemember Block 2 instructions: there\'s no room for half-steps in darkness.\n–x–0', // Updated description for 3rd block
  },
  // Add more placeholder entries as needed
];

type VisibilityPhase = 'blank' | 'initialFlash' | 'hidden' | 'revealing' | 'fullyRevealed';

interface ExperienceProps {
  onFullyRevealed: () => void;
  hideExperienceContent: boolean; // New prop
}

const Experience: React.FC<ExperienceProps> = ({ onFullyRevealed, hideExperienceContent }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container of the whole section
  const [containerHeight, setContainerHeight] = useState(0); // State to store container height

  const [visibilityPhase, setVisibilityPhase] = useState<VisibilityPhase>('blank'); // Start in blank state
  const [clickActivationCount, setClickActivationCount] = useState(0);
  const [revealedBlocksCount, setRevealedBlocksCount] = useState(0);

  // Measure container height after render
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    } else {
      setContainerHeight(0);
    }
  }, [containerRef.current, visibilityPhase]);

  // Manage phase transitions
  useEffect(() => {
    if (visibilityPhase === 'blank') {
      // Immediately transition to initial flash on mount
      const timer = setTimeout(() => {
        setVisibilityPhase('initialFlash');
      }, 50); // Short delay before flash
      return () => clearTimeout(timer);
    } else if (visibilityPhase === 'initialFlash') {
      const timer = setTimeout(() => {
        setVisibilityPhase('hidden');
      }, 1500); // 1.5 seconds initial flash
      return () => clearTimeout(timer);
    }
  }, [visibilityPhase]);

  const handleClick = () => {
    if (visibilityPhase === 'hidden' || visibilityPhase === 'revealing' || visibilityPhase === 'blank') {
      if (visibilityPhase === 'blank') {
        // Ignore clicks during initial blank/flash. Only count clicks in hidden or revealing.
        return;
      }

      const newClickCount = clickActivationCount + 1;
      setClickActivationCount(newClickCount);

      // Determine clicks needed based on current revealed blocks count
      let clicksNeeded = 4; // Default for the first block
      if (revealedBlocksCount > 0) {
        clicksNeeded = 2; // 2 clicks for subsequent blocks
      }

      if (newClickCount >= clicksNeeded) {
        setClickActivationCount(0); // Reset click count
        const nextRevealedCount = revealedBlocksCount + 1;
        setRevealedBlocksCount(nextRevealedCount);

        if (visibilityPhase === 'hidden') {
          setVisibilityPhase('revealing'); // Transition from hidden to revealing
        } else if (nextRevealedCount >= experiences.length) {
          setVisibilityPhase('fullyRevealed'); // Transition to fully revealed
          onFullyRevealed(); // Call the new callback prop here
        }
      }
    }
  };

  const shouldShowVerticalLine = visibilityPhase === 'revealing' || visibilityPhase === 'fullyRevealed';

  // If hideExperienceContent is true, render nothing or a minimal placeholder
  if (hideExperienceContent) {
    return (
      <section id="experience" className="py-16 text-white pt-32 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          {/* Optional: Message indicating content was archived or transformed */}
          {/* <p className="text-gray-500 italic">Data Trace Archived.</p> */}
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 text-white pt-32 min-h-screen" onClick={handleClick} style={{ cursor: 'pointer' }}> {/* Remove bg-black */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">&lbrace; Data Trace &rbrace;</h2>{/* Thematic heading */}
        {/* Add a minimum height or padding to the container so useScroll target works correctly */}
        <div ref={containerRef} className="relative wrap p-0 md:p-10 h-full min-h-[50vh]">
          {/* Vertical line - Animated dotted line */}
          {shouldShowVerticalLine && (
            <motion.div 
              className="w-[2px] absolute left-6 md:left-1/2 transform md:-translate-x-1/2" // Width of 2px
              style={{
                transformOrigin: "top",
                height: containerHeight,
                backgroundImage: 'radial-gradient(circle at center, rgba(55, 65, 81, 0.7) 2px, transparent 2.5px)', // Adjusted dot opacity
                backgroundSize: '100% 15px', // Dot size and spacing (2px dot, 13px gap)
                backgroundRepeat: 'repeat-y',
                opacity: 1, // Opacity controlled by gradient alpha now
              }}
              animate={visibilityPhase === 'fullyRevealed' ? { backgroundPositionY: ["0px", "15px"] } : {}}
              transition={visibilityPhase === 'fullyRevealed' ? {
                duration: 0.7, // Speed of a full cycle
                repeat: Infinity,
                ease: "linear",
              } : {}}
            ></motion.div>
          )}

          {visibilityPhase === 'initialFlash' && experiences.map((item, index) => (
            <div // Static render for initial flash
              key={`flash-${index}`} 
              className={`mb-8 w-full flex items-center relative px-2 md:px-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row md:justify-between'}`}
            >
              {/* Spacer for mobile line */}
              <div className="w-10 md:w-auto"></div>
              {/* Content Block */}
              <div className={`
                order-1 bg-gray-900 rounded-lg shadow-xl 
                w-2/3 px-4 py-3 text-left border border-gray-700 
                ml-10 mr-10 md:ml-0 md:mr-0 md:w-5/12 md:px-6 md:py-4 
                ${index % 2 === 0 ? 'md:text-right md:ml-auto' : 'md:text-left md:mr-auto'}
              `}>
                <h3 className="mb-2 md:mb-3 font-bold text-gray-300 font-sans flex flex-wrap items-center">
                  <span className="italic text-xs bg-gray-800 px-1 py-0.5 rounded mr-2">{item.year}</span>
                  - <span className="text-sm md:text-base ml-2">{item.title}</span>
                </h3>
                <p className="text-sm leading-snug tracking-wide text-gray-400 text-opacity-100">{item.description}</p>
              </div>
              {/* Timeline dot */}
              <div className={`
                flex-shrink-0 w-6 h-6 rounded-full z-20 bg-gray-800 shadow-xl 
                absolute right-3 top-1/2 transform -translate-y-1/2 
                md:relative md:top-auto md:left-auto md:transform-none md:ml-0 md:mr-0 md:w-8 md:h-8 md:flex md:justify-center md:items-center 
                ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} /* Mobile: absolute right, Desktop: relative */
              `}></div>
            </div>
          ))}

          {(visibilityPhase === 'revealing' || visibilityPhase === 'fullyRevealed') && 
            experiences.slice(0, visibilityPhase === 'fullyRevealed' ? experiences.length : revealedBlocksCount).map((item, index) => (
            <motion.div // Animated render for revealing/fullyRevealed phases
              key={`reveal-${index}`} 
              className={`mb-8 w-full flex items-center relative px-2 md:px-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row md:justify-between'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={visibilityPhase === 'fullyRevealed' ? {} : { opacity: 1, y: 0 }} // Only apply simple animate during revealing
              transition={visibilityPhase === 'fullyRevealed' ? {} : { duration: 0.8, ease: "easeOut", delay: 0.1 }} // Only apply simple transition during revealing
              // Apply scroll animation props only when fully revealed
              {
                ...(visibilityPhase === 'fullyRevealed' && {
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: false, amount: 0.3 }, // Animate on scroll up and down
                  transition: { duration: 0.8, ease: "easeOut" }, // Smooth scroll animation
                  // No exit animation for now, blocks should remain visible
                  // exit: { opacity: 0, y: -50 }
                })
              }
            >
              {/* Spacer for mobile line */}
              <div className="w-10 md:w-auto"></div>
              {/* Content Block */}
              <div className={`
                order-1 bg-gray-900 rounded-lg shadow-xl 
                w-2/3 px-4 py-3 text-left border border-gray-700 
                ml-10 mr-10 md:ml-0 md:mr-0 md:w-5/12 md:px-6 md:py-4 
                ${index % 2 === 0 ? 'md:text-right md:ml-auto' : 'md:text-left md:mr-auto'}
              `}>
                <h3 className="mb-2 md:mb-3 font-bold text-gray-300 font-sans flex flex-wrap items-center">
                  <span className="italic text-xs bg-gray-800 px-1 py-0.5 rounded mr-2">{item.year}</span>
                  - <span className="text-sm md:text-base ml-2">{item.title}</span>
                </h3>
                <p className="text-sm leading-snug tracking-wide text-gray-400 text-opacity-100">{item.description}</p>
              </div>
              {/* Timeline dot */}
              <div className={`
                flex-shrink-0 w-6 h-6 rounded-full z-20 bg-gray-800 shadow-xl 
                absolute right-3 top-1/2 transform -translate-y-1/2 
                md:relative md:top-auto md:left-auto md:transform-none md:ml-0 md:mr-0 md:w-8 md:h-8 md:flex md:justify-center md:items-center 
                ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} /* Mobile: absolute right, Desktop: relative */
              `}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 