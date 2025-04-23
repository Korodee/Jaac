'use client';

import About from '@/components/sections/About';
import Header from '@/components/layout/Header';
import { FaUsers, FaHandshake, FaHospital, FaHome, FaHeart, FaStar, FaShieldAlt, FaLightbulb, FaQuoteLeft, FaCheck } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const clientTypes = [
  { 
    icon: <FaUsers />, 
    title: 'Particuliers & Familles', 
    description: 'Soutien pour les particuliers et les familles confrontés à des défis.',
    color: 'from-purple-500 to-indigo-500',
    features: ['Soins personnalisés', 'Soutien familial', 'Horaire flexible']
  },
  { 
    icon: <FaHandshake />, 
    title: 'Entreprises', 
    description: 'Soutien professionnel pour les entreprises et leurs employés.',
    color: 'from-blue-500 to-cyan-500',
    features: ['Bien-être des employés', 'Gestion du stress', 'Renforcement d\'équipe']
  },
  { 
    icon: <FaHospital />, 
    title: 'Santé', 
    description: 'Soutien en milieu hospitalier et après la sortie.',
    color: 'from-green-500 to-emerald-500',
    features: ['Intégration médicale', 'Soutien à la récupération', 'Soins professionnels']
  },
  { 
    icon: <FaHome />, 
    title: 'Soins à Domicile', 
    description: 'Soins personnalisés dans le confort de votre foyer.',
    color: 'from-pink-500 to-rose-500',
    features: ['Environnement confortable', 'Attention personnelle', 'Soins flexibles']
  },
];

const values = [
  {
    icon: <FaHeart />,
    title: 'Soins Empathiques',
    description: 'Nous offrons un soutien empathique et compréhensif à tous nos clients.',
    color: 'from-red-500 to-pink-500',
    details: 'Notre approche est centrée sur l\'empathie, la compréhension et un véritable souci pour chaque individu.'
  },
  {
    icon: <FaStar />,
    title: 'Excellence',
    description: 'Nous maintenons les plus hauts standards dans nos services professionnels.',
    color: 'from-yellow-500 to-amber-500',
    details: 'Nous visons continuellement l\'excellence dans tous les aspects de notre service.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Confiance & Sécurité',
    description: 'Votre vie privée et votre bien-être sont nos priorités absolues.',
    color: 'from-blue-500 to-indigo-500',
    details: 'Nous assurons une confidentialité totale et créons un espace sûr pour l’épanouissement et la croissance.'
  },
  {
    icon: <FaLightbulb />,
    title: 'Innovation',
    description: 'Nous évoluons continuellement nos méthodes pour mieux servir nos clients.',
    color: 'from-purple-500 to-violet-500',
    details: 'We embrace new approaches and technologies to enhance our service quality.'
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <>
      <Header />
      <main ref={containerRef}>
        <About />
        
        {/* Hero Section */}
        <section className="relative py-[3rem] md:py-[6rem] overflow-hidden bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]"
            style={{ y, opacity }}
          />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 text-transparent bg-clip-text">
                À propos de JAAC
              </h1>
              <p className="text-xl text-gray-300">
                Nous fournissons un soutien psychologique professionnel et des services de counseling
                pour les particuliers et les entreprises.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-20 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white"
            style={{ y, opacity }}
          />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Nos Valeurs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les principes qui guident notre travail et définissent notre approche pour la santé mentale
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.color}`} />
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} p-4 mb-6 text-white text-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600 mb-4">{value.description}</p>
                    <p className="text-sm text-gray-500">{value.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
                Nos Clients
              </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nous servons une gamme diversifiée de clients avec des besoins uniques, offrant un soutien personnalisé pour chaque situation
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {clientTypes.map((client, index) => (
                <motion.div
                  key={client.title} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${client.color}`} />
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${client.color} p-4 mb-6 text-white text-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      {client.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{client.title}</h3>
                    <p className="text-gray-600 mb-4">{client.description}</p>
                    <ul className="space-y-2">
                      {client.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-500">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${client.color} mr-2`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-indigo-600" />
                <div className="absolute top-8 right-8 text-purple-200 opacity-20">
                  <FaQuoteLeft className="text-6xl" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                  Notre Mission
                </h2>
                <div className="space-y-6 text-lg text-gray-700 relative z-10">
                  <p className="leading-relaxed">
                  Notre agence est le meilleur allié en santé mentale et globale et est distinguée par son approche humaniste et relationnelle adaptée à la personne qui contribue à améliorer la santé mentale dans notre société.
                </p>
                  <p className="leading-relaxed">
                  Nous fournissons un soutien et un confort pour les problèmes de la vie quotidienne, adaptés à la réalité actuelle. À partir de maintenant, l'accès à nos services pour les problèmes de la vie quotidienne sera rencontré avec des réponses et un soutien pour aider les individus à reprendre rapidement leur vie.
                </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
} 