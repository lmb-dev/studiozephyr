'use client'
import Image from 'next/image'
import genImage from '../../public/gen.webp'
import Link from 'next/link';

export default function Contact(){
  return (
    <div className="container">
      <div className="title-section">
        <h2 className="text-5xl md:text-8xl">
          ABOUT ME
        </h2>
      </div>

      {/* Header Section - High resolution image */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className='flex flex-col gap-4 flex-1'>
          <span className='text-lg md:text-2xl flex-1'>
            Hi! I&apos;m Gen, the creator of Studio Zephyr. I started teaching myself digital art and graphic design four years ago as a creative outlet while pursuing my Master&apos;s degree in Environmental Science. Now in the final year of my degree, I aim to become a PhD candidate by 2026. I&apos;ve been lucky enough to work on commissioned designs for clients, which inspired me to establish Studio Zephyr as a business.<br/><br/>
            Take a look around and enjoy! If you like what you see, feel free to reach out with any enquiries.        
          </span>
          <Link href='/contact' className='cta-button mx-auto'>CONTACT ME</Link>
        </div>
        
        <div className="w-82">
          <Image 
            src={genImage} 
            alt="Gen Photo" 
            placeholder="blur"
            priority
            className="shadow-lg rounded-lg rounded-t-full w-full h-auto"
          />
        </div>
      </div>

    </div>
  );
};
