import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  phase: number;
  pulseSpeed: number;
  isAccent: boolean;
}

export const HeroParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Lightweight particle count: fast, smooth 60-120fps with zero frame drops
    const getParticleCount = (w: number) => (w < 768 ? 12 : 36);
    const maxConnectionDistance = 120;
    const maxDistSq = maxConnectionDistance * maxConnectionDistance;

    let particleCount = getParticleCount(window.innerWidth);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isActive: false,
    };

    const colors = [
      'rgba(255, 90, 31, ',   // Brand Orange
      'rgba(255, 120, 50, ',  // Bright Amber
      'rgba(255, 180, 100, ', // Warm Glow
      'rgba(255, 255, 255, ', // Highlight
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isAccent = Math.random() < 0.25;
        const radius = isAccent ? 2.5 + Math.random() * 1.5 : 1.2 + Math.random() * 1.0;
        const baseAlpha = isAccent ? 0.6 + Math.random() * 0.3 : 0.25 + Math.random() * 0.35;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.05,
          radius,
          baseAlpha,
          alpha: baseAlpha * 0.5,
          color: isAccent ? 'rgba(255, 90, 31, ' : colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          isAccent,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap at 1.5 for lightweight rendering

      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particleCount = getParticleCount(width);

      if (particles.length === 0) {
        initParticles();
      } else {
        particles.forEach((p) => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pause rendering when hero is out of view (saves 100% CPU when scrolling down)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.isActive = true;
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerp
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      // Render and update particles with ultra-fast direct arc calls
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        p.phase += p.pulseSpeed;
        p.alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.phase));

        p.x += p.vx;
        p.y += p.vy;

        // Subtle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 14400 && distSq > 0) { // 120px radius
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / 120) * 1.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Boundary wrap
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;

        // Draw soft outer halo (fast simple fill, zero gradient allocation)
        ctx.fillStyle = `${p.color}${p.alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Draw solid center
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting gossamer light lines between nearby nodes
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdistSq = cdx * cdx + cdy * cdy;

          if (cdistSq < maxDistSq) {
            const lineAlpha = (1 - Math.sqrt(cdistSq) / maxConnectionDistance) * 0.22 * Math.min(p.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(255, 100, 35, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[2]"
    />
  );
};
