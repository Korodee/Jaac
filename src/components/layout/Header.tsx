'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
  { name: 'Subscribe', href: '/subscribe', isSpecial: true },
];

const MotionLink = motion(Link);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3 border-b border-purple-100' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Logo isScrolled={pathname === '/about' ? true : isScrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <MotionLink 
                  key={item.name}
                  href={item.href}
                  className={`relative px-5 py-2 rounded-xl transition-all duration-300 ${
                    item.isSpecial
                      ? 'ml-2 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40'
                      : isScrolled
                        ? isActive
                          ? 'text-purple-600 font-medium'
                          : 'text-gray-600 hover:text-purple-600'
                        : isActive
                          ? 'text-white font-medium'
                          : 'text-white/90 hover:text-white'
                  }`}
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-sm font-medium tracking-wide">
                    {item.name}
                  </span>
                  {!item.isSpecial && (isActive || hoveredItem === item.name) && (
                    <motion.div
                      layoutId="navBackground"
                      className={`absolute inset-0 rounded-xl -z-10 ${
                        isScrolled 
                          ? 'bg-purple-50' 
                          : 'bg-white/10 backdrop-blur-sm'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </MotionLink>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            className={`md:hidden relative z-10 p-2 rounded-lg transition-colors ${
              pathname === '/about' || isScrolled 
                ? 'text-gray-600 hover:bg-purple-50' 
                : 'text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Close button */}
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed top-6 right-6 p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transform transition-transform duration-200 hover:scale-110 z-50"
                aria-label="Close menu"
              >
                <HiX size={24} />
              </button>

              <motion.nav 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-col space-y-4 bg-gradient-to-b from-purple-900 to-indigo-900 p-6 rounded-2xl mx-4 w-full max-w-sm border border-white/10 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <MotionLink 
                      key={item.name}
                      href={item.href}
                      className={`relative px-6 py-3 rounded-xl transition-all duration-200 ${
                        item.isSpecial
                          ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white font-medium shadow-lg'
                          : isActive
                            ? 'bg-white/20 text-white font-medium'
                            : 'text-white/90 hover:bg-white/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ scale: 1.02, x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="block text-base font-medium"
                      >
                        {item.name}
                      </motion.span>
                    </MotionLink>
                  );
                })}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
} 