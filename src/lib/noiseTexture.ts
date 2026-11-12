let cachedNoiseUrl: string | null = null;

/**
 * Generates and caches a small monochrome tileable noise PNG data URL once per session.
 * Replaces expensive real-time SVG <feTurbulence> filter compositing with a GPU-cached
 * repeating background pattern that looks visually identical.
 */
export function getNoiseDataUrl(size = 160): string {
  if (cachedNoiseUrl) return cachedNoiseUrl;
  if (typeof document === 'undefined') return '';

  try {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    // Deterministic lightweight PRNG (xorshift32) for consistent grain texture
    let seed = 0x9e3779b9;
    for (let i = 0; i < data.length; i += 4) {
      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;
      const v = seed & 0xff;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);
    cachedNoiseUrl = canvas.toDataURL('image/png');
    return cachedNoiseUrl;
  } catch {
    return '';
  }
}

