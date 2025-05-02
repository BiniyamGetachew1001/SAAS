"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  depth: number; // For parallax effect (1-3)
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinkSpeed: number;
}

export function BackgroundEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 768) return; // Disable on mobile

      // Calculate mouse position as percentage of window
      const x = (e.clientX / window.innerWidth) - 0.5; // -0.5 to 0.5
      const y = (e.clientY / window.innerHeight) - 0.5; // -0.5 to 0.5

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create particles and stars
  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const newParticles: Particle[] = [];
      // More particles for a richer effect, but still subtle
      const particleCount = window.innerWidth < 768 ? 10 : 25;

      for (let i = 0; i < particleCount; i++) {
        // Assign a depth layer (1, 2, or 3) for parallax effect
        const depth = Math.ceil(Math.random() * 3);

        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          // Vary size based on depth - smaller particles appear further away
          size: Math.random() * (70 - (depth * 15)) + (30 - (depth * 5)),
          // Vary speed based on depth - deeper layers move slower
          speed: Math.random() * (80 - (depth * 20)) + (30 - (depth * 5)),
          // Vary opacity based on depth
          opacity: (Math.random() * 0.03 + 0.02) / depth,
          depth
        });
      }

      setParticles(newParticles);
    };

    // Create stars (small, twinkling points of light)
    const createStars = () => {
      const newStars: Star[] = [];
      // More stars in dark mode
      const starCount = isDark ? (window.innerWidth < 768 ? 30 : 60) : (window.innerWidth < 768 ? 15 : 30);

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1, // Small stars
          opacity: Math.random() * 0.5 + 0.3,
          blinkSpeed: Math.random() * 3 + 2 // Blink speed in seconds
        });
      }

      setStars(newStars);
    };

    createParticles();
    createStars();

    // Recreate on window resize
    const handleResize = () => {
      createParticles();
      createStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDark]);

  // Calculate parallax movement based on mouse position
  const getParallaxStyle = (depth: number) => {
    // Deeper layers (higher depth) move less
    const moveFactor = (4 - depth) * 15; // Layer 1 moves most, layer 3 moves least

    return {
      transform: `translate(${-mousePosition.x * moveFactor}px, ${-mousePosition.y * moveFactor}px)`,
    };
  };

  // Create a central radial glow effect
  const centralGlow = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
    width: "150vh",
    height: "150vh",
    background: isDark
      ? "radial-gradient(circle, rgba(235, 225, 205, 0.12) 0%, rgba(235, 225, 205, 0) 70%)"
      : "radial-gradient(circle, rgba(235, 225, 205, 0.1) 0%, rgba(235, 225, 205, 0) 70%)",
    opacity: 0.9,
    animation: "pulse 15s ease-in-out infinite alternate",
    transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
  };

  // Create secondary glow effects
  const topLeftGlow = {
    position: "fixed",
    top: "-10%",
    left: "-10%",
    width: "50%",
    height: "50%",
    background: isDark
      ? "radial-gradient(circle, rgba(235, 225, 205, 0.08) 0%, rgba(235, 225, 205, 0) 70%)"
      : "radial-gradient(circle, rgba(235, 225, 205, 0.06) 0%, rgba(235, 225, 205, 0) 70%)",
    opacity: 0.8,
    transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
    transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
  };

  const bottomRightGlow = {
    position: "fixed",
    bottom: "-15%",
    right: "-15%",
    width: "60%",
    height: "60%",
    background: isDark
      ? "radial-gradient(circle, rgba(235, 225, 205, 0.07) 0%, rgba(235, 225, 205, 0) 70%)"
      : "radial-gradient(circle, rgba(235, 225, 205, 0.05) 0%, rgba(235, 225, 205, 0) 70%)",
    opacity: 0.7,
    transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`,
    transition: "transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)",
  };

  return (
    <>
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-[-3] bg-gradient-elegant overflow-hidden"
      >
        {/* Layered background elements */}
        <div className="fixed inset-0 z-[-2] bg-depth-layer-1" />
        <div className="fixed inset-0 z-[-2] bg-depth-layer-2" />

        {/* Glow effects */}
        <div style={centralGlow} className="z-[-2]" />
        <div style={topLeftGlow} className="z-[-2]" />
        <div style={bottomRightGlow} className="z-[-2]" />

        {/* Stars (small twinkling points) */}
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.blinkSpeed}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Parallax particle layers */}
        {[1, 2, 3].map((layer) => (
          <div
            key={`layer-${layer}`}
            className="absolute inset-0"
            style={getParallaxStyle(layer)}
          >
            {particles
              .filter(p => p.depth === layer)
              .map((particle) => (
                <div
                  key={`particle-${particle.id}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    background: isDark
                      ? `radial-gradient(circle, rgba(235, 225, 205, ${particle.opacity}) 0%, rgba(235, 225, 205, 0) 70%)`
                      : `radial-gradient(circle, rgba(235, 225, 205, ${particle.opacity}) 0%, rgba(235, 225, 205, 0) 70%)`,
                    animation: `float ${particle.speed}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
          </div>
        ))}
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 z-[-1] bg-noise opacity-[0.03]" />
    </>
  );
}
