import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────
   About Page — Premium dark‐themed page
   showcasing personal info, timeline,
   tech stack, and philosophy.
   Backend: fetches profile data from FastAPI
───────────────────────────────────────── */

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
  </svg>
);

const timeline = [
  { year: '2024', title: 'Started AI/ML Journey', desc: 'Began exploring machine learning, deep learning, and building intelligent systems.' },
  { year: '2024', title: 'Full Stack Development', desc: 'Built production-ready web applications using React, Django, and PostgreSQL.' },
  { year: '2025', title: 'Agentic AI & LLMs', desc: 'Dived into large language models, fine-tuning, and autonomous AI agent architectures.' },
  { year: '2025', title: 'FastAPI & Microservices', desc: 'Adopted FastAPI for high-performance async APIs and microservice architectures.' },
  { year: '2026', title: 'Building Products', desc: 'Currently working on startup ideas and open-source tools at the intersection of AI and web.' },
];

const techStack = [
  { category: 'Frontend', items: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'Three.js'], color: '#8b5cf6' },
  { category: 'Backend', items: ['FastAPI', 'Django', 'Django REST Framework', 'Node.js'], color: '#06b6d4' },
  { category: 'AI / ML', items: ['Python', 'PyTorch', 'Transformers', 'LangChain', 'ONNX'], color: '#f43f5e' },
  { category: 'DevOps', items: ['Docker', 'GitHub Actions', 'Nginx', 'PostgreSQL', 'Redis'], color: '#10b981' },
];

const values = [
  { emoji: '⚡', title: 'Performance First', desc: 'Every line of code is optimized for speed and efficiency.' },
  { emoji: '🎨', title: 'Design Obsessed', desc: 'Interfaces should feel premium, alive, and delightful to use.' },
  { emoji: '🧠', title: 'AI Native', desc: 'Thinking in AI-first paradigms to build smarter applications.' },
  { emoji: '🔒', title: 'Security Minded', desc: 'Building with security best practices from day one.' },
];

// Separate component for the warp speed effect to keep things clean
const WarpSpeedCanvas = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let stars = [];
    const STAR_COUNT = 400; // Fewer stars for sub-pages to keep them subtler
    const SPEED = 0.5;      
    const MAX_DEPTH = 1500;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const makeStar = (zOverride) => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: zOverride !== undefined ? zOverride : Math.random() * MAX_DEPTH,
    });

    stars = Array.from({ length: STAR_COUNT }, () => makeStar());

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= SPEED;
        if (s.z <= 0) {
          const fresh = makeStar(MAX_DEPTH);
          Object.assign(s, fresh);
        }
        const k = 300 / s.z;
        const sx = cx + s.x * k;
        const sy = cy + s.y * k;
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;
        const depthFactor = 1 - s.z / MAX_DEPTH;
        const radius = 0.5 + depthFactor * 1.2;
        const alpha = 0.05 + depthFactor * 0.4;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
      
      {/* Background Star Field */}
      <div className="fixed inset-0 z-0 bg-black">
        <WarpSpeedCanvas />
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 text-white/70 hover:text-white transition-all group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-400 group-hover:bg-purple-400/5 transition-all">
              <BackIcon />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Home</span>
          </Link>
          <div className="flex items-center gap-8 text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/30 uppercase">
            <Link to="/about" className="text-white hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-5xl mx-auto relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.3em] text-purple-400/80 uppercase">About Me</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8">
              <span className="text-white">Surya Pratap</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-indigo-300 to-purple-400">
                Singh
              </span>
            </h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl font-light leading-relaxed"
            >
              Full-stack developer & AI enthusiast building at the intersection of 
              intelligent systems and beautiful interfaces. I craft production-grade 
              web applications, train ML models, and design autonomous AI agents — 
              all with a relentless focus on performance and premium UX.
            </Motion.p>
          </Motion.div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-white/1">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Core Philosophy</h2>
              <p className="text-white/40 text-lg font-light">The principles that drive my work.</p>
            </div>
            <div className="h-px flex-1 bg-white/5 hidden md:block mb-4 mx-12"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-4">Values / 01</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="p-8 rounded-3xl border border-white/5 bg-white/1 backdrop-blur-md transition-all group cursor-default h-full flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
                   {v.emoji}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{v.title}</h3>
                <p className="text-sm text-white/40 font-light leading-relaxed">{v.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey Timeline ── */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Development Journey</h2>
              <p className="text-white/40 text-lg font-light">My evolution as a developer and engineer.</p>
            </div>
            <div className="h-px flex-1 bg-white/5 hidden md:block mb-4 mx-12"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-4">Milestones / 02</span>
          </div>

          <div className="relative pl-8 md:pl-0">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-purple-500/0 via-purple-500/20 to-purple-500/0 hidden md:block transform -translate-x-1/2" />
            <div className="absolute left-8 md:hidden top-0 bottom-0 w-px bg-linear-to-b from-purple-500/0 via-purple-500/20 to-purple-500/0" />

            <div className="flex flex-col gap-24">
              {timeline.map((item, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 w-full text-left ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-xs font-black tracking-[0.4em] text-purple-400 mb-4 block">{item.year}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors uppercase tracking-tight">{item.title}</h3>
                    <p className={`text-base text-white/40 font-light leading-relaxed max-w-sm ${i % 2 === 0 ? 'md:ml-auto' : 'md:ml-0'}`}>{item.desc}</p>
                  </div>
                  
                  <div className="relative z-10 shrink-0">
                    <div className="w-4 h-4 rounded-full bg-black border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Technical Arsenal</h2>
              <p className="text-white/40 text-lg font-light">The technologies I leverage to build modern solutions.</p>
            </div>
            <div className="h-px flex-1 bg-white/5 hidden md:block mb-4 mx-12"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-4">Stack / 03</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techStack.map((group, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-4xl border border-white/5 bg-white/1 backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-all shadow-2xl"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: group.color }} />
                
                <h3 className="text-xs font-black tracking-[0.3em] uppercase mb-10 pl-4" style={{ color: group.color }}>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-3 pl-4">
                  {group.items.map((item, j) => (
                    <span 
                      key={j}
                      className="px-5 py-2.5 rounded-full text-xs font-bold border transition-all hover:scale-105 active:scale-95"
                      style={{ 
                        borderColor: `${group.color}20`, 
                        color: `${group.color}cc`,
                        backgroundColor: `${group.color}05`
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fun Facts ── */}
      <section className="py-32 px-6 relative z-10 bg-white/1">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '500+', label: 'Commits', icon: '📦' },
              { value: '15+', label: 'Projects', icon: '🚀' },
              { value: '∞', label: 'Curiosity', icon: '🧠' },
              { value: '☕', label: 'Fuel', icon: '☕' },
            ].map((stat, i) => (
              <Motion.div
                key={i}
                whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="p-10 rounded-[2.5rem] border border-white/5 bg-white/1 text-center transition-all cursor-default flex flex-col items-center justify-center backdrop-blur-xl"
              >
                <span className="text-4xl mb-6">{stat.icon}</span>
                <span className="text-5xl md:text-6xl font-black tracking-tighter text-white block mb-2">{stat.value}</span>
                <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase block">{stat.label}</span>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use shared footer for consistency */}
      <Footer />
    </div>
  );
}
