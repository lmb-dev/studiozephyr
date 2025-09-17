import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface ImageHoverProps {
  imageUrl: string
  name: string
  isGrid?: boolean
}

export default function ImageDisplay({ imageUrl, name, isGrid = true }: ImageHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  // Modal content to be rendered in portal
  const modalContent = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
          role="button"
        >
          <div className="relative w-[100vw] h-[90vh]">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain"
              quality={100}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 md:p-8">
              <h3 className="text-2xl md:text-4xl allura">{name}</h3>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        className={`relative ${!isGrid && 'min-w-64 min-h-48 w-[25vw] h-[15vw]'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={imageUrl}
          alt={name}
          width={1024}
          height={720}
          className={`w-full h-full  ${isGrid ? 'rounded-lg' : 'object-cover'}`}
          quality={75}
        />
        <div className={`absolute inset-0 flex justify-center bg-[var(--bg1)]/90 transition duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-3xl top-1/6 allura absolute p-1">{name}</span>
          <span className="font-bold text-md bottom-1/6 uppercase absolute">View Full</span>
        </div>
      </button>

      {/* Portal for modal */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  )
}