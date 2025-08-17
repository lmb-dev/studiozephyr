'use client'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import moonImage from '@/public/moon.webp'

export default function Header() {
  const isHome = usePathname() === '/'

  return (
    <header className="h-[10svh]">
      <div className="relative">
        <motion.h1 
          initial={false}
          animate={{
            wordSpacing: isHome ? '0em' : '1em',
          }}
          transition={{ duration: 1.25, ease: "easeInOut" }}
        >
          Studio Zephyr
        </motion.h1>

      </div>
      <Link href={isHome ? '/portfolio' : '/'}>
        <motion.div
          initial={false}
          className='constellation absolute left-1/2 -translate-x-1/2 -ml-0.5'
          animate={{
            top: isHome ? '30vh' : '0.1rem',
            height: isHome ? 'clamp(124px, 15vw, 256px)' : 'clamp(56px, 5vw, 96px)',
            width: isHome ? 'clamp(124px, 15vw, 256px)' : 'clamp(56px, 5vw, 96px)',
          }}
          whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.3))" }}
          transition={{
            duration: 1.25, 
            delay: 0.1,
            ease: "easeInOut", 
            scale: { duration: 0.3, ease: "easeInOut" }
          }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isHome ? 65 : -5 }}
            transition={{ duration: 1.25, delay: 0.1, ease: "easeInOut" }}
          >
            <Image src={moonImage} alt="Moon Button" priority />
          </motion.div>
          {isHome && <motion.span          
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }} 
            className="label absolute top-[95%] -translate-x-1/2">Artwork
          </motion.span>}

          {!isHome && <motion.span          
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }} 
            className="text-xs md:text-base allura absolute top-[25%] -translate-x-1/2">Home
          </motion.span>}        
        </motion.div>
      </Link>
    </header>
  )
}