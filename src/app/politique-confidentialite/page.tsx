'use client';

import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserLock, FaLock, FaUserCog, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { useRef } from 'react';

export default function PrivacyPolicy() {
  const containerRef = useRef(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-pink-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="relative bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-3 block bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 shadow-sm">
                Politique de Confidentialité
              </span>
            </motion.div>
            <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Protection de vos données
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Notre engagement envers la protection de vos informations personnelles
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="p-8 sm:p-12">
            {/* Introduction */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaShieldAlt className="text-purple-600 mr-3" />
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed pl-4">
                Bienvenue sur www.jaac.ca ("le Site"). Nous nous engageons à protéger la confidentialité de nos utilisateurs et à traiter leurs informations personnelles de manière transparente. Cette politique de confidentialité explique comment nous collectons, utilisons, et protégeons vos données personnelles lorsque vous utilisez notre Site.
              </p>
            </motion.div>

            {/* Collecte des informations */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaUserLock className="text-indigo-600 mr-3" />
                Collecte des informations
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 pl-4">
                Nous collectons différentes informations lorsque vous utilisez notre Site, notamment :
              </p>
              <ul className="list-none space-y-3 text-gray-600 ml-4 pl-4">
                <li className="flex items-start">
                  <FaCheckCircle className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Informations personnelles :</span> telles que votre nom, adresse e-mail, numéro de téléphone, etc., lorsque vous vous inscrivez ou remplissez des formulaires sur notre Site.
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Informations de navigation :</span> telles que votre adresse IP, type de navigateur, pages visitées, et autres données de navigation via des cookies et technologies similaires.
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Utilisation des informations */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaLock className="text-blue-600 mr-3" />
                Utilisation des informations
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 pl-4">
                Les informations que nous collectons peuvent être utilisées pour :
              </p>
              <ul className="list-none space-y-3 text-gray-600 ml-4 pl-4">
                <li className="flex items-start">
                  <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Fournir et améliorer nos services :</span> Utiliser vos informations pour vous fournir les services demandés et améliorer l'expérience utilisateur.
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Communication :</span> Envoyer des e-mails périodiques concernant des mises à jour, promotions, et autres informations pertinentes.
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Sécurité :</span> Assurer la sécurité et l'intégrité de notre Site et protéger contre la fraude et les abus.
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Partage des informations */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaUserCog className="text-cyan-600 mr-3" />
                Partage des informations
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 pl-4">
                Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement, sauf dans les cas suivants :
              </p>
              <ul className="list-none space-y-3 text-gray-600 ml-4 pl-4">
                <li className="flex items-start">
                  <FaCheckCircle className="text-cyan-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Prestataires de services :</span> Nous pouvons partager vos informations avec des prestataires tiers qui nous aident à exploiter notre Site, mener nos affaires, ou vous servir, à condition qu'ils acceptent de garder ces informations confidentielles.
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-cyan-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Exigences légales :</span> Nous pouvons divulguer vos informations si la loi l'exige ou si nous croyons en toute bonne foi que cette divulgation est nécessaire pour se conformer à une obligation légale, protéger nos droits, ou garantir la sécurité des utilisateurs.
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Sécurité des données */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaLock className="text-teal-600 mr-3" />
                Sécurité des données
              </h2>
              <p className="text-gray-600 leading-relaxed pl-4">
                Nous mettons en œuvre diverses mesures de sécurité pour protéger vos informations personnelles. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est sécurisée à 100 %, et nous ne pouvons garantir une sécurité absolue.
              </p>
            </motion.div>

            {/* Vos droits */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaUserCog className="text-emerald-600 mr-3" />
                Vos droits
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 pl-4">
                Vous avez le droit de :
              </p>
              <ul className="list-none space-y-3 text-gray-600 ml-4 pl-4">
                <li className="flex items-start">
                  <FaCheckCircle className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>Accéder à vos informations personnelles que nous détenons.</div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>Corriger toute information inexacte ou incomplète.</div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>Supprimer vos informations personnelles sous certaines conditions.</div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>Opposer au traitement de vos informations personnelles.</div>
                </li>
              </ul>
              <div className="mt-6 bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex items-start">
                <FaEnvelope className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-600">
                  Pour exercer ces droits, veuillez nous contacter à <a href="mailto:jaac.team@gmail.com" className="text-emerald-600 hover:underline font-medium">jaac.team@gmail.com</a>.
                </p>
              </div>
            </motion.div>

            {/* Modifications */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-lime-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaShieldAlt className="text-green-600 mr-3" />
                Modifications de la politique de confidentialité
              </h2>
              <p className="text-gray-600 leading-relaxed pl-4">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page, et nous vous encourageons à consulter régulièrement notre politique de confidentialité pour rester informé des mises à jour.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-lime-500 to-yellow-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaUserLock className="text-lime-600 mr-3" />
                Contact
              </h2>
              <p className="text-gray-600 leading-relaxed pl-4">
                Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter avec notre formulaire de contact.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 