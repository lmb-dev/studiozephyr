'use client'
import React from 'react';
import Constellation from './components/constellation';


export default function Home() {
  return (
    <section className="grid grid-cols-12 grid-rows-12 h-[90svh]">
      <Constellation
        label="About Me"
        href="/about"
        gridPosition={{
          desktopHorizontal: { row: 2, column: 10 },
          desktopVertical: { row: 1, column: 9 },
          mobileVertical: { row: 2, column: 10 },
          mobileHorizontal: { row: 2, column: 10 }
        }}
      />
      <Constellation
        label="Testimonials"
        href="/testimonials"
        gridPosition={{
          desktopHorizontal: { row: 3, column: 3 },
          desktopVertical: { row: 2, column: 4 },
          mobileVertical: { row: 3, column: 3 },
          mobileHorizontal: { row: 4, column: 4 }
        }}
      />
      <Constellation
        label="Contact"
        href="/contact"
        gridPosition={{
          desktopHorizontal: { row: 6, column: 9 },
          desktopVertical: { row: 4, column: 10 },
          mobileVertical: { row: 6, column: 10 },
          mobileHorizontal: { row: 8, column: 11 }
        }}
      />
      <Constellation
        label="Etsy"
        href="https://www.etsy.com/uk/shop/MoongazeyMe"
        external
        gridPosition={{
          desktopHorizontal: { row: 7, column: 4 },
          desktopVertical: { row: 5, column: 3 },
          mobileVertical: { row: 7, column: 3 },
          mobileHorizontal: { row: 7, column: 2 }
        }}
      />
      <Constellation
        label="Livestream"
        href="/livestream"
        gridPosition={{
          desktopHorizontal: { row: 9, column: 7 },
          desktopVertical: { row: 7, column: 7 },
          mobileVertical: { row: 9, column: 7 },
          mobileHorizontal: { row: 9, column: 8 }
        }}
      />
    </section>
  );
};