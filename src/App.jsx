import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Playground from './components/Playground';
import Footer from './components/Footer';

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

// Cursor Trail Component - Optimized with zero React re-renders
const CursorTrail = () => {
  useEffect(() => {
    let animationFrameId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    
    // Performance: avoiding React state allows us to track mouse position smoothly without VDOM diffing overhead
    const cursor = document.getElementById("optimized-cursor");
    if (!cursor) return;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateCursor = () => {
      // Smooth scaling interpolation (LERP)
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      
      // Hardware accelerated transform
      cursor.style.transform = `translate3d(${currentX - 8}px, ${currentY - 8}px, 0)`;
      
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    // Start loop
    updateCursor();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      id="optimized-cursor" 
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-purple-400 pointer-events-none z-50 opacity-70 transition-opacity duration-300"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
};

// Hero Grid background
const HeroGrid = () => (
  <div className="absolute inset-0 z-0 flex pointer-events-none w-full h-full">
    {Array.from({ length: 14 }).map((_, i) => (
      <div key={i} className={`flex-1 border-r border-white/[0.04] h-full ${i === 0 ? 'border-l' : ''}`} />
    ))}
  </div>
);

// Ultra-premium stacked wipe text reveal
const UltraHeroHeading = () => {
  return (
    <Motion.div 
      initial={{ scale: 0.92 }}
      animate={{ scale: 1.04 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="relative flex items-center justify-center font-black uppercase tracking-[0.05em] sm:tracking-[0.1em] mb-6 w-full text-center"
      style={{ fontSize: "clamp(42px, 12vw, 110px)", fontWeight: 900, lineHeight: "1.1" }}
    >
      {/* Bottom Layer: Hollow Outline (In regular document flow so container resizes if it stacks logically on mobile) */}
      <div 
        className="text-transparent px-4 whitespace-normal sm:whitespace-nowrap z-0"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
      >
        SURYA PRATAP
      </div>
      
      {/* Top Layer: Fill Wipe (Overlaps perfectly as absolute overlay) */}
      <Motion.div 
        initial={{ clipPath: "inset(0 100% 0 0)", color: "#666666" }}
        animate={{ clipPath: "inset(0 0% 0 0)", color: "#ffffff" }}
        transition={{ 
          clipPath: { duration: 1, delay: 0.9, ease: [0.76, 0, 0.24, 1] },
          color: { duration: 1, delay: 1.9, ease: "easeOut" }
        }}
        className="absolute inset-0 z-10 flex items-center justify-center select-none px-4 whitespace-normal sm:whitespace-nowrap pointer-events-none"
      >
        SURYA PRATAP
      </Motion.div>
    </Motion.div>
  );
};

// Animated subtitle with typewriter effect
const AnimatedSubtitle = ({ texts, delay = 0.8 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentText = texts[currentIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        // Pause at end of typing
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === '') {
        // Move to next text
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        // Type or delete character
        setDisplayText(
          isDeleting
            ? currentText.substring(0, displayText.length - 1)
            : currentText.substring(0, displayText.length + 1)
        );
        setTypingSpeed(isDeleting ? 50 : 100);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed]);

  return (
    <Motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-light tracking-wide mb-12"
    >
      <span className="inline-block">
        {displayText}
        <span className="inline-block w-2 h-6 ml-1 bg-purple-400 animate-pulse" />
      </span>
    </Motion.p>
  );
};

// Infinite Horizontal Marquee
const InfiniteMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden flex items-center bg-transparent py-4 border-y border-white/5 z-20">
      <Motion.div 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        style={{ willChange: "transform" }}
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
// Navbar
const Navbar = () => (
  <nav className="absolute top-6 sm:top-10 left-0 w-full flex justify-center z-50 px-4">
    <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14 text-[10px] sm:text-xs md:text-sm font-medium tracking-widest text-[#999999]">
      <div className="relative text-white cursor-pointer hover:text-white transition-colors">
        HOME
      </div>
      <div className="hover:text-white transition-colors cursor-pointer">WORK</div>
      <div className="hover:text-white transition-colors cursor-pointer">ABOUT</div>
      <div className="hover:text-white transition-colors cursor-pointer">CONTACT</div>
    </div>
  </nav>
);

function App() {
  // We no longer need the global hero opacity scroll transform

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-purple-500/30 font-sans">
      
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
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          <HeroGrid />
          <Navbar />

          <Motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6"
        >
          {/* Absolutely Centered Hero Name wrapper */}
          <div className="flex flex-col items-center justify-center w-full max-w-[1400px]">
            <UltraHeroHeading />
          </div>

          {/* Absolute Scroll Indicator */}
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="absolute bottom-12 flex flex-col items-center gap-3"
          >
            <Motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mb-2" />
              <ArrowDownIcon />
            </Motion.div>
          </Motion.div>
        </Motion.main>

      </div>
      
      {/* Infinite Horizontal Marquee */}
      <InfiniteMarquee />

      <Skills />
      
      <Portfolio />
      
      <Playground />

      <Footer />
    </div>
  );
}

export default App;
