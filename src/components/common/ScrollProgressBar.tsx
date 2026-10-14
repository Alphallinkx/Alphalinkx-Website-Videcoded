import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[99] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#FF5A1F] via-[#FF8A3D] to-[#FFA768] transition-transform duration-75 ease-out origin-left shadow-[0_0_12px_rgba(255,90,31,0.8)]"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
};
