import React from 'react';
import ProjectCard from './ProjectCard';
import { generateSHA256Placeholder } from '@/lib/utils'; // Use the correct function name

// Placeholder project data
const projects = [
  {
    id: 1,
    name: 'Project Alpha',
    glyph: '>_',
    hash: generateSHA256Placeholder(), // Use the new placeholder function
  },
  {
    id: 2,
    name: 'Project Beta',
    glyph: '//',
    hash: generateSHA256Placeholder(), // Use the new placeholder function
  },
  {
    id: 3,
    name: 'Project Gamma',
    glyph: '{}',
    hash: generateSHA256Placeholder(), // Use the new placeholder function
  },
  // Add more placeholder projects as needed
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 