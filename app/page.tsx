'use client'
import React from 'react';
import Constellation from './components/constellation';
import { FaGithub } from "react-icons/fa6";
import Link from 'next/link';

const NightSkyPage: React.FC = () => {
  return (
    <div className="flex flex-col relative">
      {/* Global styles for constellation elements */}
      <style jsx global>{`
        .constellation {
          transition: transform 0.3s ease;
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
      <section className="grid grid-cols-12 grid-rows-12 h-[100svh]">
        <Constellation
          label="About Me"
          href="/about"
          gridPosition={{
            desktop: { row: 3, column: 9 },
            mobileVertical: { row: 3, column: 9 },
            mobileHorizontal: { row: 4, column: 9 }
          }}
        />
        <Constellation
          label="Testimonials"
          href="/testimonials"
          external
          gridPosition={{
            desktop: { row: 5, column: 4 },
            mobileVertical: { row: 4, column: 3 },
            mobileHorizontal: { row: 7, column: 4 }
          }}
        />
        <Constellation
          label="Contact"
          href="/contact"
          gridPosition={{
            desktop: { row: 8, column: 8 },
            mobileVertical: { row: 7, column: 9 },
            mobileHorizontal: { row: 9, column: 10 }
          }}
        />
      </section>

      {/* Footer GitHub link */}
      <Link
        href="https://github.com/lmb-dev"
        target="_blank"
        className="absolute bottom-0 left-5 opacity-25 hover:opacity-100 flex text-sm gap-2 transition"
      >
        Site by lmb-dev
        <FaGithub />
      </Link>
    </div>
  );
};

export default NightSkyPage;