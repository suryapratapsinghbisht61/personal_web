import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'PetCare App',
    category: 'Full Stack Django & React',
    description: 'A high-converting landing page and production-ready backend for pet owners.',
    accentColor: '#4f46e5', // Indigo
    bgColor: '#1e1b4b', // Deep Indigo
  },
  {
    id: 2,
    title: 'Autonomous AI',
    category: 'Agentic Workflows',
    description: 'Custom AI agents capable of reasoning, planning, and executing complex tasks.',
    accentColor: '#059669', // Emerald
    bgColor: '#064e3b', // Deep Emerald
  },
  {
    id: 3,
    title: 'LLM Fine-Tuning',
    category: 'Machine Learning',
    description: 'Optimized large language models on custom datasets for domain-specific tasks.',
    accentColor: '#ea580c', // Orange
    bgColor: '#7c2d12', // Deep Orange
  },
  {
    id: 4,
    title: 'Computer Vision',
    category: 'Deep Learning',
    description: 'Real-time object detection and classification pipelines using Python & PyTorch.',
    accentColor: '#0284c7', // Sky
    bgColor: '#082f49', // Deep Sky
  },
  {
    id: 5,
    title: 'Startup OS',
    category: 'System Architecture',
    description: 'Scalable infrastructure and idea-stage MVP development for new tech startups.',
    accentColor: '#9333ea', // Purple
    bgColor: '#3b0764', // Deep Purple
  }
];

export default function Portfolio() {
  const [activeId, setActiveId] = useState(3); // Default to middle item
  
  return (
    <Motion.section 
      className="w-full bg-black min-h-screen py-16 flex flex-col items-center justify-center relative transition-colors duration-1000 ease-in-out"
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col items-center z-10">
        
        {/* Section Header */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            Selected Works
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto font-light">
            Interactive showcase of projects, from full-stack platforms to intelligent AI systems.
          </p>
        </Motion.div>

        {/* Accordion Container */}
        <div className="flex flex-col md:flex-row w-full h-[80vh] md:h-[70vh] gap-3 overflow-hidden">
          {projects.map((project) => {
            const isActive = activeId === project.id;
            
            return (
              <Motion.div
                key={project.id}
                layout
                role="button"
                aria-expanded={isActive}
                tabIndex={0}
                onHoverStart={() => {
                  // Only expand on hover for devices with a mouse
                  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                    setActiveId(project.id);
                  }
                }}
                onClick={() => setActiveId(project.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(project.id);
                  }
                }}
                initial={{ borderRadius: '1rem' }}
                animate={{ 
                  flex: isActive ? 4 : 1,
                  backgroundColor: isActive ? project.accentColor : 'rgba(255, 255, 255, 0.05)',
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ 
                  flex: { type: "spring", stiffness: 300, damping: 30 },
                  backgroundColor: { duration: 0.5 },
                  opacity: { duration: 0.3 }
                }}
                className={`relative overflow-hidden backdrop-blur-sm border border-white/20 flex flex-col items-center justify-between py-6 md:py-8 px-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 cursor-pointer`}
              >
                {/* Top Number */}
                <span className="text-white/80 font-mono text-xl md:text-2xl font-bold w-full text-center md:text-left drop-shadow-md">
                  0{project.id}
                </span>

                {/* Vertical/Horizontal Text when inactive */}
                {!isActive && (
                  <Motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none p-4"
                  >
                    <h3 className="text-white font-medium text-lg md:text-3xl tracking-widest whitespace-nowrap md:transform md:-rotate-90 drop-shadow-md">
                      {project.title}
                    </h3>
                  </Motion.div>
                )}

                {/* Expanded Content */}
                <AnimatePresence>
                  {isActive && (
                    <Motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col items-start text-left bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    >
                      <span className="text-white/70 text-sm md:text-base tracking-widest uppercase mb-2 font-semibold">
                        {project.category}
                      </span>
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tighter shadow-black/50 drop-shadow-lg">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-base md:text-xl font-light max-w-lg leading-relaxed shadow-black/50 drop-shadow-md">
                        {project.description}
                      </p>
                    </Motion.div>
                  )}
                </AnimatePresence>

              </Motion.div>
            );
          })}
        </div>

      </div>
    </Motion.section>
  );
}
