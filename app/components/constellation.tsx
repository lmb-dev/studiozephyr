'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponsiveGridPosition {
  desktopVertical: { row: number; column: number };
  desktopHorizontal: { row: number; column: number };
  mobileVertical: { row: number; column: number };
  mobileHorizontal: { row: number; column: number };
}

interface ConstellationProps {
  label: string;
  href: string;
  external?: boolean;
  gridPosition: ResponsiveGridPosition;
}

// Custom hook to detect screen size and orientation
const useResponsiveGrid = () => {
  const [screenType, setScreenType] = useState<'desktopVertical' | 'desktopHorizontal' | 'mobileVertical' | 'mobileHorizontal'>('desktopHorizontal');

  useEffect(() => {
    const checkScreenType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width <= 768) {
        if (height > width) {
          setScreenType('mobileVertical');
        } else {
          setScreenType('mobileHorizontal');
        }
      } else {
        if (height > width) {
          setScreenType('desktopVertical');
        } else {
          setScreenType('desktopHorizontal');
        }
      }
    };

    // Check on mount
    checkScreenType();

    // Add event listeners
    window.addEventListener('resize', checkScreenType);
    window.addEventListener('orientationchange', () => {setTimeout(checkScreenType, 100)}); // Delay to allow orientation change to complete

    return () => {
      window.removeEventListener('resize', checkScreenType);
      window.removeEventListener('orientationchange', checkScreenType);
    };
  }, []);

  return screenType;
};

// Simple zodiac constellations - horizontally centered in 100x100 viewport
const constellationPatterns = {
  "About Me": {
    stars: [
      { cx: 50, cy: 55 }, 
      { cx: 40, cy: 65 },  
      { cx: 60, cy: 65 },  
      { cx: 25, cy: 50 },  
      { cx: 75, cy: 50 },  
      { cx: 50, cy: 80 },  
    ],
    lines: [
      { x1: 25, y1: 50, x2: 40, y2: 65 },  
      { x1: 40, y1: 65, x2: 50, y2: 55 },  
      { x1: 50, y1: 55, x2: 60, y2: 65 }, 
      { x1: 60, y1: 65, x2: 75, y2: 50 },  
      { x1: 40, y1: 65, x2: 50, y2: 80 },  
      { x1: 60, y1: 65, x2: 50, y2: 80 }, 
    ],
  },
  "Contact": {
    stars: [
      { cx: 17.5, cy: 75 },  
      { cx: 37.5, cy: 80 },  
      { cx: 57.5, cy: 85 }, 
      { cx: 72.5, cy: 75 },  
      { cx: 82.5, cy: 60 },  
    ],
    lines: [
      { x1: 17.5, y1: 75, x2: 37.5, y2: 80 }, 
      { x1: 37.5, y1: 80, x2: 57.5, y2: 85 },  
      { x1: 57.5, y1: 85, x2: 72.5, y2: 75 }, 
      { x1: 72.5, y1: 75, x2: 82.5, y2: 60 },
    ],
  },
  "Testimonials": {
    stars: [
      { cx: 27.5, cy: 25 }, 
      { cx: 77.5, cy: 35 }, 
      { cx: 42.5, cy: 50 },  
      { cx: 57.5, cy: 52 },  
      { cx: 72.5, cy: 54 },  
      { cx: 32.5, cy: 80 }, 
      { cx: 67.5, cy: 85 },  
    ],
    lines: [
      { x1: 27.5, y1: 25, x2: 42.5, y2: 50 },  
      { x1: 77.5, y1: 35, x2: 72.5, y2: 54 },  
      { x1: 42.5, y1: 50, x2: 57.5, y2: 52 }, 
      { x1: 57.5, y1: 52, x2: 72.5, y2: 54 },  
      { x1: 42.5, y1: 50, x2: 32.5, y2: 80 }, 
      { x1: 72.5, y1: 54, x2: 67.5, y2: 85 }, 
    ],
  }
};

const Constellation: React.FC<ConstellationProps> = ({ label, href, external = false, gridPosition }) => {
  const patterns = constellationPatterns[label as keyof typeof constellationPatterns];
  const sizeClass = 'clamp(154px, 15vw, 225px)';
  const screenType = useResponsiveGrid();

  // Get current position based on screen type
  const currentPosition = gridPosition[screenType];

  // Layout transition for position changes
  const layoutTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  };

  // Main animation transition
  const mainTransition = {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  };



  return (
    <motion.div
      key={`${screenType}-${label}`} // Key changes trigger re-mount for position changes
      layout
      layoutId={label} // Consistent layoutId for smooth transitions
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        ...mainTransition,
        layout: layoutTransition,
      }}
      className="constellation"
      style={{
        gridRow: currentPosition.row,
        gridColumn: currentPosition.column,
        justifySelf: 'center',
        alignSelf: 'center',
        width: sizeClass,
        height: sizeClass,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        className="flex flex-col items-center justify-center w-full h-full transition-all duration-300 ease-in-out hover:scale-105"
      >
        <svg viewBox="0 0 100 100">
          {patterns.stars.map((star, idx) => (
            <motion.circle
              key={idx}
              className="constellation-star"
              cx={star.cx}
              cy={star.cy}
              r={2.5}
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.3 + idx * 0.09, 
                duration: 0.5,
                type: "spring" as const,
                stiffness: 120,
                damping: 20
              }}
            />
          ))}
          {patterns.lines.map((line, idx) => (
            <motion.line
              key={idx}
              className="constellation-line"
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                delay: 0.5 + idx * 0.15,
                duration: 0.6,
                ease: "easeInOut" as const
              }}
            />
          ))}
        </svg>
        <motion.span 
          className="constellation-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default Constellation;