'use client'
import React from 'react';
import Constellation from './components/constellation';


const NightSkyPage: React.FC = () => {
  return (
    <div className="flex flex-col relative">

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