import React from 'react';

// Placeholder achievements data
const achievements = [
  {
    title: 'Protocol Mastery Validation', // Thematic title
    description: 'Successfully navigated and mapped complex, undocumented network structures.',
  },
  {
    title: 'Data Obfuscation Citation', // Thematic title
    description: 'Developed novel techniques for enhancing data privacy in transit.',
  },
  {
    title: 'System Footprint Reduction Award', // Humorous/thematic title
    description: 'Achieved significant reduction in detectable digital presence across multiple platforms.',
  },
  // Add more placeholder entries as needed
];

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">&lbrace; Validations & Recognitions &rbrace;</h2>{/* Thematic heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800">
              <h3 className="text-xl font-bold text-gray-300 mb-2 font-mono">{achievement.title}</h3>
              <p className="text-gray-400 text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements; 