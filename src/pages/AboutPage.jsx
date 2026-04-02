import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────
   About Page — Premium Minimalist Design
   Focused on typography, white space, and 
   a monochromatic palette.
───────────────────────────────────────── */

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
  </svg>
);

const timeline = [
  { year: '2024', title: 'Started AI/ML Journey', desc: 'Exploration of neural networks, advanced mathematics, and building foundational intelligent systems.' },
  { year: '2024', title: 'Full Stack Development', desc: 'Engineering robust, production-ready web architectures with modern frameworks and databases.' },
  { year: '2025', title: 'Agentic AI & LLMs', desc: 'Specializing in autonomous agent architectures, multi-agent systems, and LLM fine-tuning.' },
  { year: '2025', title: 'Scalable Systems', desc: 'Architecting high-performance asynchronous APIs and microservice-based infrastructure.' },
  { year: '2026', title: 'Product Innovation', desc: 'Currently pioneering new products at the intersection of generative AI and human-centric design.' },
];

const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Framer Motion', 'Tailwind CSS', 'Three.js'] },
  { category: 'Backend', items: ['FastAPI', 'Python', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'] },
  { category: 'Intelligence', items: ['PyTorch', 'Transformers', 'LangChain', 'OpenAI SDK', 'ONNX Runtime'] },
  { category: 'Infrastructure', items: ['GitHub Actions', 'Nginx', 'AWS', 'Linux', 'Vercel'] },
];

const values = [
  { title: 'Performance', desc: 'Optimizing for speed at every layer of the stack.' },
  { title: 'Precision', desc: 'Meticulous attention to detail in both logic and visual design.' },
  { title: 'Intelligence', desc: 'Leveraging AI-first paradigms to solve complex problems.' },
  { title: 'Scalability', desc: 'Building systems that grow seamlessly with user needs.' },
];

const WarpSpeedCanvas = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let stars = [];
    const STAR_COUNT = 300; 
    const SPEED = 0.2;      
    const MAX_DEPTH = 2000;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const makeStar = (zOverride) => ({
      x: (Math.random() - 0.5) * 2500,
      y: (Math.random() - 0.5) * 2500,
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
        const k = 400 / s.z;
        const sx = cx + s.x * k;
        const sy = cy + s.y * k;
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;
        const depthFactor = 1 - s.z / MAX_DEPTH;
        const radius = 0.4 + depthFactor * 0.8;
        const alpha = 0.05 + depthFactor * 0.25;
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden relative">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 bg-black">
        <WarpSpeedCanvas />
        <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white/50 hover:text-white transition-all group">
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white/5 transition-all">
              <BackIcon />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Back</span>
          </Link>
          <div className="flex items-center gap-10 text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
            <Link to="/about" className="text-white">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-48 pb-32 px-8">
        <div className="max-w-5xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">Architecture of a Builder</span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tightest leading-[0.85] mb-12">
              <span className="text-white block">Surya Pratap</span>
              <span className="text-white/20 block">Singh Bisht</span>
            </h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/40 max-w-2xl font-light leading-relaxed tracking-tight"
            >
              Engineering the next generation of intelligent systems. 
              Currently focused on the convergence of large language models 
              and autonomous agents to build software that thinks.
            </Motion.p>
          </Motion.div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-40 px-8 relative z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Philosophy</h2>
              <p className="text-white/30 text-lg font-light tracking-tight">Fundamental principles of engineering.</p>
            </div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/10 uppercase mb-4">Section / 01</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="p-10 rounded-2xl border border-white/5 bg-white/[0.02] transition-all hover:bg-white/[0.04] group cursor-default"
              >
                <div className="text-[10px] font-black tracking-widest text-white/20 mb-10 group-hover:text-white/40 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-medium mb-4 text-white uppercase tracking-wider">{v.title}</h3>
                <p className="text-sm text-white/30 font-light leading-relaxed tracking-wide">{v.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey ── */}
      <section className="py-40 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Timeline</h2>
              <p className="text-white/30 text-lg font-light tracking-tight">The progression of technical mastery.</p>
            </div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/10 uppercase mb-4">Section / 02</span>
          </div>

          <div className="space-y-32">
            {timeline.map((item, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row items-start gap-12"
              >
                <span className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase pt-2 w-20">
                  {item.year}
                </span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-4xl font-medium text-white mb-6 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/30 font-light leading-relaxed max-w-2xl tracking-tight">
                    {item.desc}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Stack ── */}
      <section className="py-40 px-8 relative z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Stack</h2>
              <p className="text-white/30 text-lg font-light tracking-tight">Modern tools for complex problems.</p>
            </div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/10 uppercase mb-4">Section / 03</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {techStack.map((group, i) => (
              <div key={i} className="bg-black p-10 h-full">
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-10 text-white/40">
                  {group.category}
                </h3>
                <ul className="space-y-4">
                  {group.items.map((item, j) => (
                    <li key={j} className="text-sm font-light text-white/60 hover:text-white transition-colors cursor-default">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="py-40 px-8 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { value: '500+', label: 'COMMITS' },
              { value: '15+', label: 'PROJECTS' },
              { value: 'LLM', label: 'EXPERTISE' },
              { value: '24/7', label: 'OPTIMIZATION' },
            ].map((stat, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-2"
              >
                <span className="text-4xl md:text-5xl font-medium tracking-tighter text-white">{stat.value}</span>
                <span className="text-[10px] font-bold tracking-[0.5em] text-white/10 uppercase">{stat.label}</span>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
