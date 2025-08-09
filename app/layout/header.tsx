'use client'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Link } from "next-view-transitions";
import Image from 'next/image'

export default function Header() {
  const isHome = usePathname() === '/'

  return (
    <header className={`${isHome ? 'relative ' : 'sticky'} h-[10svh]`}>

      <motion.h1 
        initial={false}
        animate={{
          wordSpacing: isHome ? '0em' : '1.5em',
        }}
        transition={{duration: 1, ease: "easeInOut"}}
      >
        Studio Zephyr
      </motion.h1>
      
      <Link href={isHome ? '/portfolio' : '/'}>
        <motion.div
          initial={false}
          className='constellation absolute left-1/2 -translate-x-1/2 -ml-1'
          animate={{
            top: isHome ? '25vh' : '0.5rem',
            height: isHome ? 'clamp(100px, 15vw, 200px)' : 'clamp(48px, 6vw, 72px)',
            width: isHome ? 'clamp(100px, 15vw, 200px)' : 'clamp(48px, 6vw, 72px)',
          }}
          whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.25))" }}
          transition={{
            duration: 1, 
            delay: 0.1,
            ease: "easeInOut", 
            scale: { duration: 0.3, ease: "easeInOut" }
          }}
        >
          <Image
            src="/moon.webp"
            alt="Moon Button"
            fill
            sizes='100%'
            priority
            className='moon'
          />
          {isHome && <motion.span          
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }} 
            className="label absolute top-[110%] -translate-x-1/2 -translate-y-1/2">Artwork
          </motion.span>}
        </motion.div>
      </Link>
    </header>
  )
}