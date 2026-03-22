import React from 'react';
import { motion as Motion } from 'framer-motion';

const skillsData = [
  {
    id: 1,
    title: 'Full Stack',
    details: 'HTML, CSS, JavaScript, React, Django, PostgreSQL',
    color: '#2365af', // Blue
    textColor: 'text-white'
  },
  {
    id: 2,
    title: 'AI/ML',
    details: 'Python, ML basics',
    color: '#a91f1a', // Red
    textColor: 'text-white'
  },
  {
    id: 3,
    title: 'Agentic AI',
    details: 'AI agents, workflows',
    color: '#c2c1b8', // Light Grey
    textColor: 'text-neutral-900' // Dark text for contrast
  },
  {
    id: 4,
    title: 'LLM Fine-Tuning',
    details: 'Model tuning basics',
    color: '#1f4f65', // Teal
    textColor: 'text-white'
  },
  {
    id: 5,
    title: 'Startup (Idea Stage)',
    details: 'Idea stage, building products',
    color: '#5d221a', // Dark Brown
    textColor: 'text-white'
  }
];

export default function Skills() {
  return (
    <section className="w-full bg-black relative pb-32 pt-20">
      
      <div className="max-w-5xl mx-auto w-full px-6 mb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-white">
          Capabilities
        </h2>
        <p className="text-neutral-400 text-lg mt-4 font-light tracking-wide max-w-2xl">
          Scroll to explore my technical stack and expertise. Each layer builds upon the foundation of intelligent systems.
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col gap-0 pb-32">
        {skillsData.map((skill, index) => {
          // Calculate the sticky top offset so they stack. 
          // 100px starting point, each card offset by 45px to show its top edge.
          const stickyTop = 100 + (index * 45); 
          
          return (
            <div 
              key={skill.id}
              className={`sticky w-full rounded-t-[3rem] p-8 md:p-12 lg:p-16 h-[60vh] flex flex-col items-center justify-start shadow-[0_-10px_20px_rgba(0,0,0,0.3)] border-t border-white/10 transition-transform`}
              style={{
                top: `${stickyTop}px`,
                backgroundColor: skill.color,
                zIndex: index + 10,
              }}
            >
              <div className="w-full h-full flex flex-col items-center mt-4">
                {/* Large Background Number Effect similar to the reference image */}
                <h2 className={`text-6xl sm:text-7xl md:text-[100px] font-black tracking-tighter mix-blend-overlay opacity-80 ${skill.textColor}`}>
                  ({`0${index + 1}`})
                </h2>
                
                <div className={`mt-auto mb-auto flex flex-col items-center text-center ${skill.textColor}`}>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    {skill.title}
                  </h3>
                  <p className="text-xl md:text-2xl font-medium tracking-wide max-w-3xl opacity-90">
                    {skill.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
