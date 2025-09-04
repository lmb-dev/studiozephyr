'use client'
import { useState, useEffect } from 'react';
import { fetchSettings } from "@/app/utils/fetchSettings";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ImageDisplay from '@/app/components/imageDisplay';
import Link from 'next/link';


export default function Portfolio() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchSettings().then((s) => {
      if (s) {
        setArtworks(s.art);
        setCategories(Object.keys(s.categories));
      }
    });
  }, []);

  const getArtworksByCategory = (category: string) => {
    const filtered = artworks.filter(artwork => artwork.category === category);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
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
        {categories.map((category) => {
          const categoryArtworks = getArtworksByCategory(category);
          
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