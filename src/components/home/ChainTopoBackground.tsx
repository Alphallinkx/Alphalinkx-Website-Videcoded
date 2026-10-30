import React from 'react';

/**
 * High-performance vector topographic map background with animated glowing orange pulses.
 * Features:
 * - Minimal, uncluttered aesthetic: exactly 4 sparse, slowly gliding orange pulses (2 on left, 2 on right).
 * - Anchored at Y=0 (xMidYMin slice): spans from the top border of the section downwards without horizontal wave lines.
 * - Pure CSS GPU animations on stroke-dashoffset: ZERO main-thread JavaScript execution.
 * - Clean, subtle static contour lines framing the left and right flanks.
 */
export const ChainTopoBackground: React.FC = () => {
  return (
    <div className="chain-fixed-bg-inner" aria-hidden="true">
      {/* Vector Topographic Curves & Traveling Embers (Pure vector, zero static bitmap artifacts) */}
      <svg
        className="chain-topo-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Intense neon orange glow filter */}
          <filter id="topo-orange-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="1.2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Full-height subtle contour stroke gradient */}
          <linearGradient id="contour-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A9BB5" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#8A9BB5" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#8A9BB5" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8A9BB5" stopOpacity="0.16" />
          </linearGradient>

          {/* Left Flank Contour Paths (Starting at Y=0 on top edge) */}
          <path id="path-L1" d="M 30,0 C 110,120 20,280 110,460 C 190,620 40,780 90,940" />
          <path id="path-L2" d="M 80,0 C 160,130 60,290 160,470 C 240,630 80,790 140,940" />
          <path id="path-L3" d="M 140,0 C 220,140 110,300 220,480 C 310,640 130,800 200,940" />
          <path id="path-L4" d="M 200,0 C 280,150 170,310 280,490 C 370,650 190,810 260,940" />
          <path id="path-L5" d="M 260,0 C 340,160 230,320 340,500 C 430,660 250,820 320,940" />
          <path id="path-L6" d="M 320,0 C 400,170 290,330 400,510 C 490,670 310,830 380,940" />

          {/* Right Flank Contour Paths (Starting at Y=0 on top edge) */}
          <path id="path-R1" d="M 1410,0 C 1330,120 1420,280 1330,460 C 1250,620 1400,780 1350,940" />
          <path id="path-R2" d="M 1360,0 C 1280,130 1380,290 1280,470 C 1200,630 1360,790 1300,940" />
          <path id="path-R3" d="M 1300,0 C 1220,140 1330,300 1220,480 C 1130,640 1310,800 1240,940" />
          <path id="path-R4" d="M 1240,0 C 1160,150 1270,310 1160,490 C 1070,650 1250,810 1180,940" />
          <path id="path-R5" d="M 1180,0 C 1100,160 1210,320 1100,500 C 1010,660 1190,820 1120,940" />
          <path id="path-R6" d="M 1120,0 C 1040,170 1150,330 1040,510 C 950,670 1130,830 1060,940" />
        </defs>

        {/* 1. Base Static Subtle Contour Grid (Left & Right Flanks) */}
        <g stroke="url(#contour-fade)" strokeWidth="1.1" fill="none">
          <use href="#path-L1" />
          <use href="#path-L2" />
          <use href="#path-L3" />
          <use href="#path-L4" />
          <use href="#path-L5" />
          <use href="#path-L6" />
          <use href="#path-R1" />
          <use href="#path-R2" />
          <use href="#path-R3" />
          <use href="#path-R4" />
          <use href="#path-R5" />
          <use href="#path-R6" />
        </g>

        {/* 2. Reduced Quantity of Animated Traveling Orange Lines (Only 2 on Left Flank) */}
        <g
          stroke="#FC6603"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          filter="url(#topo-orange-glow)"
        >
          <use href="#path-L2" className="topo-runner topo-runner-l1" />
          <use href="#path-L5" className="topo-runner topo-runner-l2" />
        </g>

        {/* 3. Reduced Quantity of Animated Traveling Orange Lines (Only 2 on Right Flank) */}
        <g
          stroke="#FC6603"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          filter="url(#topo-orange-glow)"
        >
          <use href="#path-R2" className="topo-runner topo-runner-r1" />
          <use href="#path-R5" className="topo-runner topo-runner-r2" />
        </g>
      </svg>

      {/* 3. Central ambient radial vignette (protects text contrast in the card area) */}
      <div className="chain-bg-radial-vignette" />
    </div>
  );
};
