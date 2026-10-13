import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, size = 'md' }) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const textDimensions = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group transition-transform duration-300 hover:scale-[1.02] focus:outline-none ${className}`}
      aria-label="Alphalinkx Digital Agency Home"
    >
      {/* Brand Icon Mark */}
      <div className={`relative flex items-center justify-center rounded-xl bg-black border border-white/10 group-hover:border-[#FC6603]/50 transition-colors p-1 shadow-[0_0_15px_rgba(252,102,3,0.15)] ${iconDimensions}`}>
        <img
          src="/assets/al-mark-orange.png"
          alt="Alphalinkx Mark"
          className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(252,102,3,0.5)]"
        />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className={`font-display font-bold tracking-tight text-white leading-none ${textDimensions}`}>
            <span>Alpha</span>
            <span className="text-zinc-200">link</span>
            <span className="text-[#FC6603] inline-block transition-transform duration-300 group-hover:rotate-12">x</span>
          </div>
          <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-400 uppercase mt-0.5 font-semibold">
            DIGITAL AGENCY
          </span>
        </div>
      )}
    </Link>
  );
};
