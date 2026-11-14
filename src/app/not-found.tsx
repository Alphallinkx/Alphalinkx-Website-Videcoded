'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { BrandButton } from '@/components/common/BrandButton';

const BrokenChainCanvas = dynamic(
  () => import('@/components/3d/BrokenChainCanvas'),
  {
    ssr: false,
    loading: () => <div className="w-full h-72 bg-transparent" />,
  }
);

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-[85vh] w-full flex flex-col items-center justify-center px-6 py-24 bg-[#0A0A0B] text-center relative overflow-hidden select-none">
      {/* 3D Broken Chain Canvas */}
      <div className="w-full h-72 max-w-lg mx-auto relative">
        {mounted && <BrokenChainCanvas />}
      </div>

      <div className="relative z-10 max-w-xl mx-auto space-y-4">
        <span className="font-mono text-[12px] font-medium text-[#FF5A1F] tracking-[0.18em] uppercase">
          // ERROR 404: CONNECTION SEVERED
        </span>
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-[-0.03em] uppercase leading-[1.02]">
          SIGNAL UNLINKED.
        </h1>
        <p className="font-sans text-[16px] text-[#C2C2C2] max-w-md mx-auto leading-[1.6]">
          The requested coordinate does not exist or has been disconnected from the growth graph.
        </p>

        <div className="pt-6">
          <BrandButton to="/" variant="orange" dataCursor="RELINK">
            Relink to Home Node
          </BrandButton>
        </div>
      </div>
    </main>
  );
}
