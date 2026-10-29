import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion, useTransform } from 'motion/react';
import { CHAIN_LINKS } from '../../content/siteContent';

/**
 * THE CHAIN SECTION
 * Four links. One strong chain.
 * Growth isn’t one service — it’s a chain. We find the weak link, repair it, then strengthen them all.
 */
export const ChainSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll progress through the timeline track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end 70%'],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  // Track height percentage for CSS-based fill animation
  const [fillPercent, setFillPercent] = useState(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([0]);

  useEffect(() => {
    const unsubscribe = springProgress.on('change', (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      setFillPercent(clamped * 100);

      // 4 stages thresholds: ~10%, ~35%, ~65%, ~90%
      const newActive: number[] = [];
      if (clamped >= 0.05) newActive.push(0);
      if (clamped >= 0.32) newActive.push(1);
      if (clamped >= 0.62) newActive.push(2);
      if (clamped >= 0.88) newActive.push(3);

      setActiveIndices(newActive);
    });

    return () => unsubscribe();
  }, [springProgress]);

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
    <section className="chain-sec" id="chain" aria-labelledby="chain-heading">
      <div className="wrap">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sec-head center rv"
        >
          <span className="label">// The Chain</span>
          <h2 id="chain-heading">
            Four links. <span className="o">One strong chain.</span>
          </h2>
          <p>
            Growth isn’t one service — it’s a chain. We find the weak link, repair it, then strengthen them all.
          </p>
        </motion.div>

        {/* ================= TIMELINE TRACK ================= */}
        <div className="chain-track" id="chainTrack" ref={trackRef}>
          {/* Vertical central connector line */}
          <div className="chain-line" aria-hidden="true">
            <div
              className="chain-fill"
              id="chainFill"
              style={{
                height: prefersReduced ? '100%' : `${fillPercent}%`,
              }}
            />
          </div>

          {/* 4 Alternating Chain Links */}
          {CHAIN_LINKS.map((link, idx) => {
            const isFlipped = idx % 2 !== 0; // Odd indices are flipped
            const isLit = activeIndices.includes(idx);

            return (
              <motion.div
                key={link.id}
                initial={
                  prefersReduced
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 35, scale: 0.98 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`link-block rv ${isFlipped ? 'flip' : ''} ${isLit ? 'lit' : ''}`}
              >
                {/* Central Chain Node */}
                <div className="link-node" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M10 14a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                    <path d="M14 10a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
                  </svg>
                </div>

                {/* Main Link Card */}
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

                {/* Opposite Decorative Ghost Badge */}
                <div className="link-side" aria-hidden="true">
                  <div className="link-badge">
                    <div className="big">{link.ghostWord}</div>
                    <div className="small">{link.ghostCaption}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChainSection;
