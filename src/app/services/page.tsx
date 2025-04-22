'use client';

import Services from '@/components/sections/Services';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-[8rem] pb-[5rem] overflow-hidden bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 text-transparent bg-clip-text">
                Our Services
              </h1>
              <p className="text-xl text-gray-300">
                Discover our comprehensive range of psychological and mental health services designed to support your well-being journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <Services />
      </main>
      <Footer />
    </>
  );
} 