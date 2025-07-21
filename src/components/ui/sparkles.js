'use client';
import React, { useId, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export const SparklesCore = (props) => {
  const {
    id,
    className,
    minSize,
    maxSize,
    speed,
    particleColor = '#ffffff',
    darkParticleColor = '#ffffff',
    particleDensity,
    lightBackground = '#000000',
    darkBackground = '#000000',
  } = props;

  const [init, setInit] = useState(false);
  const { theme } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    const initialize = async () => {
      const { initParticlesEngine } = await import('@tsparticles/react');
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setInit(true);
    };
    
    initialize();
  }, []);

  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  const generatedId = useId();
  const isDarkMode = theme === 'dark';

  return (
    <motion.div animate={controls} className={cn('opacity-0', className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn('h-full w-full')}
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: isDarkMode ? darkBackground : lightBackground,
              },
            },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: 'push' },
                onHover: { enable: false, mode: 'repulse' },
                resize: true,
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: {
                value: isDarkMode ? darkParticleColor : particleColor,
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                value: particleDensity || 120,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed: speed || 4,
                  sync: false,
                },
              },
              size: {
                value: {
                  min: minSize || 1,
                  max: maxSize || 3,
                },
              },
              move: {
                enable: true,
                speed: { min: 0.1, max: 1 },
                direction: 'none',
                outModes: { default: 'out' },
              },
              shape: {
                type: 'circle',
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};