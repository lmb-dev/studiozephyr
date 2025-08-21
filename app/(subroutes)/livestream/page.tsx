'use client'
import React from 'react';

export default function Contact() {
  return (
    <div className="container">
      <div className="title-section">
        <h2 className="text-5xl md:text-8xl">
          LIVESTREAM
        </h2>
        <p>
          Join me for gaming and creative streams most evenings at:<br /> <a href='https://twitch.tv/xzephyria_'>twitch.tv/xzephyria_</a>
        </p>
      </div>
        
      <div className="flex flex-col lg:flex-row gap-4">
        <iframe
          src="https://player.twitch.tv/?channel=xzephyria_&parent=studiozephyr.art"
          className="w-full h-64 sm:h-80 lg:h-[500px] rounded-lg shadow-lg"
          allowFullScreen       
        />
        <iframe
          src="https://www.twitch.tv/embed/xzephyria_/chat?parent=studiozephyr.art&darkpopout"
          className="h-64 sm:h-80 lg:h-[500px] rounded-lg shadow-lg"       
        />
      </div>
    </div>
  );
}