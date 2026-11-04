import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D Animated Wave Particle Background
 * Recreates the exact glowing particle terrain from the reference image:
 * - High-density undulating particle mesh
 * - Smooth, continuous wave-like flow calculated directly on the GPU
 * - Distinct luminous neon orange ridge crest
 * - Soft depth-fade into pitch-black background
 * - 60-120fps GPU accelerated with automatic viewport pause via IntersectionObserver
 */
interface WhyChooseWaveBackgroundProps {
  /**
   * Master opacity factor for all wave particles (0.0 = invisible, 1.0 = fully bright).
   * Default: 0.45 (subtle, elegant backdrop).
   */
  opacity?: number;
}

export const WhyChooseWaveBackground: React.FC<WhyChooseWaveBackgroundProps> = ({
  opacity = 0.45,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Dynamically update opacity uniform when prop changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  }, [opacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    // Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 1000);
    // Camera looking down across the undulating particle terrain
    camera.position.set(-10, 42, 92);
    camera.lookAt(15, 6, -15);

    // Grid Dimensions: High-density 160 cols x 100 rows for razor-sharp particle terrain
    const cols = 160;
    const rows = 100;
    const count = cols * rows;

    const positions = new Float32Array(count * 3);
    const isOrange = new Float32Array(count);
    const particleIndex = new Float32Array(count);

    const xSpacing = 1.6;
    const zSpacing = 1.5;
    const xOffset = (cols * xSpacing) / 2;
    const zOffset = (rows * zSpacing) / 2;

    let idx = 0;
    for (let iz = 0; iz < rows; iz++) {
      for (let ix = 0; ix < cols; ix++) {
        const x = ix * xSpacing - xOffset;
        const z = iz * zSpacing - zOffset;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0; // calculated dynamically in vertex shader
        positions[idx * 3 + 2] = z;

        // The glowing orange crest line:
        // A curvilinear ridge spanning diagonally across the terrain from mid-left to top-right
        const normalizedX = ix / cols;
        const orangeRidgeZ =
          Math.floor(rows * 0.46 + Math.sin(normalizedX * Math.PI * 1.4 - 0.2) * (rows * 0.22));

        const distFromOrange = Math.abs(iz - orangeRidgeZ);
        if (distFromOrange === 0) {
          isOrange[idx] = 1.0; // primary orange crest
        } else if (distFromOrange === 1) {
          isOrange[idx] = 0.40; // softer adjacent orange glow
        } else {
          isOrange[idx] = 0.0;
        }

        particleIndex[idx] = idx;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aIsOrange', new THREE.BufferAttribute(isOrange, 1));
    geometry.setAttribute('aIndex', new THREE.BufferAttribute(particleIndex, 1));

    // Custom Shaders for 100% GPU-computed Wave Dynamics
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: dpr },
        // =========================================================================
        // MASTER OPACITY FACTOR: Controls visible opacity of all particles
        // Lower = dimmer / more subtle (e.g., 0.30 - 0.50)
        // Higher = brighter / more pronounced (e.g., 0.70 - 1.0)
        // =========================================================================
        uOpacity: { value: opacity },
      },
      vertexShader: `
        attribute float aIsOrange;
        attribute float aIndex;
        uniform float uTime;
        uniform float uPixelRatio;

        varying float vIsOrange;
        varying float vAlpha;
        varying vec3 vColor;

        void main() {
          vIsOrange = aIsOrange;
          vec3 pos = position;

          // Smooth compound wave equations matching the exact topography of the screenshot
          float t = uTime * 0.75;

          // Rolling swells
          float w1 = sin(pos.x * 0.038 + t * 0.9) * cos(pos.z * 0.042 + t * 0.6) * 14.5;
          // Diagonal wave motion
          float w2 = sin((pos.x * 0.026 - pos.z * 0.032) + t * 0.7) * 9.5;
          // High-frequency ripple
          float w3 = cos(pos.x * 0.065 + pos.z * 0.025 + t * 1.1) * 3.8;
          // Wave elevation rises toward the right side (as seen in reference image)
          float rightElevation = smoothstep(-60.0, 110.0, pos.x) * 14.0;
          // Extra crest along the orange ridge line
          float ridgeLift = aIsOrange > 0.0 ? 3.5 : 0.0;

          pos.y = w1 + w2 + w3 + rightElevation + ridgeLift - 8.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Crisp, pin-sharp point sizes (calibrated for high-res micro-dots, zero blur)
          float size = aIsOrange > 0.8 ? 16.0 : (aIsOrange > 0.2 ? 12.0 : 8.5);
          float calculatedSize = (size * uPixelRatio) * (48.0 / -mvPosition.z);
          gl_PointSize = clamp(calculatedSize, 1.5, 9.0);

          // Perspective depth fade (particles fade softly into background darkness)
          float depthFade = smoothstep(250.0, 42.0, -mvPosition.z);
          // Height-based luminance (crests are brighter than troughs)
          float heightFactor = smoothstep(-22.0, 24.0, pos.y);

          if (aIsOrange > 0.8) {
            // Vivid, solid Brand Orange (#FC6603)
            vColor = vec3(1.0, 0.40, 0.02);
            vAlpha = 1.0 * depthFade;
          } else if (aIsOrange > 0.2) {
            // Warm orange transition dot
            vColor = vec3(0.96, 0.46, 0.12);
            vAlpha = 0.70 * depthFade;
          } else {
            // Crisp, solid silver-white dots (sharp, no haze)
            float brightness = mix(0.40, 1.0, heightFactor);
            vColor = vec3(brightness);
            vAlpha = mix(0.25, 0.95, heightFactor) * depthFade;
          }
        }
      `,
      fragmentShader: `
        varying float vIsOrange;
        varying float vAlpha;
        varying vec3 vColor;
        uniform float uOpacity; // Master opacity factor (0.0 to 1.0)

        void main() {
          // Point coordinate relative to center (-0.5 to 0.5)
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          // Razor-sharp solid circular dot with 1px smooth edge anti-aliasing (NO blur/fuzziness)
          float alpha = (1.0 - smoothstep(0.40, 0.50, dist)) * vAlpha * uOpacity;

          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    materialRef.current = material;

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop with Visibility Optimization
    let animationFrameId: number;
    let isVisible = true;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = (currentTime - lastTime) * 0.001;
      lastTime = currentTime;

      // Smooth, continuous forward wave progression
      material.uniforms.uTime.value += Math.min(delta, 0.05);

      renderer.render(scene, camera);
    };

    // Pause rendering when scrolled out of view to preserve 100% GPU / battery
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { rootMargin: '100px' }
    );
    intersectionObserver.observe(container);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      materialRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Three.js Particle Wave Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Top subtle vignette so header remains 100% legible */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#060709] via-[#060709]/80 to-transparent pointer-events-none" />

      {/* Bottom fade into section border */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#060709] to-transparent pointer-events-none" />
    </div>
  );
};

export default WhyChooseWaveBackground;

