import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoProps {
  isScrolled?: boolean;
}

export default function Logo({ isScrolled = false }: LogoProps) {
  return (
    <Link href="/" className="relative group">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center space-x-2"
      >
        {/* Logo Container */}
        <div className="relative w-10 h-10">
          {/* Background Shapes */}
          <div className={`absolute inset-0 bg-gradient-to-br ${isScrolled ? 'from-purple-600 to-indigo-600' : 'from-white to-purple-200'} rounded-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${isScrolled ? 'from-indigo-600 to-purple-600' : 'from-purple-200 to-white'} rounded-xl transform -rotate-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Logo Symbol */}
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`font-bold text-xl ${isScrolled ? 'text-white' : 'text-purple-800'}`}
            >
              J
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${isScrolled ? 'from-purple-600 to-indigo-600' : 'from-white to-purple-200'} rounded-xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300`} />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4px_4px] rounded-xl" />
        </div>

        {/* Text Logo */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
            <span className={`text-xl font-bold ${isScrolled 
              ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text' 
              : 'text-white'}`}>
              JAAC
            </span>
            <span className={`text-xs font-medium tracking-widest ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>
              PSYCHOLOGICAL
            </span>
          </motion.div>
          
          {/* Hover Effect */}
          <div className={`absolute -bottom-1 left-0 w-full h-0.5 ${isScrolled 
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
            : 'bg-gradient-to-r from-white to-purple-200'} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
        </div>

        {/* Animated Particles */}
        <div className={`absolute -right-2 -top-2 w-2 h-2 ${isScrolled ? 'bg-purple-400' : 'bg-white'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`w-full h-full ${isScrolled ? 'bg-purple-400' : 'bg-white'} rounded-full`}
          />
        </div>
        <div className={`absolute -left-2 -bottom-2 w-2 h-2 ${isScrolled ? 'bg-indigo-400' : 'bg-purple-200'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className={`w-full h-full ${isScrolled ? 'bg-indigo-400' : 'bg-purple-200'} rounded-full`}
          />
        </div>
      </motion.div>
    </Link>
  );
} 