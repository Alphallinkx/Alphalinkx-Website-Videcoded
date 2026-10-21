import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  }[size];

  return (
    <Link
      to="/"
      className={`inline-flex items-center focus:outline-none transition-transform hover:scale-105 duration-200 ${className}`}
      aria-label="AlphaLinkx Home"
    >
      <img
        src="/assets/alphalinkx-mark.png"
        alt="AlphaLinkx"
        className={`${heightClass} w-auto object-contain`}
      />
    </Link>
  );
};
