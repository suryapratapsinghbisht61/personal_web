import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-purple-400/50 group-hover:bg-purple-400/10 transition-all">
              <BackIcon />
            </div>
            <span className="text-sm font-medium tracking-wide">Home</span>
          </Link>
          <div className="flex items-center gap-8 text-xs font-semibold tracking-widest text-white/40 uppercase">
            <Link to="/about" className="text-white">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 px-6">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-400">
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
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            What I Believe In
          </Motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.04)' }}
                className="p-7 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all cursor-default"
              >
                <span className="text-3xl mb-4 block">{v.emoji}</span>
                <h3 className="text-lg font-bold mb-2 text-white/90">{v.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey Timeline ── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            My Journey
          </Motion.h2>
          <Motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-base mb-14 max-w-lg"
          >
            Key milestones that shaped my path as a developer
          </Motion.p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/40 via-white/10 to-transparent" />

            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                  className="flex gap-6 items-start group"
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#0a0a0a] border-2 border-purple-400/60 group-hover:border-purple-400 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all mt-1.5 relative z-10" />
                  </div>
                  
                  <div className="flex-1 pb-2">
                    <span className="text-xs font-bold tracking-[0.2em] text-purple-400/70 uppercase mb-1 block">{item.year}</span>
                    <h3 className="text-lg md:text-xl font-bold text-white/90 mb-1">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Tech Stack
          </Motion.h2>
          <Motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-base mb-14 max-w-lg"
          >
            Tools and technologies I use daily
          </Motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {techStack.map((group, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: group.color }} />
                
                <h3 className="text-sm font-bold tracking-[0.15em] uppercase mb-4 pl-3" style={{ color: group.color }}>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2 pl-3">
                  {group.items.map((item, j) => (
                    <span 
                      key={j}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors hover:bg-white/5"
                      style={{ borderColor: `${group.color}30`, color: `${group.color}cc` }}
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
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: '500+', label: 'Commits', icon: '📦' },
              { value: '15+', label: 'Projects', icon: '🚀' },
              { value: '∞', label: 'Curiosity', icon: '🧠' },
              { value: '☕', label: 'Fuel', icon: '☕' },
            ].map((stat, i) => (
              <Motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center transition-all cursor-default"
              >
                <span className="text-2xl block mb-2">{stat.icon}</span>
                <span className="text-3xl md:text-4xl font-black tracking-tighter text-white block">{stat.value}</span>
                <span className="text-xs font-semibold tracking-widest text-white/30 uppercase mt-1 block">{stat.label}</span>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Let's build something together
          </h3>
          <p className="text-white/40 text-lg mb-10 font-light">
            Got a project idea? I'd love to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg shadow-purple-500/20"
            >
              Get in Touch →
            </Link>
            <Link
              to="/"
              className="px-8 py-4 rounded-full border border-white/20 text-white/70 font-bold text-sm tracking-wider uppercase hover:border-white/40 hover:text-white transition-all hover:-translate-y-1"
            >
              Back to Home
            </Link>
          </div>
        </Motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-xs text-white/20 font-medium tracking-wider">
          © {new Date().getFullYear()} Surya Pratap Singh · All rights reserved.
        </p>
      </footer>
    </div>
  );
}
