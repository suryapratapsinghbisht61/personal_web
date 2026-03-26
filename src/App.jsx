import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ─────────────────────────────────────────────
   Minimal Disclaimer Toast
   Small, premium, black & white only.
   Auto-dismisses after 2.5s or on ✕ click.
─────────────────────────────────────────────── */
const DisclaimerToast = ({ onClose }) => {
  const [phase, setPhase] = useState('enter'); // enter → visible → exit

  const dismiss = () => {
    setPhase('exit');
    setTimeout(onClose, 400);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 30);
    const t2 = setTimeout(() => dismiss(), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const translateY = phase === 'visible' ? '0' : '20px';
  const opacity = phase === 'visible' ? 1 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        opacity,
        transform: `translateY(${translateY})`,
        transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          width: '320px',
          background: '#fff',
          borderRadius: '14px',
          padding: '20px 22px 18px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)',
          position: 'relative',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            width: '22px',
            height: '22px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            opacity: 0.3,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Content */}
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#000', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
          Heads up
        </p>
        <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.55', margin: 0, paddingRight: '10px' }}>
          I'm a 1st year student, still learning. The things here are what I'm currently working on &amp; building. For more info, feel free to reach out.
        </p>

        {/* Progress bar — visual auto-dismiss indicator */}
        <div style={{ marginTop: '14px', height: '2px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              background: '#000',
              borderRadius: '2px',
              width: phase === 'visible' ? '0%' : '0%',
              animation: phase === 'visible' ? 'toastProgress 5s linear forwards' : 'none',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

function App() {
  const [showToast, setShowToast] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      {showToast && <DisclaimerToast onClose={() => setShowToast(false)} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
