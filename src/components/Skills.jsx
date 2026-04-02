import React from 'react';
import { motion as Motion } from 'framer-motion';

const skillsData = [
  {
    id: 1,
    title: 'Full Stack',
    details: 'React, Next.js, Django, FastAPI, PostgreSQL, Redis',
    color: '#111', // Deep Charcoal
    textColor: 'text-white'
  },
  {
    id: 2,
    title: 'AI/ML',
    details: 'Python, PyTorch, Transformers, ONNX, Model Quantization',
    color: '#222', // Dark Grey
    textColor: 'text-white'
  },
  {
    id: 3,
    title: 'Agentic AI',
    details: 'Autonomous Agents, Multi-Agent Workflows, LangChain',
    color: '#333', // Medium Grey
    textColor: 'text-white'
  },
  {
    id: 4,
    title: 'Cloud Infrastructure',
    details: 'Docker, AWS, Vercel, GitHub Actions, Nginx',
    color: '#444', // Slate Grey
    textColor: 'text-white'
  },
  {
    id: 5,
    title: 'Product Design',
    details: 'Premium UI/UX, Design Systems, Vector Motion, Three.js',
    color: '#eee', // Almost White
    textColor: 'text-neutral-900' 
  }
];

export default function Skills() {
  return (
    <section className="w-full bg-black relative pb-32 pt-20 border-t border-white/5">
      
      <div className="max-w-5xl mx-auto w-full px-8 mb-24">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
           <span className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Intelligence Matrix</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white mb-6">
          Capabilities
        </h2>
        <p className="text-white/30 text-lg font-light tracking-tight max-w-2xl leading-relaxed">
          The technical foundation for building high-performance, 
          intelligent systems. Scalable architectures meets refined execution.
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8 space-y-0 pb-32">
        {skillsData.map((skill, index) => {
          // Responsive sticky top offset
          const stickyTop = `calc(max(5rem, 10vh) + ${index * 4}rem)`; 
          
          return (
            <div 
              key={skill.id}
              className={`sticky w-full rounded-t-[2.5rem] md:rounded-t-[3rem] p-10 md:p-16 lg:p-24 min-h-[60vh] flex flex-col items-center justify-start shadow-2xl border-t border-white/5 transition-all`}
              style={{
                top: stickyTop,
                backgroundColor: skill.color,
                zIndex: index + 10,
              }}
              tabIndex={0}
              role="region"
              aria-label={`Skill area for ${skill.title}`}
            >
              <div className="w-full h-full flex flex-col items-center">
                <span className={`text-[10px] font-bold tracking-[0.5em] mb-12 opacity-40 uppercase ${skill.textColor}`}>
                   Layer 0{index + 1}
                </span>
                
                <div className={`mt-auto mb-auto flex flex-col items-center text-center ${skill.textColor}`}>
                  <h3 className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-8">
                    {skill.title}
                  </h3>
                  <div className={`w-12 h-px mb-8 opacity-20 ${skill.textColor === 'text-white' ? 'bg-white' : 'bg-black'}`} />
                  <p className="text-lg md:text-xl font-light tracking-tight max-w-2xl leading-relaxed opacity-60">
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
