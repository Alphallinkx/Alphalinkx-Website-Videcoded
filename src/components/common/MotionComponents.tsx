import React, { type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BRAND_BUTTON_BASE_CLASS } from "./BrandButton";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MaskLine({
  children,
  delay = 0,
  inView = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  inView?: boolean;
  className?: string;
}) {
  const anim = { y: "0%" };
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className || ""}`}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        {...(inView ? { whileInView: anim, viewport: { once: true } } : { animate: anim })}
        transition={{ duration: 0.8, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  dataCursor,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  dataCursor?: string;
}) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const isInternalRoute = href.startsWith("/") && !href.startsWith("/#") && !href.includes("#");

  const styles =
    variant === "primary"
      ? {
          container:
            "bg-[#FC6603] text-white shadow-[0_4px_20px_rgba(252,102,3,0.32)] hover:bg-[#FF6E12] hover:shadow-[0_8px_28px_rgba(252,102,3,0.52)] focus-visible:ring-[#FC6603]",
          badge: "bg-white text-[#0A0A0B]",
        }
      : {
          container:
            "bg-white text-[#0A0A0B] shadow-[0_4px_20px_rgba(255,255,255,0.14)] hover:bg-[#F4F4F5] hover:shadow-[0_8px_26px_rgba(255,255,255,0.26)] focus-visible:ring-white",
          badge: "bg-[#FC6603] text-white",
        };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInternalRoute) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      style={{ x: sx, y: sy }}
      data-cursor={dataCursor}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.2);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`${BRAND_BUTTON_BASE_CLASS} ${styles.container} ${className}`}
    >
      <span className="leading-none">{children}</span>
      <span
        aria-hidden="true"
        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm ${styles.badge}`}
      >
        <ArrowUpRight className="w-4 h-4 stroke-[2.25]" />
      </span>
    </motion.a>
  );
}
