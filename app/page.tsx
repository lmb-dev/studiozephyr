'use client'
import React from 'react';
import Constellation from './components/constellation';


const NightSkyPage: React.FC = () => {
  return (
    <div className="flex flex-col relative">
      {/* Global styles for constellation elements */}
      <style jsx global>{`
        .constellation {
          transition: transform 0.3s ease-in-out;
          cursor: pointer;
        }
        .constellation:hover {
          transform: scale(1.1);
        }
        .constellation-star {
          fill: white;
        }
        .constellation-line {
          stroke: rgba(255, 255, 255, 0.7);
          stroke-width: 1.5;
        }
        .constellation-label {
          fill: #e0e0e0;
          font-size: 14px;
          text-anchor: middle;
          font-weight: bold;
        }
      `}</style>

      {/* 12x12 Grid layout for constellations within full viewport height */}
      <section className="grid grid-cols-12 grid-rows-12 h-[90svh]">
        <Constellation
          label="About Me"
          href="/about"
          gridPosition={{
            desktopHorizontal: { row: 2, column: 9 },
            desktopVertical: { row: 1, column: 9 },
            mobileVertical: { row: 2, column: 10 },
            mobileHorizontal: { row: 4, column: 9 }
          }}
        />
        <Constellation
          label="Testimonials"
          href="/testimonials"
          external
          gridPosition={{
            desktopHorizontal: { row: 4, column: 4 },
            desktopVertical: { row: 2, column: 4 },
            mobileVertical: { row: 4, column: 2 },
            mobileHorizontal: { row: 7, column: 4 }
          }}
        />
        <Constellation
          label="Contact"
          href="/contact"
          gridPosition={{
            desktopHorizontal: { row: 7, column: 8 },
            desktopVertical: { row: 5, column: 8 },
            mobileVertical: { row: 6, column: 9 },
            mobileHorizontal: { row: 9, column: 10 }
          }}
        />
      </section>


    </div>
  );
};

export default NightSkyPage;