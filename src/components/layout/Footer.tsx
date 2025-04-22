"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-950 text-white pt-8 md:pt-20 pb-10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-900 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 -left-20 w-60 h-60 bg-indigo-900 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-900 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        ></motion.div>

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="mb-2 md:mb-6">
              <Link href="/" className="relative inline-block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="relative w-[5rem] h-[6rem] md:w-[5rem] md:h-[6rem]">
                    <Image
                      src="/jaac-logo2.png"
                      alt="JAAC Logo"
                      fill
                      className="object-contain brightness-0 invert transition-all duration-500"
                      priority
                    />
                  </div>
                </motion.div>
              </Link>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              JAAC, à votre service ! Soutien psychologique professionnel pour
              les particuliers et les entreprises.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400 group">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 group-hover:bg-purple-600 transition-colors duration-300">
                  <FaPhone className="text-purple-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <a
                    href="tel:514-387-1944"
                    className="hover:text-white transition-colors"
                  >
                    514-387-1944
                  </a>
                </div>
              </div>
              <div className="flex items-center text-gray-400 group">
                <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center mr-3 group-hover:bg-indigo-600 transition-colors duration-300">
                  <FaPhone className="text-indigo-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sans frais</p>
                  <a
                    href="tel:1-844-400-1944"
                    className="hover:text-white transition-colors"
                  >
                    1-844-400-1944
                  </a>
                </div>
              </div>
              <div className="flex items-center text-gray-400 group">
                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                  <FaMapMarkerAlt className="text-blue-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Adresse</p>
                  <span>
                    467 Notre-Dame, Suite 206, Repentigny, Quebec, J6A 2T3
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Liens Rapides
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/subscribe"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                  S'abonner
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-cookies"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                  Politique des cookies
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Nos Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-center group">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                Soutien et suivi psychologique
              </li>
              <li className="text-gray-400 flex items-center group">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                Situations de crise
              </li>
              <li className="text-gray-400 flex items-center group">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                Services de deuil
              </li>
              <li className="text-gray-400 flex items-center group">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                Services paramédicaux
              </li>
              <li className="text-gray-400 flex items-center group">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                Counseling professionnel
              </li>
              <li className="text-gray-400 flex items-center group">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                Télémédecine
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Contactez-nous
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Besoin d'aide ? Contactez-nous pour une assistance rapide. Votre
              intervenant désigné vous contactera rapidement pour planifier un
              rendez-vous.
            </p>
            <Link
              href="/contact"
              className="group relative inline-block overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <span className="relative z-10 flex items-center">
                <FaEnvelope className="mr-2" />
                Nous Contacter
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-400 mb-4">
                Suivez-nous
              </h4>
              <div className="flex space-x-3">
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFacebookF />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTwitter />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedinIn />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sponsors */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-gray-800 pt-12"
        >
          <div className="text-center mb-8">
            <motion.h3
              variants={itemVariants}
              className="text-xl font-bold relative inline-block"
            >
              Nos Partenaires
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></span>
            </motion.h3>
          </div>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-8"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.div
                key={num}
                className="relative w-24 h-24 bg-gray-800/50 rounded-lg p-2 hover:bg-gray-800 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={`/jaac-spons${num}.JPG`}
                  alt={`Partenaire ${num}`}
                  fill
                  className="object-contain p-2"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-500 mb-4 md:mb-0">
              © {currentYear} JAAC. Tous droits réservés.
            </p>
            <div className="flex flex-col items-center space-y-2 md:flex-row md:items-start md:space-y-0 md:space-x-6">
              <Link
                href="/politique-confidentialite"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/politique-cookies"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Politique des cookies
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
