'use client'
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ImageDisplay from '../components/imageDisplay';
import Link from 'next/link';

interface Artwork {
  name: string;
  collection: string;
  category: string;
  imageURL: string;
}

export default function Portfolio() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CDN_URL}/settings.json`)   
        if (!response.ok) throw new Error('Failed to fetch settings')

        const settings: Settings = await response.json()
        setArtworks(settings.art);
        setCategories(Object.keys(settings.categories))

      } catch (err) {
        console.error('Error loading testimonials:', err)
      } 
    }

    fetchCategories()
  }, [])

  const getArtworksByCategory = (category: string) => {
    return artworks.filter(artwork => artwork.category === category);
  };

  return (
    <div className="container">
      <div className="title-section">
        <h2 className="text-5xl md:text-8xl">
          ART PORTFOLIO
        </h2>
        <p>
          Various pieces I've worked on, exploring different styles and techniques
        </p>
      </div>

      <div className="w-full space-y-16">
        {categories.map((category, index) => {
          let categoryArtworks = getArtworksByCategory(category);
          categoryArtworks = [...categoryArtworks].sort(() => Math.random() - 0.5);
          
          return (
            <div key={category} className="w-full">
              <h3 className="uppercase text-3xl md:text-5xl font-bold mx-4">
                {category}
              </h3>
              
              <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={35}
                  slidesPerView="auto"
                  loop={true}
                  autoplay={{delay: 0, pauseOnMouseEnter: true,}}
                  speed={5000 + (index * 500)} 
                  cssMode={false}
                >
                  {[...categoryArtworks, ...categoryArtworks].map((artwork, artIndex) => (
                    <SwiperSlide key={`${artwork.name}-${artIndex}`} style={{ width: 'auto' }}>
                      <ImageDisplay 
                        imageUrl={artwork.imageURL} 
                        name={artwork.name} 
                        isGrid={false}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="flex justify-center mt-6">
                <Link href={`/portfolio/${category}`} className="cta-button">
                  VIEW FULL COLLECTION
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}