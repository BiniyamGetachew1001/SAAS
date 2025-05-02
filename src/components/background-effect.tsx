"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export function BackgroundEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Create particles only on client-side
    const createParticles = () => {
      const newParticles: Particle[] = [];
      // Fewer particles for a more elegant, subtle effect
      const particleCount = window.innerWidth < 768 ? 8 : 15;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          // Larger, softer particles to mimic the light rays in the image
          size: Math.random() * 60 + 20,
          // Slower movement for a more elegant effect
          speed: Math.random() * 60 + 30,
          // More subtle opacity
          opacity: Math.random() * 0.04 + 0.02,
        });
      }

      setParticles(newParticles);
    };

    createParticles();

    // Recreate particles on window resize
    const handleResize = () => {
      createParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create a central radial glow effect similar to the neuropsychology image
  const centralGlow = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "150vh",
    height: "150vh",
    background: isDark
      ? "radial-gradient(circle, rgba(235, 225, 205, 0.1) 0%, rgba(235, 225, 205, 0) 70%)"
      : "radial-gradient(circle, rgba(235, 225, 205, 0.08) 0%, rgba(235, 225, 205, 0) 70%)",
    opacity: 0.8,
    animation: "pulse 15s ease-in-out infinite alternate",
  };

  return (
    <>
      <div className="fixed inset-0 z-[-2] bg-gradient-elegant overflow-hidden">
        {/* Central radial glow effect */}
        <div style={centralGlow} />

        {/* Subtle floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
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
      <div className="fixed inset-0 z-[-1] bg-noise opacity-[0.02]" />
    </>
  );
}
