'use client'
import React from 'react';
import ImageDisplay from '../components/imageDisplay';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      TESTETSTST
      <ImageDisplay imageUrl="/art1.jpg" name="Beautiful Landscape" isGrid={true} />
      <ImageDisplay imageUrl="/gen.webp" name="Beautiful Landscape" isGrid={true} />
      <ImageDisplay imageUrl="/art2.jpg" name="Beautiful Landscape 2" isGrid={false} />
      <ImageDisplay imageUrl="/gen.webp" name="Beautiful Landscape 2" isGrid={false} />
    </div>
  );
};

export default Contact;