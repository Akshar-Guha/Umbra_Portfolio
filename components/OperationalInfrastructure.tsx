import React from 'react';

// Placeholder infrastructure components
const infrastructure = [
  'Next.js (Frontend Operations)', // Framework
  'React (Interface Protocols)', // Library
  'Tailwind CSS (Evasion Styling)', // Styling Framework
  'Framer Motion (Behavioral Simulation)', // Animation Library
  'Node.js (Execution Environment)', // Runtime
  'TypeScript (Type Enforcement)', // Language
  // Add other key technologies used in building the site
];

const OperationalInfrastructure: React.FC = () => {
  return (
    <section id="infrastructure" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">&lbrace; Operational Infrastructure &rbrace;</h2>{/* Thematic heading */}
        <div className="flex flex-wrap justify-center gap-4">
          {infrastructure.map((item, index) => (
            <span
              key={index}
              className="px-4 py-2 border border-gray-700 rounded-full text-gray-300 text-sm font-mono transition duration-300 ease-in-out hover:bg-gray-800 hover:border-gray-600 cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationalInfrastructure; 