import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────
   Contact Page — Premium Minimalist Design
   Focused on typography, white space, and 
   a monochromatic palette.
───────────────────────────────────────── */

const FASTAPI_URL = 'http://localhost:8000';

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

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
        const alpha = 0.05 + depthFactor * 0.2;
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

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/suryapratapsinghbisht61', label: '/suryapratapsinghbisht61' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/surya-pratap-singh-12946a295/', label: '/in/surya-pratap-singh' },
  { name: 'Twitter', url: 'https://x.com/surya_pratap_', label: '@surya_pratap_' },
  { name: 'Email', url: 'mailto:suryapratapsinghbisht61@gmail.com', label: 'Direct Message' },
];

const contactInfo = [
  { label: 'Email', value: 'suryapratapsinghbisht61@gmail.com' },
  { label: 'Location', value: 'India' },
  { label: 'Availability', value: 'Open to Opportunities' },
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
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-white">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-48 pb-12 px-8">
        <div className="max-w-6xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">Initiate Protocol</span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tightest leading-[0.85] mb-12">
              <span className="text-white block">Get in</span>
              <span className="text-white/20 block">Touch</span>
            </h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/40 max-w-xl font-light leading-relaxed tracking-tight"
            >
              Have a project in mind, a partnership inquiry, or a complex 
              technical challenge? Let's engineer a solution together.
            </Motion.p>
          </Motion.div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="py-24 px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-20">
          
          {/* Contact Form — 3 col */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <Motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-xl"
                >
                  <div className="text-white flex justify-center mb-8 opacity-50">
                    <CheckIcon />
                  </div>
                  <h3 className="text-3xl font-medium tracking-tight mb-4 text-white">Transmission Successful</h3>
                  <p className="text-white/30 mb-10 font-light tracking-tight">Your message has been received. I will respond to your inquiry shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-10 py-5 rounded-full border border-white/20 text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-white hover:text-white transition-all"
                  >
                    Send Another message
                  </button>
                </Motion.div>
              ) : (
                <Motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label htmlFor="name" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase block">Identity</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-transparent border-b border-white/10 pt-4 pb-6 text-white font-light placeholder:text-white/5 focus:outline-none focus:border-white transition-all"
                      />
                    </div>
                    <div className="space-y-4">
                      <label htmlFor="email" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase block">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="w-full bg-transparent border-b border-white/10 pt-4 pb-6 text-white font-light placeholder:text-white/5 focus:outline-none focus:border-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="subject" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase block">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Context of inquiry"
                      className="w-full bg-transparent border-b border-white/10 pt-4 pb-6 text-white font-light placeholder:text-white/5 focus:outline-none focus:border-white transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="message" className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase block">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Detailed information regarding your inquiry..."
                      className="w-full bg-transparent border-b border-white/10 pt-4 pb-6 text-white font-light placeholder:text-white/5 focus:outline-none focus:border-white transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <Motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-white/50 text-[10px] font-bold tracking-widest bg-white/[0.05] p-6 rounded-lg"
                    >
                      {errorMsg}
                    </Motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center gap-6 px-12 py-6 rounded-full border border-white/20 text-white/40 font-bold text-[10px] tracking-[0.4em] uppercase hover:border-white hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                  >
                    {status === 'sending' ? (
                      'Transmitting...'
                    ) : (
                      <>
                        <SendIcon />
                        Submit Message
                      </>
                    )}
                  </button>
                </Motion.form>
              )}
            </AnimatePresence>
          </Motion.div>

          {/* Sidebar — 2 col */}
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="lg:col-span-2 space-y-20"
          >
            {/* Contact Details */}
            <div className="space-y-12">
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Contact Information</h3>
              <div className="space-y-10">
                {contactInfo.map((info, i) => (
                  <div key={i} className="group cursor-default">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/10 uppercase block mb-3 group-hover:text-white/20 transition-colors">{info.label}</span>
                    <span className="text-lg font-light text-white/40 group-hover:text-white transition-colors">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-12">
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Connect</h3>
              <div className="space-y-8">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 transition-all group"
                  >
                    <span className="text-sm font-medium text-white/50 group-hover:text-white transition-colors tracking-tight">{link.name}</span>
                    <span className="text-xs font-light text-white/20 group-hover:text-white/40 transition-colors tracking-tight">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="pt-20 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.5em] text-white/10 uppercase">System Active</span>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
