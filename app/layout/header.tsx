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
            wordSpacing: isHome ? '0em' : '1.2em',
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Studio Zephyr
        </motion.h1>

      </div>
      <Link href={isHome ? '/portfolio' : '/'}>
        <motion.div
          initial={false}
          className='constellation absolute left-1/2 -translate-x-1/2 -ml-1'
          animate={{
            top: isHome ? '30vh' : '0.75rem',
            height: isHome ? 'clamp(100px, 15vw, 200px)' : 'clamp(45px, 4vw, 82px)',
            width: isHome ? 'clamp(100px, 15vw, 200px)' : 'clamp(45px, 4vw, 82px)',
          }}
          whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.3))" }}
          transition={{
            duration: 1, 
            delay: 0.1,
            ease: "easeInOut", 
            scale: { duration: 0.3, ease: "easeInOut" }
          }}
        >
          <Image src={moonImage} alt="Moon Button" priority />
          {isHome && <motion.span          
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }} 
            className="label absolute top-[105%] -translate-x-1/2">Artwork
          </motion.span>}
        </motion.div>
      </Link>
    </header>
  )
}