import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { Preloader } from './components/common/Preloader';
import { GrainOverlay } from './components/common/GrainOverlay';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Global Smooth Momentum Scroll Manager
 * Powered by Lenis. Provides butter-smooth inertia physics across the entire website
 * and silky scroll navigation for hash anchors (#work, #about, #process, etc.).
 */
function SmoothScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global anchor click interceptor for silky smooth scrolling to sections
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Check for on-page hash link: '#work', '/#work' (when currently on '/')
      const isHash = href.startsWith('#') && href.length > 1;
      const isHomeHash = href.startsWith('/#') && (window.location.pathname === '/' || window.location.pathname === '');

      if (isHash || isHomeHash) {
        const hash = isHash ? href : href.slice(1);
        try {
          const element = document.querySelector(hash) as HTMLElement | null;
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, {
              offset: -75,
              duration: 1.3,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            history.pushState(null, '', hash);
          }
        } catch {
          // Ignore invalid selector strings
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Sync scroll on route change
  useEffect(() => {
    if (location.hash) {
      try {
        const element = document.querySelector(location.hash) as HTMLElement | null;
        if (element) {
          const timer = setTimeout(() => {
            (window as any).lenis?.scrollTo(element, {
              offset: -75,
              duration: 1.2,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }, 120);
          return () => clearTimeout(timer);
        }
      } catch {
        // Ignore invalid hash
      }
    }
    // Scroll to top immediately on route change
    (window as any).lenis?.scrollTo(0, { immediate: true });
  }, [location.pathname, location.hash]);

  return null;
}

/**
 * Animated Routes with seamless Studio Page Transitions
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          {/* Both /work and /projects paths supported */}
          <Route path="/work" element={<ProjectsPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export const App: React.FC = () => {
  return (
    <Router>
      <SmoothScrollManager />
      {/* 01. Terminal-style Preloader with Curtain Split */}
      <Preloader />

      {/* 02. Subtle Film-Grain Noise Overlay */}
      <GrainOverlay />

      {/* 03. Thin Orange Top Scroll Progress Line */}
      <ScrollProgressBar />

      {/* 04. Custom Cursor with Lerp Ring and Context Labels */}
      <CustomCursor />

      <div className="flex flex-col min-h-screen bg-[#0A0A0B] text-[#F5F5F4] antialiased selection:bg-[#FF5A1F] selection:text-black">
        <Navbar />

        <div className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
