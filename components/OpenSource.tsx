import React from 'react';

// Placeholder contributions data
const contributions = [
  {
    project: 'Obscura Framework', // Thematic project name
    description: 'Submitted protocol enhancements for secure data tunneling.', // Thematic description
    link: '#', // Placeholder link
  },
  {
    project: 'Entropy Generator Lib',
    description: 'Provided entropy sources for cryptographic random number generation.',
    link: '#',
  },
  {
    project: 'CipherStream Utilities',
    description: 'Contributed optimization algorithms for data stream processing.',
    link: '#',
  },
  // Add more placeholder entries as needed
];

const OpenSource: React.FC = () => {
  return (
    <section id="opensource" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">&lbrace; Contribution Logs &rbrace;</h2>{/* Thematic heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contributions.map((contribution, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800">
              <h3 className="text-xl font-bold text-gray-300 mb-2 font-mono">{contribution.project}</h3>
              <p className="text-gray-400 text-sm mb-4">{contribution.description}</p>
              <a href={contribution.link} className="text-blue-400 hover:underline text-sm font-mono" target="_blank" rel="noopener noreferrer">&#123; Access Record &#125;</a>{/* Thematic link text */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource; 