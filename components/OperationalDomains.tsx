import React from 'react';

// Placeholder operational domains
const operationalDomains = [
  {
    title: 'Network Analysis & Reconnaissance', // Thematic title
    description: 'Mapping digital landscapes and identifying access points.', // Thematic description
  },
  {
    title: 'Secure Channel Establishment',
    description: 'Implementing protocols for encrypted and discreet communication.',
  },
  {
    title: 'Data Structure Infiltration',
    description: 'Navigating and extracting information from complex data architectures.',
  },
  {
    title: 'System Integrity Verification',
    description: 'Auditing systems for vulnerabilities and ensuring operational security.',
  },
  // Add more placeholder entries as needed
];

const OperationalDomains: React.FC = () => {
  return (
    <section id="domains" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-center mb-12">&lbrace; Operational Domains &rbrace;</h2>{/* Thematic heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {operationalDomains.map((domain, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800 text-center">
              <h3 className="text-xl font-bold text-gray-300 mb-2 font-mono">{domain.title}</h3>
              <p className="text-gray-400 text-sm">{domain.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationalDomains; 