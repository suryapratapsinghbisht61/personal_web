import { useEffect } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';

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

// Scroll Scrubbed Text Reveal Component
const ScrollScrubHeading = ({ text }) => {
  const { scrollY } = useScroll();
  const chars = text.split('');

  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 flex justify-center flex-wrap">
      {chars.map((char, index) => {
        // Map scroll range for each character to create a sequential reveal
        // Adjust these values to control scrub speed
        const start = index * 20; 
        const end = start + 100;
        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollY, [start, end], [0.1, 1]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(scrollY, [start, end], [30, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const filterBlur = useTransform(scrollY, [start, end], [12, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const filter = useTransform(filterBlur, (v) => `blur(${v}px)`);

        return (
          <Motion.span 
            key={index}
            style={{ opacity, y, filter }}
            className={char === ' ' ? 'w-4 md:w-8' : 'inline-block'}
          >
            {char}
          </Motion.span>
        );
      })}
    </h1>
  );
};

function App() {
  const { scrollY } = useScroll();
  
  // Overall hero section fade out happens later, after heading reveals text
  const heroOpacity = useTransform(scrollY, [500, 800], [1, 0]);
  const heroY = useTransform(scrollY, [500, 800], [0, -80]);

  return (
    <div className="min-h-[250vh] bg-black text-white selection:bg-purple-500/30 font-sans">
      
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

      {/* Hero Content container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        
        <Motion.main 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex flex-col items-center justify-center w-full"
        >
          <Motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center max-w-4xl w-full"
          >
            {/* Scroll-scrubbed Heading */}
            <ScrollScrubHeading text="Surya Pratap Singh" />

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
    </div>
  );
}

export default App;;

