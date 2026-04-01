import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────
   Contact Page — Premium dark-themed
   contact form that submits to FastAPI backend.
   Backend endpoint: POST /api/contact
───────────────────────────────────────── */

const FASTAPI_URL = 'http://localhost:8000';

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// Separate component for the warp speed effect to keep things clean
const WarpSpeedCanvas = () => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let stars = [];
    const STAR_COUNT = 400;
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
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" style={{ zIndex: 0 }} aria-hidden="true" />
  );
};

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/suryapratapsinghbisht61', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/surya-pratap-singh-12946a295/', icon: '💼' },
  { name: 'Twitter', url: 'https://x.com/surya_pratap_', icon: '🐦' },
  { name: 'Email', url: 'mailto:suryapratapsinghbisht61@gmail.com', icon: '✉️' },
];

const contactInfo = [
  { label: 'Email', value: 'suryapratapsinghbisht61@gmail.com', icon: '📧' },
  { label: 'Location', value: 'India', icon: '📍' },
  { label: 'Availability', value: 'Open to opportunities', icon: '🟢' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); 
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(`${FASTAPI_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Something went wrong');
      }
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* Background Star Field */}
      <div className="fixed inset-0 z-0 bg-black">
        <WarpSpeedCanvas />
        <div className="absolute top-1/3 right-1/3 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 text-white/70 hover:text-white transition-all group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/5 transition-all">
              <BackIcon />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Home</span>
          </Link>
          <div className="flex items-center gap-8 text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/30 uppercase">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-white hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-48 pb-12 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-cyan-400" />
              <span className="text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase">Connect</span>
            </Motion.div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-12 relative overflow-hidden">
               <div 
                 className="text-transparent z-0 opacity-20"
                 style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
               >
                 GET IN TOUCH
               </div>
               <Motion.div 
                 initial={{ clipPath: "inset(0 100% 0 0)" }}
                 animate={{ clipPath: "inset(0 0% 0 0)" }}
                 transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                 className="absolute inset-0 z-10 flex items-start justify-start select-none text-white whitespace-nowrap"
               >
                 GET IN TOUCH
               </Motion.div>
            </h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl text-white/50 max-w-xl font-light leading-relaxed tracking-tight"
            >
              Have a project in mind, a question, or just want to say hello? 
              Let's start a conversation.
            </Motion.p>
          </Motion.div>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="pb-12 px-6 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {contactInfo.map((info, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/2 backdrop-blur-sm">
                <span className="text-xl mb-2 block">{info.icon}</span>
                <span className="text-xs font-bold tracking-widest text-white/30 uppercase block mb-1">{info.label}</span>
                <span className="text-sm text-white/70 font-medium">{info.value}</span>
              </div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="pb-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Form — 3 col */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <Motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-16 text-center backdrop-blur-xl"
                >
                  <div className="text-emerald-400 flex justify-center mb-8">
                    <CheckIcon />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter mb-4 text-white">Message Inbound</h3>
                  <p className="text-white/50 mb-10 font-light">Thank you for reaching out. I'll get back to you across the wire very soon.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-10 py-5 rounded-full border border-white/10 text-white/70 text-xs font-black tracking-widest uppercase hover:border-white/40 hover:text-white transition-all shadow-xl"
                  >
                    Send Another →
                  </button>
                </Motion.div>
              ) : (
                <Motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-white/5 bg-white/1 backdrop-blur-2xl p-10 md:p-14 space-y-10 shadow-2xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label htmlFor="name" className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase ml-2 block">Ident Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:bg-white/6 transition-all"
                      />
                    </div>
                    <div className="space-y-4">
                      <label htmlFor="email" className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase ml-2 block">Mail Endpoint</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:bg-white/6 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="subject" className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase ml-2 block">Core Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:bg-white/6 transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="message" className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase ml-2 block">Encrypted Payload</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, idea, or question..."
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:bg-white/6 transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <Motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-300 text-xs font-medium"
                    >
                      {errorMsg}
                    </Motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-black text-xs tracking-widest uppercase hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <SendIcon />
                        Transmit Message
                      </>
                    )}
                  </button>
                </Motion.form>
              )}
            </AnimatePresence>
          </Motion.div>

          {/* Sidebar — 2 col */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Social Links */}
            <div className="rounded-[2.5rem] border border-white/5 bg-white/1 p-10 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-8 ml-2">Connect Hub</h3>
              <div className="space-y-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-sm font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">{link.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-white/5 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* API Status */}
            <div className="rounded-[2.5rem] border border-white/5 bg-white/1 p-10 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-6 ml-2">Internal Status</h3>
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <div>
                  <span className="text-xs font-black text-white/80 block uppercase tracking-tighter">FastAPI Cluster</span>
                  <span className="text-[10px] text-white/20 font-mono tracking-tight">NODE.JS / REACT / VITE</span>
                </div>
              </div>
              <p className="text-[11px] text-white/20 mt-6 leading-relaxed font-light ml-2">
                The transmission protocol leverages an asynchronous FastAPI cluster. 
                System online and ready for input payloads.
              </p>
            </div>
          </Motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
