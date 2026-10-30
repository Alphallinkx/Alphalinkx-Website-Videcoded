import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { CHAIN_LINKS } from '../../content/siteContent';
import { ChainTopoBackground } from './ChainTopoBackground';

/**
 * THE CHAIN SECTION
 * Four links. One strong chain.
 *
 * Ultra-Lightweight & GPU-Accelerated Implementation:
 * 1. Unified, non-sticky layout: the entire timeline moves naturally with scroll so cards never slide under/behind header or nodes.
 * 2. Dedicated center corridor: generous column-gap and bounded card widths ensure cards never overlap or collide with central nodes.
 * 3. 100% GPU composited chain fill line (scaleY) and neon tip (MotionValue): ZERO layout reflows and ZERO component re-renders during line fill.
 * 4. Micro-batched node activation: state updates ONLY when a node transition threshold is crossed (at most 4 updates down the entire page).
 * 5. High-performance transitions: eliminated CPU-costly CSS blur filters in favor of native opacity/transform GPU layers.
 */
export const ChainSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  // Active indices: which nodes/cards are currently lit (starts EMPTY so nothing glows before the bar hits it)
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const activeIndicesRef = useRef<number[]>([]);
  const thresholdsRef = useRef<number[]>([0.12, 0.38, 0.64, 0.90]);

  // Measure relative vertical position of each node (0 to 1) relative to track
  const measureNodes = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const trackH = track.offsetHeight;
    if (trackH <= 0) return;

    const measured = nodeRefs.current.map((node, i) => {
      if (!node) return (i + 0.5) / 4;
      const nodeRect = node.getBoundingClientRect();
      // Center of node relative to top of track
      const nodeCenterY = nodeRect.top - trackRect.top + nodeRect.height / 2;
      // Trigger threshold slightly before the tip touches the node circle
      return Math.max(0, Math.min(1, (nodeCenterY - 14) / trackH));
    });

    thresholdsRef.current = measured;
  }, []);

  // Scroll progress through the chain track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end 75%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  // Hardware-accelerated MotionValues for continuous liquid line fill & travelling tip (ZERO React re-renders!)
  const tipTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const tipOpacity = useTransform(smoothProgress, [0, 0.015], [0, 1]);

  // Synchronize lit state: ONLY trigger a React re-render when a threshold is crossed!
  useEffect(() => {
    measureNodes();

    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (prefersReduced) {
        if (activeIndicesRef.current.length !== 4) {
          activeIndicesRef.current = [0, 1, 2, 3];
          setActiveIndices([0, 1, 2, 3]);
        }
        return;
      }

      const clamped = Math.max(0, Math.min(1, latest));
      const thresholds = thresholdsRef.current;
      const newActive: number[] = [];

      for (let i = 0; i < thresholds.length; i++) {
        if (clamped >= thresholds[i]) {
          newActive.push(i);
        }
      }

      const current = activeIndicesRef.current;
      const changed =
        newActive.length !== current.length ||
        newActive.some((val, idx) => val !== current[idx]);

      if (changed) {
        activeIndicesRef.current = newActive;
        setActiveIndices(newActive);
      }
    });

    const handleResize = () => {
      measureNodes();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    const timer = setTimeout(measureNodes, 250);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [smoothProgress, measureNodes, prefersReduced]);

  // Smooth scroll handler for anchor links
  const handleScrollToAudit = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId) || document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="chain-sec"
      id="chain"
      aria-labelledby="chain-heading"
    >
      {/* ================= FIXED VIEWPORT ANIMATED TOPOGRAPHIC BACKGROUND ================= */}
      <div className="chain-fixed-bg" aria-hidden="true">
        <ChainTopoBackground />
      </div>

      {/* ================= SCROLLABLE FOREGROUND CONTENT ================= */}
      <div className="chain-content-wrap">
        {/* ================= SECTION HEADER ================= */}
        <div className="chain-sticky-head">
          <div className="wrap">
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="sec-head center"
            >
              <span className="label">// The Chain</span>
              <h2 id="chain-heading">
                Four links. <span className="o">One strong chain.</span>
              </h2>
              <p>
                Growth isn’t one service — it’s a chain. We find the weak link, repair it, then strengthen them all.
              </p>

              {/* Starting Anchor Node with Concentric Pulsing Ring */}
              <div className="chain-start-anchor" aria-hidden="true" title="Chain Starting Nexus">
                <span className="chain-start-ring" />
                <span className="chain-start-dot" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= TIMELINE TRACK ================= */}
        <div className="wrap">
          <div className="chain-track" id="chainTrack" ref={trackRef}>
            {/* Vertical central connector line with dynamic GPU-accelerated glowing fill */}
            <div className="chain-line" aria-hidden="true">
              <motion.div
                className="chain-fill"
                id="chainFill"
                style={{
                  scaleY: prefersReduced ? 1 : smoothProgress,
                  transformOrigin: 'top',
                }}
              />
              {/* Traveling neon tip dot (smooth GPU position interpolation) */}
              <motion.div
                className="chain-fill-tip"
                style={{
                  top: prefersReduced ? '100%' : tipTop,
                  opacity: prefersReduced ? 1 : tipOpacity,
                }}
              />
            </div>

            {/* 4 Alternating Chain Links */}
            {CHAIN_LINKS.map((link, idx) => {
              const isFlipped = idx % 2 !== 0; // Odd indices are flipped to opposite side
              const isLit = activeIndices.includes(idx);

              return (
                <div
                  key={link.id}
                  className={`link-block ${isFlipped ? 'flip' : ''} ${isLit ? 'lit' : ''}`}
                >
                  {/* Center Chain Node with Chain SVG Icon */}
                  <div
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    className="link-node"
                    aria-hidden="true"
                  >
                    <span className="link-node-ping" />
                    <svg
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M10 14a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                      <path d="M14 10a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
                    </svg>
                    {/* Small aux tech dot */}
                    <span className="node-aux-dot" />
                  </div>

                  {/* Left/Right Card (Activates when progress tip hits node) */}
                  <div className="link-card">
                    <span className="num">{link.stageNumber}</span>
                    <h3>{link.title}</h3>
                    <p className="pain">
                      <b>{link.painBold}</b>
                      {link.painText}
                    </p>
                    <div className="services-line">
                      {link.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <a
                      className="learn"
                      href={link.learnHref}
                      onClick={(e) => handleScrollToAudit(e, link.learnHref)}
                    >
                      {link.learnText} <span>→</span>
                    </a>
                  </div>

                  {/* Opposite Ghost Word Badge (Ambient orange glow + white text when lit) */}
                  <div className="link-side" aria-hidden="true">
                    <div className="link-badge">
                      {/* Ambient orange glow effect in behind */}
                      <div className="ghost-glow-orb" />
                      {/* Pure white text with orange neon drop-glow */}
                      <div className="big">{link.ghostWord}</div>
                      <div className="small">{link.ghostCaption}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChainSection;
