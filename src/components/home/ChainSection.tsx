import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { CHAIN_LINKS } from '../../content/siteContent';

/**
 * THE CHAIN SECTION
 * Four links. One strong chain.
 *
 * Implements:
 * 1. Sticky header portion (Image 1) with the starting anchor node (⦿).
 * 2. Continuous liquid orange chain fill line traveling down through the track.
 * 3. Exact synchronization: A node and its card/text ONLY glow when the progress bar tip hits that node!
 * 4. Fade-in transition on cards when the chain node fills up.
 * 5. Pure white text with vivid orange glow behind ghost words when the chain fills up.
 * 6. Smooth scroll release to the next section when the chain finishes.
 */
export const ChainSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  // Active indices: which nodes/cards are currently lit (starts EMPTY so nothing glows before the bar hits it)
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [fillPx, setFillPx] = useState(0);
  const [nodePositions, setNodePositions] = useState<number[]>([]);
  const [maxTrackHeight, setMaxTrackHeight] = useState(1600);

  // Measure exact vertical pixel positions of each node relative to the track's top
  const measureNodes = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const trackH = track.offsetHeight;
    setMaxTrackHeight(trackH);

    const positions = nodeRefs.current.map((node) => {
      if (!node) return 0;
      const nodeRect = node.getBoundingClientRect();
      // Center of node relative to top of chain line
      return nodeRect.top - trackRect.top + nodeRect.height / 2;
    });

    setNodePositions(positions);
  }, []);

  // Scroll progress through the chain track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 75%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.0005,
  });

  // Calculate fill height and activate nodes strictly when the progress bar hits them
  useEffect(() => {
    measureNodes();

    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (prefersReduced) {
        setActiveIndices([0, 1, 2, 3]);
        setFillPx(maxTrackHeight);
        return;
      }

      // Total travel distance: up to slightly past the last node
      const lastNodeY = nodePositions.length > 0 && nodePositions[nodePositions.length - 1] > 0
        ? nodePositions[nodePositions.length - 1] + 24
        : maxTrackHeight;

      const clampedProgress = Math.max(0, Math.min(1, latest));
      const currentFill = clampedProgress * lastNodeY;
      setFillPx(currentFill);

      // ONLY light up a node if the tip of the progress line has physically reached it!
      // (The top boundary of the node circle is pos - 18px)
      const newActive: number[] = [];
      nodePositions.forEach((pos, idx) => {
        if (pos > 0 && currentFill >= pos - 18) {
          newActive.push(idx);
        }
      });

      setActiveIndices(newActive);
    });

    window.addEventListener('resize', measureNodes);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', measureNodes);
    };
  }, [smoothProgress, nodePositions, maxTrackHeight, measureNodes, prefersReduced]);

  // Initial measurement on mount
  useEffect(() => {
    measureNodes();
    const timer = setTimeout(measureNodes, 300);
    return () => clearTimeout(timer);
  }, [measureNodes]);

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
      {/* ================= STICKY HEADER PORTION (IMAGE 1) ================= */}
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

            {/* Starting Anchor Node with Concentric Pulsing Ring (from Image 1) */}
            <div className="chain-start-anchor" aria-hidden="true" title="Chain Starting Nexus">
              <span className="chain-start-ring" />
              <span className="chain-start-dot" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= TIMELINE TRACK (IMAGE 2) ================= */}
      <div className="wrap">
        <div className="chain-track" id="chainTrack" ref={trackRef}>
          {/* Vertical central connector line with dynamic glowing fill */}
          <div className="chain-line" aria-hidden="true">
            <div
              className="chain-fill"
              id="chainFill"
              style={{
                height: prefersReduced ? '100%' : `${fillPx}px`,
              }}
            >
              {/* Traveling neon tip dot (only visible once fill begins) */}
              {fillPx > 6 && <div className="chain-fill-tip" />}
            </div>
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
                  {/* Small aux tech dot as shown in Image 2 */}
                  <span className="node-aux-dot" />
                </div>

                {/*
                  IMAGE 2 INSTRUCTION:
                  "I want this section to be have fade in transition animation when the chain icon fill up"
                  (Only activates when the progress bar hits this node!)
                */}
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

                {/*
                  IMAGE 2 INSTRUCTION:
                  "Text should become white and have the orange glow effect in behind when chain fill up"
                  (Only activates when the progress bar hits this node!)
                */}
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
    </section>
  );
};

export default ChainSection;
