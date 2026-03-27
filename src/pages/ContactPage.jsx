import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
  { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  { name: 'Email', url: 'mailto:suryapratapsinghbisht61@gmail.com', icon: '✉️' },
];

const contactInfo = [
  { label: 'Email', value: 'suryapratapsinghbisht61@gmail.com', icon: '📧' },
  { label: 'Location', value: 'India', icon: '📍' },
  { label: 'Availability', value: 'Open to opportunities', icon: '🟢' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-1/3 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all">
              <BackIcon />
            </div>
            <span className="text-sm font-medium tracking-wide">Home</span>
          </Link>
          <div className="flex items-center gap-8 text-xs font-semibold tracking-widest text-white/40 uppercase">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-white">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-12 px-6">
        <div className="max-w-5xl mx-auto relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.3em] text-cyan-400/80 uppercase">Get in Touch</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-400">
                Let's Talk
              </span>
            </h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-white/50 max-w-xl font-light leading-relaxed"
            >
              Have a project in mind, a question, or just want to say hello? 
              Fill out the form below and I'll get back to you as soon as possible.
            </Motion.p>
          </Motion.div>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="pb-12 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {contactInfo.map((info, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <span className="text-xl mb-2 block">{info.icon}</span>
                <span className="text-xs font-bold tracking-widest text-white/30 uppercase block mb-1">{info.label}</span>
                <span className="text-sm text-white/70 font-medium">{info.value}</span>
              </div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="pb-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Contact Form — 3 col */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <Motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-12 text-center"
                >
                  <div className="text-emerald-400 flex justify-center mb-6">
                    <CheckIcon />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Message Sent!</h3>
                  <p className="text-white/50 mb-8">Thank you for reaching out. I'll get back to you soon.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 rounded-full border border-white/20 text-white/70 text-sm font-semibold tracking-wider uppercase hover:border-white/40 hover:text-white transition-all"
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
                  className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 space-y-6"
                >
                  <h2 className="text-xl font-bold tracking-tight mb-2">Send a Message</h2>
                  <p className="text-xs text-white/30 mb-4">
                    Powered by <span className="text-cyan-400 font-semibold">FastAPI</span> backend
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2 block">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2 block">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2 block">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2 block">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, idea, or question..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] transition-all resize-none"
                    />
                  </div>

                  {/* Error display */}
                  {status === 'error' && (
                    <Motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
                    >
                      {errorMsg}
                    </Motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon />
                        Send Message
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
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Social Links */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <h3 className="text-sm font-bold tracking-widest text-white/50 uppercase mb-5">Connect</h3>
              <div className="space-y-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{link.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-white/20 group-hover:text-white/50 transition-colors">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* API Status */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <h3 className="text-sm font-bold tracking-widest text-white/50 uppercase mb-4">Backend Status</h3>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03]">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <div>
                  <span className="text-sm font-medium text-white/70 block">FastAPI Server</span>
                  <span className="text-[10px] text-white/30 font-mono">localhost:8000</span>
                </div>
              </div>
              <p className="text-[11px] text-white/20 mt-4 leading-relaxed">
                The contact form connects to a FastAPI backend. 
                Run <code className="text-cyan-400/60 font-mono">python backend/main.py</code> to start the API server.
              </p>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-xs text-white/20 font-medium tracking-wider">
          © {new Date().getFullYear()} Surya Pratap Singh · Powered by FastAPI
        </p>
      </footer>
    </div>
  );
}
