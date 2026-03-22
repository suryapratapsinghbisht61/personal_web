import { useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';

// SVG Icons
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7.1a5.8 5.8 0 0 0-1.6-4.03 5.4 5.4 0 0 0-.15-4.01s-1.3-.4-4.2 1.6a14.8 14.8 0 0 0-8 0c-2.9-2-4.2-1.6-4.2-1.6a5.4 5.4 0 0 0-.15 4.01 5.8 5.8 0 0 0-1.6 4.03c0 5.7 3.36 6.75 6.5 7.1a4.8 4.8 0 0 0-1 3.02v4"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
    <path d="M12 5v14"></path>
    <path d="m19 12-7 7-7-7"></path>
  </svg>
);

// Cursor Trail Component
const CursorTrail = () => {
  useEffect(() => {
    const container = document.getElementById('cursor-trail-container');
    if (!container) return;

    let timeoutIds = [];

    const handleMouseMove = (e) => {
      const dot = document.createElement('div');
      dot.className = 'absolute w-2 h-2 bg-purple-400 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.opacity = '0.3';
      dot.style.transform = 'scale(1)';
      dot.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      
      container.appendChild(dot);

      // Trigger animation next frame
      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0.2)';
      });

      // Remove after transition
      const timeoutId = setTimeout(() => {
        if (container.contains(dot)) {
          container.removeChild(dot);
        }
      }, 800);

      timeoutIds.push(timeoutId);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return <div id="cursor-trail-container" className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />;
};

// Simple static heading component instead of scroll scrub
const StaticHeading = ({ text }) => {
  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 flex justify-center flex-wrap gap-x-2 md:gap-x-4">
      {text.split(' ').map((word, i) => (
        <span key={i}>{word}</span>
      ))}
    </h1>
  );
};

// Infinite Horizontal Marquee
const InfiniteMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden flex items-center bg-transparent py-4 border-y border-white/5 z-20">
      <Motion.div 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        className="flex whitespace-nowrap gap-12 text-2xl md:text-3xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] uppercase tracking-widest w-fit"
      >
        <span>FULL STACK DEVELOPER</span>
        <span>•</span>
        <span>AI/ML ENTHUSIAST</span>
        <span>•</span>
        <span>AGENTIC AI</span>
        <span>•</span>
        <span>CREATIVE ENGINEER</span>
        <span>•</span>
        <span>REACT & DJANGO</span>
        <span>•</span>
        <span>FULL STACK DEVELOPER</span>
        <span>•</span>
        <span>AI/ML ENTHUSIAST</span>
        <span>•</span>
        <span>AGENTIC AI</span>
        <span>•</span>
        <span>CREATIVE ENGINEER</span>
        <span>•</span>
        <span>REACT & DJANGO</span>
        <span>•</span>
      </Motion.div>
    </div>
  );
};

function App() {
  // We no longer need the global hero opacity scroll transform

  return (
    <div className="bg-black text-white selection:bg-purple-500/30 font-sans">
      
      <CursorTrail />

      {/* Background Effect: Subtle purple gradient blob */}
      <Motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px]" />
      </Motion.div>

      {/* Hero Content Area - Removed h-[250vh] and sticky logic to stop the black gap */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
          
          <Motion.main 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center w-full"
        >
          <Motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center max-w-4xl w-full"
          >
            {/* Static Heading */}
            <StaticHeading text="Surya Pratap Singh" />

            {/* Subheading */}
            <Motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-light tracking-wide mb-12"
            >
              BCA AI/ML Student <span className="text-neutral-600 mx-2">|</span> Building AI Systems & Future Tech
            </Motion.p>

            {/* Buttons */}
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Motion.a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.15)", backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-medium transition-colors flex items-center gap-3 backdrop-blur-md"
              >
                <GithubIcon />
                <span>GitHub</span>
              </Motion.a>
              <Motion.a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.15)", backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-medium transition-colors flex items-center gap-3 backdrop-blur-md"
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
              </Motion.a>
            </Motion.div>
          </Motion.div>

          {/* Scroll Indicator */}
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="absolute -bottom-24 flex flex-col items-center gap-3"
          >
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Scroll to Reveal</div>
            <Motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500/50 to-transparent mb-2" />
              <ArrowDownIcon />
            </Motion.div>
          </Motion.div>
        </Motion.main>

      </div>
      
      {/* Infinite Horizontal Marquee */}
      <InfiniteMarquee />

      <Skills />
      
      <Portfolio />
    </div>
  );
}

export default App;

