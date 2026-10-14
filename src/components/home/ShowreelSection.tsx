import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const ShowreelSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(0.65);
  const [borderRadius, setBorderRadius] = useState(32);
  const [isPlayingModal, setIsPlayingModal] = useState(false);

  // Scroll scrub to expand video card from 65% to 100%
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress while section is passing through viewport
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, currentDist / totalDist));

      // Scale between 0.65 and 1.0
      const currentScale = 0.65 + progress * 0.35;
      const currentRadius = Math.max(0, 32 - progress * 32);

      setScale(currentScale);
      setBorderRadius(currentRadius);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TODO: Replace this video source with your finalized high-res agency showreel MP4
  const showreelVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4';

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-[#0A0A0B] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Section meta tag */}
      <div className="max-w-[1400px] w-full px-6 md:px-10 mb-8 flex items-center justify-between font-mono text-xs text-[#8A8A8E] uppercase tracking-widest">
        <span>// 02 SHOWREEL</span>
        <span className="text-[#FF5A1F]">EXPAND ON SCROLL</span>
      </div>

      {/* Scrubbed Expanding Video Container */}
      <div
        className="w-full flex items-center justify-center px-4 md:px-8 transition-transform duration-75 will-change-transform"
        style={{
          maxWidth: `${scale * 100}%`,
        }}
      >
        <div
          onClick={() => setIsPlayingModal(true)}
          className="group relative w-full aspect-video overflow-hidden border border-white/10 hover:border-[#FF5A1F]/60 shadow-[0_20px_80px_rgba(0,0,0,0.8)] cursor-pointer transition-colors duration-300"
          style={{
            borderRadius: `${borderRadius}px`,
          }}
          data-cursor="PLAY"
        >
          {/* Autoplaying muted looping background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-700 ease-out"
          >
            <source src={showreelVideoUrl} type="video/mp4" />
          </video>

          {/* Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent pointer-events-none" />

          {/* Center Play Button Graphic */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#111113]/90 border border-white/20 group-hover:border-[#FF5A1F] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-md">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-[#FF5A1F] translate-x-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className="mt-4 font-mono text-xs tracking-widest uppercase text-white/90 font-semibold group-hover:text-[#FF5A1F] transition-colors">
              WATCH REEL [01:24]
            </span>
          </div>

          {/* Bottom Video Meta Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wider">
            <span>ALPHALINKX DIGITAL FILM // 2024</span>
            <span className="text-white">CLICK FOR AUDIO</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isPlayingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          >
            <button
              onClick={() => setIsPlayingModal(false)}
              className="absolute top-8 right-8 font-mono text-xs text-white/70 hover:text-white uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 hover:border-[#FF5A1F] bg-[#111113] transition-colors"
            >
              CLOSE [ESC]
            </button>

            <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={showreelVideoUrl} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
