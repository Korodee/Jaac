'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCheckCircle, FaUsers, FaHandshake, FaClock, FaQuoteLeft } from 'react-icons/fa';
import { useRef } from 'react';

const benefits = [
  {
    icon: <FaCheckCircle className="text-4xl" />,
    title: 'Support téléphonique 24/7',
    description: 'Une assistance disponible à tout moment, jour et nuit.',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    icon: <FaUsers className="text-4xl" />,
    title: 'Abonnements mensuels',
    description: 'Des forfaits mensuels abordables pour faciliter l\'accès à nos services.',
    gradient: 'from-pink-500 to-purple-500'
  },
  {
    icon: <FaHandshake className="text-4xl" />,
    title: 'Programme corporatif',
    description: 'Des programmes de soutien adaptés aux entreprises et à leurs employés.',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    icon: <FaClock className="text-4xl" />,
    title: 'Solutions clé en main',
    description: 'Nous mettons en place des programmes de soutien qui contribuent au bien-être des individus et des entreprises.',
    gradient: 'from-violet-500 to-purple-500'
  }
];

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative py-[3rem] md:py-[6rem] overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-indigo-50" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="container pt-[5rem] md:pt-[3rem] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -left-8 top-1/2 w-16 h-16 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
            
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-3 block bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 shadow-sm relative overflow-hidden group">
                  <span className="relative z-10">À propos de JAAC</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-indigo-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text relative">
                Qui sommes-nous ?
                <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" />
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform translate-x-16" />
              </h2>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -left-6 top-0 text-purple-200 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <FaQuoteLeft size={24} className="transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed pl-8 relative">
                Depuis 2015, JAAC fournit des services paramédicaux professionnels, une thérapie psychologique et un soutien à la santé holistique pour le personnel et leurs familles, ainsi que pour la population générale, afin d'optimiser leur potentiel.
              </p>
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-200 to-transparent rounded-full opacity-50" />
                <div className="absolute -right-2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 to-transparent rounded-full opacity-50" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl transform -rotate-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100 group-hover:shadow-xl transition-shadow duration-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                Notre mode de vie actuel exige une pause pour traiter les expériences difficiles afin de pouvoir rebondir efficacement. JAAC a été fondée pour faciliter cette pause, intervenant rapidement et de manière appropriée auprès des individus grâce à des interventions brèves et pragmatiques.
              </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform rotate-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
                  <p className="text-lg font-medium leading-relaxed text-white relative">
                    JAAC a développé une structure d'abonnement mensuel unique adaptée aux besoins fondamentaux des individus en matière de soutien psychologique. Vous serez accueilli comme une personne entière.
                </p>
              </div>
              </motion.div>
          </div>
          </motion.div>

          <motion.div 
            className="relative h-[600px] group"
            style={{ y }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl transform -rotate-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-3xl transform rotate-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/jaac2.JPG"
                alt="Équipe JAAC"
                fill
                className="object-cover rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent rounded-2xl" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 transform group-hover:translate-y-[-8px] transition-transform duration-300">
                <p className="text-white text-xl font-semibold relative">
                  JAAC, une agence au service des gens.
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-white/50 rounded-full" />
                  <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-white/30 rounded-full transform translate-x-16" />
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-3 block bg-purple-50 px-4 py-1.5 rounded-full">
                Pourquoi Nous Choisir
              </span>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold mt-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Nos Avantages
            </h3>
          </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative z-10 h-full bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-purple-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${benefit.gradient} mb-6 text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    {benefit.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 rounded-2xl blur-xl transition-all duration-500 transform-gpu group-hover:scale-105`} />
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 