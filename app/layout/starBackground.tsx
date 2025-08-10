'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function StarBackground() {

  // #region Particle Count Scaler
  const [isMobile, setIsMobile] = useState(false);
  const [particleCount, setParticleCount] = useState(600); 
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateParticleCount = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      const scaledCount = Math.max(30, Math.min(600, Math.floor((width / 1920) * 600)));
      setParticleCount(scaledCount);
    };

    updateParticleCount(); 
    window.addEventListener("resize", updateParticleCount);

    return () => {
      window.removeEventListener("resize", updateParticleCount);
    };
  }, []);
  // #endregion

  // #region Particle Loader
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // #endregion

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 5,
      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
        },
      },
      particles: {
        color: { value: ["#e0e0e0"] },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.out },
          random: true,
          speed: 0.01,
          straight: false,
        },
        number: {
          value: particleCount,
        },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: { enable: true, speed: 0.5, sync: false, minimumValue: 0.1 },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 0.5, max: 1 },
          animation: { enable: true, speed: 1, sync: false, minimumValue: 0.1 },
        },
        twinkle: {
          particles: {
            enable: true,
            color: "#e0e0e0",
            frequency: 0.1,
            opacity: 1,
          },
        },
        shadow: {
          enable: true,
          color: "#e0e0e0",
          blur: 20,
          offset: { x: 0, y: 0 },
        },
        blur: { enable: true, value: 0.25 },
      },
      detectRetina: true,
      fullScreen: { enable: true },
    }),
    [particleCount]
  );

  return (
    <div ref={particlesContainerRef} className="absolute inset-0 h-full -z-10">
      {init && !isMobile && <Particles id="tsparticles" options={options} />}
    </div>
  );
}
