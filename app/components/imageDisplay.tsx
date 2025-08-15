import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageHoverProps {
  imageUrl: string
  name: string
  isGrid?: boolean
}

export default function ImageDisplay({ imageUrl, name, isGrid = true }: ImageHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      <button
        className={`relative ${isGrid ? 'max-w-sm' : 'w-128 h-96'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={imageUrl}
          alt={name}
          width={640}
          height={480}
          className={`w-full h-full transition-all duration-300 ${isGrid ? 'object-contain' : 'object-cover'}`}
        />
        <div
          className={`absolute inset-0 bg-[var(--bg1)]/90 flex justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-bold text-3xl top-1/6 tangerine absolute">{name}</span>
          <span className="font-bold text-md bottom-1/6 uppercase absolute">Learn More</span>
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed -inset-1 bg-black flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            role="button"
          >
            <div
              className="relative w-[100vw] h-[90vh] mx-8"
            >
              {/* Close button */}
              <button
                className="absolute top-5 right-0 text-white hover:text-gray-300 transition-colors z-10"
                onClick={() => setIsModalOpen(false)}
              >
              </button>

              {/* High quality image */}
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-contain"
                quality={100}
              />
              
              {/* Image name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <h3 className="text-white text-2xl md:text-4xl font-medium tangerine">{name}</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}