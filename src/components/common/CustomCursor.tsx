import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('input') ||
        target?.closest('select') ||
        target?.closest('textarea') ||
        target?.closest('.interactive-hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
        }}
      >
        <div
          className={`w-2 h-2 rounded-full bg-[#FC6603] transition-all duration-200 ${
            isHovered ? 'scale-0 opacity-0' : 'scale-100 opacity-100 shadow-[0_0_8px_#FC6603]'
          }`}
        />
      </div>

      {/* Trailing Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${pos.x - (isHovered ? 24 : 14)}px, ${
            pos.y - (isHovered ? 24 : 14)
          }px, 0)`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovered
              ? 'w-12 h-12 border-[#FC6603] bg-[#FC6603]/10 shadow-[0_0_20px_rgba(252,102,3,0.3)] backdrop-blur-[2px]'
              : 'w-7 h-7 border-white/30 bg-transparent'
          }`}
        />
      </div>
    </>
  );
};
