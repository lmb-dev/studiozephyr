'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Masonry from 'react-masonry-css';
import ImageDisplay from '../../components/imageDisplay';
import Link from 'next/link';

interface Artwork {
  name: string;
  collection: string;
  category: string;
  imageURL: string;
}

export default function CategoryPortfolio() {
  const params = useParams();
  const category = params.category as string;
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [collections, setCollections] = useState<string[]>([]);

  useEffect(() => {
    // Load the JSON data and filter by category
    fetch('/art.json')
      .then(res => res.json())
      .then((data) => {
        const artworksData = data as Artwork[];
        
        // Filter artworks by the current category
        const categoryArtworks = artworksData.filter(
          artwork => artwork.category.toLowerCase() === decodeURIComponent(category).toLowerCase()
        );
        
        setArtworks(categoryArtworks);
        
        // Get unique collections within this category
        const uniqueCollections = [...new Set(categoryArtworks.map(artwork => artwork.collection))];
        setCollections(uniqueCollections);
      })
      .catch(err => {
        console.error('Error loading artwork data:', err);
      });
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