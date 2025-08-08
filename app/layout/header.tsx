'use client'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const isHome = usePathname() === '/'

  return (
    <header className={`${isHome ? 'relative ' : 'sticky'} h-[10svh] pl-2`}>
      <style jsx global>{`
        .moon-text {
          position: absolute;
          top: 110%;
          transform: translate(-50%, -50%);
          font-weight: bold;
          color: #e0e0e0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          text-transform: uppercase;
          z-index: 2;
          font-size: 16px;
        }

      `}</style>
      
      <motion.h1 
        className="allura"
        initial={false}
        animate={{
          wordSpacing: isHome ? '0em' : '1.5em',
        }}
        transition={{duration: 0.75, ease: "easeInOut"}}
      >
        Studio Zephyr
      </motion.h1>
      
      <Link href={isHome ? '/portfolio' : '/'}>
        <motion.div
          initial={false}
          animate={{
            top: isHome ? '25vh' : '0.5rem',
            height: isHome ? 'clamp(100px, 15vw, 200px)' : 'clamp(48px, 6vw, 72px)',
            width: isHome ? 'clamp(100px, 15vw, 200px)' : 'clamp(48px, 6vw, 72px)',
          }}
          transition={{duration: 0.75, ease: "easeInOut"}}
          style={{
            position: 'absolute',
            left: '50%',
            x: '-50%',
          }}
        >
          <div className='absolute hover:scale-110 transition ease-in-out duration-300 w-full h-full'>
            <Image
              src="/moon.webp"
              alt="Moon Button"
              fill
              sizes='100%'
              priority
              className="moon"
            />
            {isHome && <span className="moon-text constellation-label">Artwork</span>}
          </div>
        </motion.div>
      </Link>
    </header>
  )
}