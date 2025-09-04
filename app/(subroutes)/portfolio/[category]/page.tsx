'use client'
import { useState, useEffect } from 'react';
import { fetchSettings } from "@/app/utils/fetchSettings";
import { useParams } from 'next/navigation';
import Masonry from 'react-masonry-css';
import ImageDisplay from '@/app/components/imageDisplay';
import Link from 'next/link';

export const runtime = 'edge';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
};

export default function CategoryPortfolio() {
  const params = useParams();
  const category = params.category as string;
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [collections, setCollections] = useState<string[]>([]);

  useEffect(() => {
    fetchSettings().then((s) => {
      if (s) {
        const categoryArtworks = s.art.filter(artwork => artwork.category.toLowerCase() === decodeURIComponent(category).toLowerCase());
        setArtworks(categoryArtworks);

        const categoryCollections = s.categories[decodeURIComponent(category)];
        setCollections(categoryCollections);
      }
    });
  }, [category]);

  const getArtworksByCollection = (collection: string) => {
    const filtered = artworks.filter(artwork => artwork.collection === collection);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled;
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
          const collectionArtworks = getArtworksByCollection(collection);
          
          return (
            <div key={collection}>
              <h3 className="uppercase text-3xl md:text-5xl font-bold mx-4 mb-1">
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