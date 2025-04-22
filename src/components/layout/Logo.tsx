'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LogoProps {
  isScrolled?: boolean;
}

export default function Logo({ isScrolled: externalIsScrolled }: LogoProps) {
  const [internalIsScrolled, setInternalIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';
  
  // Use external isScrolled if provided, otherwise use internal state
  const isScrolled = externalIsScrolled !== undefined ? externalIsScrolled : internalIsScrolled;

  useEffect(() => {
    // Only set up scroll listener if external isScrolled is not provided
    if (externalIsScrolled === undefined) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setInternalIsScrolled(scrollPosition > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [externalIsScrolled]);

  // Determine if the logo should be purple
  const shouldBePurple = isScrolled ;

  return (
    <Link href="/" className="relative inline-block">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="relative w-[4rem] h-[5rem] md:w-[5rem] md:h-[6rem]">
          <Image
            src="/jaac-logo2.png"
            alt="JAAC Logo"
            fill
            className={`object-contain transition-all duration-500 ${shouldBePurple ? 'brightness-100' : 'brightness-0 invert'}`}
            priority
          />
        </div>
      </motion.div>
    </Link>
  );
} 