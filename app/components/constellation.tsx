'use client'
import React, { useState, useEffect } from 'react';
import { Link } from "next-view-transitions";
import { motion } from 'framer-motion';

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

    return () => {
      window.removeEventListener('resize', checkScreenType);
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

  return (
      <Link href={href} target={external ? '_blank' : undefined}
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
      <motion.div
        key={`${screenType}-${label}`} // trigger re-mount
        transition={{
          duration: 1, 
          delay: 0.1,
          ease: "easeInOut", 
          scale: { duration: 0.3, ease: "easeInOut" },
        }}
        className="constellation flex flex-col items-center w-full h-full"
        whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.75))" }}
      >
        <svg viewBox="0 0 100 100">
          {patterns.lines.map((line, idx) => (
            <motion.line
              key={idx}
              className="line"
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                delay: 0.5 + idx * 0.15,
                duration: 0.6,
                ease: "easeInOut"
              }}
            />
          ))}
          {patterns.stars.map((star, idx) => (
            <motion.circle
              key={idx}
              className="star"
              cx={star.cx}
              cy={star.cy}
              r={2.5}
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.3 + idx * 0.09, 
                duration: 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
        <motion.span 
          className="label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default Constellation;