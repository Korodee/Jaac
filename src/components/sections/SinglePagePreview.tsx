"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaHeart, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

export default function SinglePagePreview() {
  return (
    <section className='relative py-8 bg-gradient-to-b from-purple-50 via-white to-indigo-50 overflow-hidden text-center'>
      {/* Smaller soft heart background illustration */}
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none select-none'>
        <FaHeart className='text-pink-200 opacity-30 blur-2xl w-[180px] h-[180px] md:w-[260px] md:h-[260px]' />
      </div>
      {/* Smaller decorative blobs */}
      <div className='absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-2xl' />
      <div className='absolute top-1/2 right-0 w-40 h-40 bg-indigo-200 rounded-full opacity-20 blur-2xl -translate-y-1/2' />
      <div className='absolute bottom-0 left-1/2 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-2xl -translate-x-1/2' />
      <div className='absolute inset-0 bg-[linear-gradient(45deg,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:48px_48px]' />

      <motion.span
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className='inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg uppercase tracking-widest border border-white/30 mb-4'
        style={{ position: "relative", zIndex: 2 }}
      >
        Nouveau
      </motion.span>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 mb-4 text-white text-2xl shadow-lg mx-auto'
        style={{ position: "relative", zIndex: 2 }}
      >
        <FaHeart />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className='text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text relative z-10'
      >
        Coaching Célibataire
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className='text-lg text-gray-700 mb-5 leading-relaxed max-w-xl mx-auto relative z-10'
      >
        Transformez votre célibat en force. Découvrez comment dépasser les
        blocages amoureux et bâtir des relations authentiques grâce à notre
        accompagnement sur-mesure.
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className='inline-block relative z-10 mb-3'
      >
        <Link href='/single' passHref>
          <span className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg rounded-full shadow-xl border-2 border-transparent hover:border-white/40 transition-all duration-200 cursor-pointer'>
            Découvrir la page Célibataire
            <FaArrowRight className='ml-3' />
          </span>
        </Link>
      </motion.div>
      {/* Short quote/testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className='mt-5 flex flex-col items-center gap-1 relative z-10'
      >
        <FaQuoteLeft className='text-purple-300 text-xl mb-1' />
        <blockquote className='italic text-gray-600 text-base max-w-md'>
          "Rencontrer quelqu'un ne devrait pas combler un vide — mais enrichir
          un bonheur déjà présent."
        </blockquote>
        <span className='text-sm text-gray-400 mt-1'>— L'équipe JAAC</span>
      </motion.div>
    </section>
  );
}
