import React, { useRef, useState, useEffect } from 'react';
import { motion as Motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ANGLE_PER_STEP = 35; // Keep the rotation tight 

const cards = [
  { id: 1, type: "intro", bg: "bg-[#dbceb6]" },
  { id: 2, type: "pixel", bg: "bg-[#547055]" },
  { id: 3, type: "design", bg: "bg-[#fce181]" },
  { id: 4, type: "gallery", bg: "bg-[#1d1d1d]" },
  { id: 5, type: "end", bg: "bg-[#f4f4f4]" },
];

const TOTAL_CARDS = cards.length;
const MAX_ANGLE = (TOTAL_CARDS - 1) * ANGLE_PER_STEP;

// Custom hook to handle perfectly responsive sizing
const useResponsiveSettings = () => {
  const [settings, setSettings] = useState({
    radius: 1100,           // Desktop radius
    heightPerStep: 200,     // Desktop overlap gap
    cardWidth: "600px",     // Handled via CSS clamp but defined tight limits
    cardHeight: "700px"     
  });

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile layout
        setSettings({
          radius: 350,
          heightPerStep: 140,
          cardWidth: "280px",
          cardHeight: "380px"
        });
      } else if (width < 1024) {
        // Tablet layout
        setSettings({
          radius: 700,
          heightPerStep: 170,
          cardWidth: "360px",
          cardHeight: "480px"
        });
      } else {
        // Desktop / Large screen layout
        setSettings({
          radius: 1100,
          heightPerStep: 200,
          cardWidth: "clamp(320px, 45vw, 600px)",
          cardHeight: "clamp(420px, 60vh, 700px)"
        });
      }
    };
    
    // Init and listeners
    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  return settings;
};

const StarIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const StepCard = ({ card, index, smoothProgress, settings }) => {
  const target = index / (TOTAL_CARDS - 1);
  const dist = 1.2 / (TOTAL_CARDS - 1); 

  // Dynamic visual highlighting
  const opacity = useTransform(smoothProgress, [target - dist, target, target + dist], [0.15, 1, 0.15]);
  const scale = useTransform(smoothProgress, [target - dist, target, target + dist], [0.85, 1, 0.85]);
  const filter = useTransform(smoothProgress, [target - dist, target, target + dist], ["blur(8px)", "blur(0px)", "blur(8px)"]);

  // We feed responsive settings into the transform string dynamically
  const transform = useTransform(
    scale, 
    s => `rotateY(${-index * ANGLE_PER_STEP}deg) translateZ(${settings.radius}px) translateY(${index * settings.heightPerStep}px) scale(${s})`
  );

  return (
    <Motion.div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${card.bg}`}
      style={{
        width: settings.cardWidth,
        height: settings.cardHeight,
        transform,
        opacity,
        filter,
        backfaceVisibility: "hidden" 
      }}
    >
      {card.type === "intro" && (
         <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between">
            <h3 className="text-[#4a3b2b] text-4xl sm:text-5xl md:text-7xl font-sans font-medium tracking-tight mt-4">
              Brewing
            </h3>
            <div className="flex flex-col gap-4 sm:gap-6">
              <p className="text-[#68533d] text-xl sm:text-2xl md:text-4xl font-bold font-serif leading-snug">
                The sleepless tale of a coffee bean.
              </p>
              <button className="self-start px-6 sm:px-8 py-3 bg-[#6e533b] text-white rounded-full font-bold shadow-xl hover:bg-[#523d2b] transition-transform hover:scale-105 active:scale-95 text-xs sm:text-base">
                Create
              </button>
            </div>
         </div>
      )}

      {card.type === "pixel" && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="grid grid-cols-11 grid-rows-11 gap-[2px] w-[60%] h-[60%] opacity-90">
              {Array.from({length: 121}).map((_, i) => {
                 const x = i % 11;
                 const y = Math.floor(i / 11);
                 const facePixels = [
                    [1,3],[1,4],[1,5],                 [1,7],[1,8],[1,9],
                    [2,4],
                    [3,4],                             [3,9],
                    [4,4],                             [4,9],
                    [5,4],                             [5,9],
                    [6,4],                             [6,9],
                    [7,4],
                    [8,4],[8,5],[8,6],
                                                         [9,8],
                               [10,6],[10,7],[10,8]
                 ];
                 const isFilled = facePixels.some(([fy, fx]) => fy === y && fx === x);
                 return (
                   <div key={i} className={`w-full h-full rounded-sm ${isFilled ? "bg-[#dbceb6]" : "bg-transparent"}`} />
                 );
              })}
           </div>
        </div>
      )}

      {card.type === "design" && (
         <div className="relative w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-1 z-10 font-black text-5xl sm:text-6xl md:text-7xl font-sans tracking-tight text-[#1a1a1a]">
               {["D","E","S","I","G","N"].map((letter, i) => (
                  <div key={i} className={i === 0 ? "bg-[#1a1a1a] text-[#fce181] rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mb-2" : "flex items-center justify-center"}>
                     {letter}
                  </div>
               ))}
            </div>
            <div className="absolute top-[20%] left-[20%] text-[#ff74b1] w-8 h-8 sm:w-12 sm:h-12 -rotate-12 animate-pulse"><StarIcon /></div>
            <div className="absolute top-[35%] right-[25%] text-[#6e7bff] w-12 h-12 sm:w-16 sm:h-16 rotate-45"><StarIcon /></div>
            <div className="absolute bottom-[25%] right-[30%] text-[#38c973] w-10 h-10 sm:w-14 sm:h-14 rotate-12"><StarIcon /></div>
         </div>
      )}

      {card.type === "gallery" && (
         <div className="absolute inset-0 p-6 sm:p-8 flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="w-full md:w-[45%] h-[40%] md:h-[80%] bg-[#333] rounded-2xl flex flex-col items-center p-4 sm:p-6 justify-between border border-white/5 relative overflow-hidden group">
               <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center">
                 <span className="text-xl sm:text-2xl text-white">☺︎</span>
               </div>
               <div className="w-full h-16 sm:h-32 bg-gradient-to-t from-[#222] to-transparent rounded-lg border border-white/10" />
               <h4 className="text-white/50 font-bold uppercase tracking-widest absolute bottom-4 sm:bottom-6 text-xs sm:text-base">Gallery</h4>
            </div>
            <div className="w-full md:w-[45%] h-[50%] md:h-[80%] flex flex-col gap-3 sm:gap-4">
               <div className="flex-1 flex gap-3 sm:gap-4">
                 <div className="flex-1 bg-[#222] rounded-xl flex items-center justify-center shadow-inner hover:bg-[#2a2a2a] transition-colors"><span className="text-2xl sm:text-3xl grayscale">✈️</span></div>
                 <div className="flex-1 bg-white rounded-xl flex items-center justify-center text-3xl sm:text-4xl font-black text-black">A|S</div>
               </div>
               <div className="flex-[1.5] bg-[#1a1a1a] rounded-xl border border-white/10 flex items-center justify-center">
                 <div className="w-1/2 h-4/5 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded shadow-2xl" />
               </div>
               <div className="flex-[0.8] bg-[#2d2d2d] rounded-xl flex items-center justify-center">
                  <span className="text-xl sm:text-2xl opacity-40">● ● ●</span>
               </div>
            </div>
         </div>
      )}

      {card.type === "end" && (
         <div className="absolute inset-0 flex items-center justify-center flex-col text-[#111] p-8 sm:p-12 text-center">
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6 leading-tight">
               Build something<br/>memorable.
            </h3>
            <p className="text-neutral-500 font-medium text-sm sm:text-lg max-w-sm mx-auto mb-8 sm:mb-12">
               Let's collaborate to bring beautiful ideas seamlessly into life.
            </p>
            <button className="px-6 sm:px-10 py-3 sm:py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm shadow-xl hover:-translate-y-1 transition-transform">
               Start a Project
            </button>
         </div>
      )}
    </Motion.div>
  );
};

const BackgroundGrid = () => (
  <div className="absolute inset-0 flex justify-between px-6 md:px-24 pointer-events-none z-0">
    {[...Array(6)].map((_, i) => (
       <div key={i} className="w-[1px] h-full bg-white/[0.04]" />
    ))}
  </div>
);

const Playground = () => {
  const containerRef = useRef(null);
  const settings = useResponsiveSettings();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  // Calculate dynamic maximum bounds based on responsive window settings
  const MAX_Y_TRANS = (TOTAL_CARDS - 1) * settings.heightPerStep;

  const containerRotateY = useTransform(smoothProgress, [0, 1], [0, MAX_ANGLE]);
  const containerTranslateY = useTransform(smoothProgress, [0, 1], [0, -MAX_Y_TRANS]);

  return (
    <section ref={containerRef} className="h-[400vh] bg-[#0c0c0c] relative w-full font-sans">
      <BackgroundGrid />
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#0c0c0c]">
        
        <div className="absolute top-0 w-full h-24 sm:h-40 bg-gradient-to-b from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 w-full h-24 sm:h-40 bg-gradient-to-t from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
        
        <div 
          className="relative w-full h-full flex items-center justify-center" 
          style={{ perspective: "1500px", perspectiveOrigin: "50% 50%" }}
        >
          {/* Vertical center pole representing the spine of the staircase */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 sm:w-2 h-[90vh] sm:h-[80vh] bg-white/10 rounded-full z-0" 
            style={{ 
              transform: "translateZ(0)",
              boxShadow: "0 0 30px rgba(255,255,255,0.05)"
            }}
          />

          <Motion.div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ 
              transformStyle: "preserve-3d",
              rotateY: containerRotateY,
              y: containerTranslateY,
              // Move the camera naturally depending on screen size loop
              z: -settings.radius + (window.innerWidth < 640 ? 50 : 100) 
            }}
          >
            {cards.map((card, i) => (
              <StepCard 
                key={card.id} 
                card={card} 
                index={i}
                smoothProgress={smoothProgress}
                settings={settings}
              />
            ))}
          </Motion.div>
        </div>

      </div>
    </section>
  );
};

export default Playground;
