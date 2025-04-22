"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaHeart, FaStar, FaMoon, FaSun } from "react-icons/fa";

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-20, 0, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const glowAnimation = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.2, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30,
        y: (e.clientY / window.innerHeight) * 30,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-img.JPG"
          alt="Hero Background"
          fill
          className="object-cover object-center opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-purple-800/50 to-indigo-900/50 mix-blend-multiply" />
      </div>

      {/* Animated Background Elements */}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={glowAnimation}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"
          animate={glowAnimation}
        />

        {/* Floating particles that respond to scroll */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: useTransform(
                scrollYProgress,
                [0, 1],
                [0, Math.random() * 100 - 50]
              ),
              x: useTransform(
                scrollYProgress,
                [0, 1],
                [0, Math.random() * 100 - 50]
              ),
              opacity: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                [0.2, 0.5, 0.2]
              ),
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]),
            }}
          />
        ))}

        {/* Animated shapes */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]),
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.3, 0.6, 0.3]
            ),
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, -180]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]),
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.3, 0.6, 0.3]
            ),
          }}
        />
      </div>

      {/* Grid Pattern */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      <div className="relative container mx-auto px-4 min-h-screen flex items-center py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
                We are the link that breaks your isolation
            </motion.h1>

            <motion.p
              className="hidden lg:block text-xl text-gray-300 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Monthly subscriptions now available for everyone!
              <br />
              Psychological support for individuals and businesses.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href="/subscribe">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-medium text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transform transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                    Subscribe Now
                </motion.button>
                  </Link>
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium text-lg hover:bg-white/20 transform transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                    Contact Us
                </motion.button>
                  </Link>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-lg">514-387-1944</span>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* JAAC Logo */}
            <motion.div
              className="absolute inset-0 flex items-center justify-end z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image
                src="/jaac-logo.png"
                alt="JAAC Logo"
                width={700}
                height={700}
                className="w-auto h-auto max-w-full brightness-100 contrast-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                priority
              />
            </motion.div>

            <motion.div
              className="relative w-full aspect-square max-w-2xl mx-auto"
              animate={floatingAnimation}
            >
              {/* Decorative circles */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl"
                animate={glowAnimation}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Animated icons */}
              <motion.div
                className="absolute top-1/4 left-1/4 text-4xl text-white/80"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaHeart />
              </motion.div>
              <motion.div
                className="absolute top-1/3 right-1/4 text-4xl text-white/80"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaStar />
              </motion.div>
              <motion.div
                className="absolute bottom-1/4 left-1/3 text-4xl text-white/80"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaMoon />
              </motion.div>
              <motion.div
                className="absolute bottom-1/3 right-1/3 text-4xl text-white/80"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaSun />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        >
      <motion.div 
            className="flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-white/70 text-sm mb-2 text-center">Scroll to explore</div>
            <div className="relative">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/30 to-indigo-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(139, 92, 246, 0.4)",
                    "0 0 20px rgba(139, 92, 246, 0.6)",
                    "0 0 0 rgba(139, 92, 246, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaChevronDown className="text-white text-xl" />
                </motion.div>
              </motion.div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  x: useTransform(scrollYProgress, [0, 0.5], [0, 10]),
                  y: useTransform(scrollYProgress, [0, 0.5], [0, -10]),
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  x: useTransform(scrollYProgress, [0, 0.5], [0, -10]),
                  y: useTransform(scrollYProgress, [0, 0.5], [0, 10]),
                }}
              />
        </div>
      </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
