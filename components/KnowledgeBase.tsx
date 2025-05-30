import React from 'react';

// Placeholder knowledge base entries
const knowledgeEntries = [
  {
    area: 'Algorithmic Cryptography', // Thematic area
    status: 'Deep Dive Complete', // Thematic status
  },
  {
    area: 'Network Topology Mapping',
    status: 'Protocol Analysis Ongoing',
  },
  {
    area: 'Obfuscated Code Structures',
    status: 'Pattern Recognition Initiated',
  },
  {
    area: 'Decentralized Consensus Mechanisms',
    status: 'Layer Investigation Underway',
  },
  // Add more placeholder entries as needed
];

const KnowledgeBase: React.FC = () => {
  return (
    <section id="knowledge" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">&lbrace; Knowledge Base &rbrace;</h2>{/* Thematic heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {knowledgeEntries.map((entry, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800 text-center">
              <h3 className="text-xl font-bold text-gray-300 mb-2 font-mono">{entry.area}</h3>
              <p className="text-gray-400 text-sm italic">{entry.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase; 