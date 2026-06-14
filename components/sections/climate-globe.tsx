'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  isLand: boolean;
  baseSize: number;
  colorHex: string;
}

interface Beacon {
  angle: number;
  speed: number;
  color: string;
  size: number;
}

export function ClimateGlobe({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Rotation angles (radians)
  const rotationX = useRef(0.2);
  const rotationY = useRef(0.8);

  // Drag state
  const isDragging = useRef(false);
  const startMouseX = useRef(0);
  const startMouseY = useRef(0);
  const dragVelocityX = useRef(0.005);
  const dragVelocityY = useRef(0.002);

  // Mouse hover state
  const mousePos = useRef({ x: -1000, y: -1000 });

  // Listen to document's theme attribute changes
  useEffect(() => {
    const checkTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null;
      setTheme(current || 'dark');
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    let resizeFrame = 0;
    const handleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resizeCanvas);
    };
    window.addEventListener('resize', handleResize);

    // Generate Globe Particles (Spherical distribution)
    const particles: Particle[] = [];
    const radius = 150;
    const particleCount = reducedMotion ? 300 : 700;

    // Procedural Landmass Generator using multiple sine octaves
    const checkIsLand = (theta: number, phi: number) => {
      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.cos(theta);
      const z = Math.sin(theta) * Math.sin(phi);

      const n1 = Math.sin(x * 1.6) * Math.cos(y * 1.6) * Math.sin(z * 1.6);
      const n2 = Math.sin(x * 3.6 + 0.8) * Math.cos(y * 2.8) * Math.cos(z * 3.6 + 1.6) * 0.45;
      const n3 = Math.sin(x * 7.5) * Math.sin(y * 7.5) * Math.cos(z * 7.5) * 0.2;
      const noise = n1 + n2 + n3;

      // Adjust threshold for ~35% land distribution
      return noise > -0.05;
    };

    // Golden spiral algorithm for extremely even sphere particle layout
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const phi = (2 * Math.PI * i) / goldenRatio;

      const isLand = checkIsLand(theta, phi);
      const px = radius * Math.sin(theta) * Math.cos(phi);
      const py = radius * Math.cos(theta);
      const pz = radius * Math.sin(theta) * Math.sin(phi);

      particles.push({
        x: px,
        y: py,
        z: pz,
        isLand,
        baseSize: isLand ? 1.4 + Math.random() * 1.2 : 0.6 + Math.random() * 0.6,
        colorHex: '', // Set dynamically based on theme
      });
    }

    // Set up Orbit beacons (Climate data packets)
    const beacons: Beacon[] = [
      { angle: 0, speed: 0.015, color: '#6D6ABB', size: 5 }, // Dusk Violet
      { angle: Math.PI * 0.5, speed: 0.012, color: '#F4643D', size: 6 }, // Ember
      { angle: Math.PI, speed: 0.018, color: '#365B78', size: 4.5 }, // Deep Teal
      { angle: Math.PI * 1.5, speed: 0.010, color: '#6D6ABB', size: 5.5 }, // Dusk Violet
    ];

    const rotateX = (y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [y * cos - z * sin, y * sin + z * cos];
    };

    const rotateY = (x: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x * cos + z * sin, -x * sin + z * cos];
    };

    // Main render loop
    const render = () => {
      const shouldAnimate = !reducedMotion;
      const isDark = theme === 'dark';
      const cssWidth = width;
      const cssHeight = height;
      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // Auto rotation unless dragging
      if (shouldAnimate && !isDragging.current) {
        rotationY.current += dragVelocityY.current;
        rotationX.current += dragVelocityX.current;

        // Apply friction to velocity
        dragVelocityX.current *= 0.98;
        dragVelocityY.current *= 0.98;

        // Rest velocity threshold
        if (Math.abs(dragVelocityX.current) < 0.0005) dragVelocityX.current = 0.0005;
        if (Math.abs(dragVelocityY.current) < 0.0002) dragVelocityY.current = 0.0002;
      }

      // Sort particles by rotated Z index (Painter's Algorithm) for correct 3D depth rendering
      const renderedParticles = particles.map((p) => {
        // Rotate Y
        const [nx, nz] = rotateY(p.x, p.z, rotationY.current);
        // Rotate X
        const [ny, rz] = rotateX(p.y, nz, rotationX.current);

        return {
          px: nx,
          py: ny,
          pz: rz,
          base: p,
        };
      });

      renderedParticles.sort((a, b) => a.pz - b.pz);

      // Draw atmospheric glow backing (Dark Mode only)
      if (isDark) {
        const glowGrad = ctx.createRadialGradient(
          centerX,
          centerY,
          radius - 20,
          centerX,
          centerY,
          radius + 80
        );
        glowGrad.addColorStop(0, 'rgba(109, 106, 187, 0.15)'); // Dusk Violet
        glowGrad.addColorStop(0.5, 'rgba(244, 100, 61, 0.08)'); // Ember
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 80, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        // Soft atmospheric glow in Light Mode
        const glowGrad = ctx.createRadialGradient(
          centerX,
          centerY,
          radius - 20,
          centerX,
          centerY,
          radius + 50
        );
        glowGrad.addColorStop(0, 'rgba(109, 106, 187, 0.08)'); // Dusk Violet
        glowGrad.addColorStop(0.6, 'rgba(244, 100, 61, 0.04)'); // Ember
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 50, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw Orbit rings projection
      const drawOrbitRing = (tiltAngle: number, color: string) => {
        ctx.strokeStyle = isDark ? `${color}33` : `${color}22`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        const steps = 120;
        const orbitRadius = radius + 32;

        for (let i = 0; i <= steps; i++) {
          const phi = (i / steps) * 2 * Math.PI;
          // Coordinates on tilted flat plane ring
          const ox = orbitRadius * Math.cos(phi);
          const oy = 0;
          const oz = orbitRadius * Math.sin(phi);

          // Apply tilt around X axis
          const [ry, rz_tilt] = rotateX(oy, oz, tiltAngle);

          // Apply main Y and X globe rotations
          const [rx, rz] = rotateY(ox, rz_tilt, rotationY.current);
          const [ry_final, rz_final] = rotateX(ry, rz, rotationX.current);

          const screenX = centerX + rx;
          const screenY = centerY + ry_final;

          // Project only the front half to merge behind the globe's solid back
          if (rz_final > -40) {
            if (i === 0) ctx.moveTo(screenX, screenY);
            else ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      };

      // Draw two tilted orbit paths
      drawOrbitRing(0.6, '#6D6ABB'); // Dusk Violet
      drawOrbitRing(-0.4, '#365B78'); // Deep Teal

      // Draw particles
      renderedParticles.forEach((rp) => {
        const { px, py, pz, base } = rp;
        const screenX = centerX + px;
        const screenY = centerY + py;

        // Vector distance to mouse position for hover reactiveness
        let hoverGlow = 0;
        let sizeMultiplier = 1.0;

        if (shouldAnimate && mousePos.current.x > -500) {
          const dx = screenX - mousePos.current.x;
          const dy = screenY - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            const intensity = (45 - dist) / 45; // 0 to 1
            sizeMultiplier = 1.0 + intensity * 1.5;
            hoverGlow = intensity;
          }
        }

        // Color settings based on Land vs Ocean and Dark vs Light mode
        let fillStyle = '';
        if (base.isLand) {
          if (isDark) {
            fillStyle = hoverGlow > 0
              ? `rgba(109, 106, 187, ${0.8 + hoverGlow * 0.2})`  // Violet hover
              : 'rgba(109, 106, 187, 0.75)'; // Dusk Violet
          } else {
            fillStyle = hoverGlow > 0
              ? `rgba(109, 106, 187, ${0.85 + hoverGlow * 0.15})` // Violet hover
              : 'rgba(109, 106, 187, 0.75)'; // Dusk Violet
          }
        } else {
          // Water/Grid point (soft semi-transparent Teal)
          if (isDark) {
            fillStyle = hoverGlow > 0
              ? `rgba(54, 91, 120, ${0.4 + hoverGlow * 0.3})`  // Deep Teal hover
              : 'rgba(54, 91, 120, 0.15)'; // Soft Teal
          } else {
            fillStyle = hoverGlow > 0
              ? `rgba(54, 91, 120, ${0.45 + hoverGlow * 0.3})`
              : 'rgba(54, 91, 120, 0.15)';
          }
        }

        // 3D perspective mapping (fade out particles on the back hemisphere)
        const depthPercent = (pz + radius) / (2 * radius); // 0 (back) to 1 (front)
        const alpha = base.isLand ? 0.35 + depthPercent * 0.65 : 0.2 + depthPercent * 0.8;

        // Apply scale & draw circle
        ctx.fillStyle = fillStyle;
        ctx.globalAlpha = alpha;
        
        ctx.beginPath();
        const drawRadius = base.baseSize * sizeMultiplier * (0.6 + depthPercent * 0.6);
        ctx.arc(screenX, screenY, Math.max(0.4, drawRadius), 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Update and draw floating Beacons (satellite telemetry packets)
      if (shouldAnimate) {
        beacons.forEach((beacon, idx) => {
          beacon.angle += beacon.speed;

          const orbitRadius = radius + 32;
          const tiltAngle = idx % 2 === 0 ? 0.6 : -0.4;

          // Calculate beacon's 3D coordinates
          const ox = orbitRadius * Math.cos(beacon.angle);
          const oy = 0;
          const oz = orbitRadius * Math.sin(beacon.angle);

          // Apply tilt
          const [ry, rz_tilt] = rotateX(oy, oz, tiltAngle);

          // Apply global rotations
          const [rx, rz] = rotateY(ox, rz_tilt, rotationY.current);
          const [ry_final, rz_final] = rotateX(ry, rz, rotationX.current);

          const screenX = centerX + rx;
          const screenY = centerY + ry_final;

          // Render only if beacon is in the front hemisphere
          if (rz_final > -40) {
            const depthPercent = (rz_final + radius) / (2 * radius);
            const beaconSize = beacon.size * (0.8 + depthPercent * 0.4);

            // Glowing background shadow for beacon
            const glowGrad = ctx.createRadialGradient(
              screenX,
              screenY,
              1,
              screenX,
              screenY,
              beaconSize * 2.8
            );
            glowGrad.addColorStop(0, beacon.color);
            glowGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(screenX, screenY, beaconSize * 2.8, 0, 2 * Math.PI);
            ctx.fill();

            // Beacon center core
            ctx.fillStyle = isDark ? '#ffffff' : beacon.color;
            ctx.beginPath();
            ctx.arc(screenX, screenY, beaconSize * 0.4, 0, 2 * Math.PI);
            ctx.fill();
          }
        });
      }

      // Frame continuation
      if (shouldAnimate) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    let isIntersecting = true;
    const scheduleRender = () => {
      cancelAnimationFrame(animationFrameId);
      if (!reducedMotion && isIntersecting && !document.hidden) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    scheduleRender();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        scheduleRender();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry?.isIntersecting ?? true;
      if (isIntersecting) {
        scheduleRender();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    }, { threshold: 0.05 });
    intersectionObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      intersectionObserver.disconnect();
    };
  }, [theme, reducedMotion]);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    startMouseX.current = e.clientX;
    startMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Track mouse coordinates relative to the canvas bounding box
    const rect = canvas.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (!isDragging.current) return;

    const deltaX = e.clientX - startMouseX.current;
    const deltaY = e.clientY - startMouseY.current;

    // Map drag translation to spherical rotation angles
    rotationY.current += deltaX * 0.006;
    rotationX.current += deltaY * 0.006;

    // Track velocities for kinetic physics momentum
    dragVelocityY.current = deltaX * 0.003;
    dragVelocityX.current = deltaY * 0.003;

    startMouseX.current = e.clientX;
    startMouseY.current = e.clientY;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    startMouseX.current = e.touches[0].clientX;
    startMouseY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mousePos.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };

    if (!isDragging.current) return;

    const deltaX = e.touches[0].clientX - startMouseX.current;
    const deltaY = e.touches[0].clientY - startMouseY.current;

    rotationY.current += deltaX * 0.006;
    rotationX.current += deltaY * 0.006;

    dragVelocityY.current = deltaX * 0.003;
    dragVelocityX.current = deltaY * 0.003;

    startMouseX.current = e.touches[0].clientX;
    startMouseY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    mousePos.current = { x: -1000, y: -1000 };
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full group">
      {/* Outer subtle glowing tech rings */}
      <div className="pointer-events-none absolute h-[380px] w-[380px] rounded-full border border-dashed border-site-border-strong opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700" />
      <div className="pointer-events-none absolute h-[440px] w-[440px] rounded-full border border-site-border opacity-20 group-hover:opacity-40 group-hover:rotate-12 transition-all duration-1000" />
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={() => {
          handleMouseUpOrLeave();
          mousePos.current = { x: -1000, y: -1000 };
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        aria-hidden="true"
        className="w-[420px] h-[420px] cursor-grab active:cursor-grabbing z-10 transition-transform duration-300 touch-none"
      />
      
      {/* Dynamic light-reflection aura overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30 z-20" style={{ background: 'radial-gradient(circle at center, transparent, transparent 40%, var(--bg-primary) 100%)' }} />
    </div>
  );
}
