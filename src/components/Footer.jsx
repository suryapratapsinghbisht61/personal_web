import { motion as Motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-black text-white relative font-sans pt-24 pb-8 border-t border-white/5 mx-auto">
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center py-24 w-full">
        
        <Motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm font-semibold tracking-widest text-neutral-400 uppercase mb-8"
        >
          Have an idea?
        </Motion.p>

        <Motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
        >
          Let's Talk
        </Motion.h2>

        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center relative"
        >
          <a href="mailto:suryapratapsinghbisht61@gmail.com" className="group">
            <span className="text-2xl sm:text-3xl font-serif italic text-white hover:text-white/80 transition-colors">
              suryapratapsinghbisht61@gmail.com
            </span>
            
            {/* The line below with integrated circle */}
            <div className="relative mt-4 w-64 h-px bg-white/20 group-hover:bg-white/40 transition-colors mx-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center group-hover:border-white/40 transition-colors">
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          </a>
        </Motion.div>

      </div>

      {/* Bottom Legal / Links Container */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 mt-24">
        
        {/* Subtle separator */}
        <div className="w-full h-px bg-white/5 mb-8"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] sm:text-xs font-bold tracking-widest text-neutral-400 uppercase">
          
          {/* Social Links on Left */}
          <div className="flex items-center gap-6 sm:gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>

          <div className="flex items-center gap-8 text-neutral-500">
            {/* Copyright */}
            <span className="normal-case font-normal text-xs text-neutral-600 tracking-normal">
              &copy; {new Date().getFullYear()} Surya Pratap Singh. All rights reserved.
            </span>

            {/* Back to Top */}
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition-colors uppercase font-bold text-neutral-400"
            >
              Back to Top &uarr;
            </button>
          </div>
          
        </div>
      </div>

    </footer>
  );
};

export default Footer;
