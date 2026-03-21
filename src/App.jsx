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

function App() {
  const { scrollY } = useScroll();
  
  // Transform values for scroll effect
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="min-h-[200vh] bg-black text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      
      {/* Background Effect: Subtle purple gradient blob */}
      <Motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px]" />
      </Motion.div>

      {/* Hero Content */}
      <Motion.main 
        style={{ opacity, y }}
        className="relative z-10 h-screen w-full flex flex-col items-center justify-center px-6"
      >
        <Motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center text-center max-w-4xl"
        >
          {/* Heading */}
          <Motion.h1 
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6"
          >
            Surya Pratap Singh
          </Motion.h1>

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
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Scroll</div>
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
  );
}

export default App;

