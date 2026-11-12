import React, { useMemo } from 'react';
import { getNoiseDataUrl } from '../../lib/noiseTexture';

export const GrainOverlay: React.FC = () => {
  const noiseUrl = useMemo(() => getNoiseDataUrl(160), []);

  return (
    <div
      aria-hidden="true"
      className="hidden md:block fixed inset-0 pointer-events-none z-[80] overflow-hidden opacity-[0.035]"
      style={
        noiseUrl
          ? {
              backgroundImage: `url("${noiseUrl}")`,
              backgroundRepeat: 'repeat',
            }
          : undefined
      }
    />
  );
};
