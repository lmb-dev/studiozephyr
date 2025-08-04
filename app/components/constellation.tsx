'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ResponsiveGridPosition {
  desktop: {row: number; column: number};
  mobileVertical: {row: number; column: number};
  mobileHorizontal: {row: number; column: number};
}

interface ConstellationProps {
  label: string;
  href: string;
  external?: boolean;
  gridPosition: ResponsiveGridPosition;
}

// Custom hook to detect screen size and orientation
const useResponsiveGrid = () => {
  const [screenType, setScreenType] = useState<'desktop' | 'mobileVertical' | 'mobileHorizontal'>('desktop');

  useEffect(() => {
    const checkScreenType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width <= 768) {
        // Mobile device
        if (height > width) {
          setScreenType('mobileVertical');
        } else {
          setScreenType('mobileHorizontal');
        }
      } else {
        setScreenType('desktop');
      }
    };

    // Check on mount
    checkScreenType();

    // Add event listeners
    window.addEventListener('resize', checkScreenType);
    window.addEventListener('orientationchange', () => {
      // Delay to allow orientation change to complete
      setTimeout(checkScreenType, 100);
    });

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

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className="constellation flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
      style={{
        gridRow: `${currentPosition.row}`,
        gridColumn: `${currentPosition.column}`,
        justifySelf: 'center',
        alignSelf: 'center',
        width: sizeClass,
        height: sizeClass,
      }}
    >
      <svg viewBox="0 0 100 100" className="mb-2 w-full h-auto">
        {patterns.stars.map((star, idx) => (
          <circle
            key={idx}
            className="constellation-star"
            cx={star.cx}
            cy={star.cy}
            r={2.5}
          />
        ))}
        {patterns.lines.map((line, idx) => (
          <line
            key={idx}
            className="constellation-line"
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
          />
        ))}
      </svg>
      <span className="constellation-label">{label}</span>
    </Link>
  );
};

export default Constellation;