'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Masonry from 'react-masonry-css';
import ImageDisplay from '@/app/components/imageDisplay';
import Link from 'next/link';

export const runtime = 'edge';

export default function CategoryPortfolio() {
  const params = useParams();
  const category = params.category as string;
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [collections, setCollections] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_CDN_URL}/settings.json`);
        if (!response.ok) throw new Error('Failed to fetch settings');

        const settings: Settings = await response.json();
        
        // Filter artworks by the current category
        const categoryArtworks = settings.art.filter(artwork => artwork.category.toLowerCase() === decodeURIComponent(category).toLowerCase());
        setArtworks(categoryArtworks);
        
        // Get unique collections within this category
        const categoryCollections = settings.categories[decodeURIComponent(category)];
        setCollections(categoryCollections);

      } catch (err) {
        console.error('Error loading category data:', err);
      }
    };

    fetchCategory();
  }, [category]);

  const getArtworksByCollection = (collection: string) => {
    return artworks.filter(artwork => artwork.collection === collection);
  };

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
  };

  return (
    <div className="container">
      <div className="title-section">
        <h2 className="text-5xl md:text-8xl">
          {decodeURIComponent(category).toUpperCase()}
        </h2>
      </div>

      <div className="space-y-16">
        {collections.map((collection) => {
          let collectionArtworks = getArtworksByCollection(collection);
          collectionArtworks = [...collectionArtworks].sort(() => Math.random() - 0.5);
          
          return (
            <div key={collection}>
              <h3 className="uppercase text-3xl md:text-5xl font-bold mx-4">
                {collection}
              </h3>
              
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-6"
                columnClassName="ml-3"
              >
                {collectionArtworks.map((artwork, index) => (
                  <div key={`${artwork.name}-${index}`} className="mb-1">
                    <ImageDisplay 
                      imageUrl={artwork.imageURL} 
                      name={artwork.name} 
                      isGrid={true}
                    />
                  </div>
                ))}
              </Masonry>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-12">
        <Link href={"/portfolio"} className="cta-button">
          MORE COLLECTIONS
        </Link>
      </div>
    </div>
  );
}