'use client'
import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="container">
      <div className="title-section">
        <h2 className="text-5xl md:text-8xl">
          LIVESTREAM
        </h2>
        
        <p><a href='https://twitch.tv/twitch.tv/xzephyria_'>twitch.tv/xzephyria_</a></p>
      </div>
        
      <div className="flex flex-col lg:flex-row gap-4">
        <iframe
          src="https://player.twitch.tv/?channel=xzephyria_&parent=localhost"
          className="w-full h-64 sm:h-80 lg:h-[480px] rounded-lg shadow-lg"
          allowFullScreen       
        />
        <iframe
          src="https://www.twitch.tv/embed/xzephyria_/chat?parent=localhost&darkpopout"
          className="h-64 sm:h-80 lg:h-[480px] rounded-lg shadow-lg"       
        />
      </div>
    </div>
  );
}