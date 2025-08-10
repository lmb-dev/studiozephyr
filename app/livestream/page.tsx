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
        
        <p className="italic">twitch.tv/xzephyria_</p>
      </div>
        
      <div className="flex flex-col lg:flex-row gap-4">
        <motion.iframe
          src="https://player.twitch.tv/?channel=xzephyria_&parent=localhost"
          className="w-full h-64 sm:h-80 lg:h-[480px] rounded-lg shadow-lg"
          allowFullScreen
          whileHover={{ scale: 1.025}}
          transition={{
            duration: 1, 
            delay: 0.1,
            ease: "easeInOut", 
            scale: { duration: 0.3, ease: "easeInOut" }
          }}        
        />
        <motion.iframe
          src="https://www.twitch.tv/embed/xzephyria_/chat?parent=localhost&darkpopout"
          className="h-64 sm:h-80 lg:h-[480px] rounded-lg shadow-lg"
          whileHover={{ scale: 1.025}}
          transition={{
            duration: 1, 
            delay: 0.1,
            ease: "easeInOut", 
            scale: { duration: 0.3, ease: "easeInOut" }
          }}        
        />
      </div>
    </div>
  );
}