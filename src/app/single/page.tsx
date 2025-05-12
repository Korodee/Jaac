"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaHeart,
  FaUsers,
  FaLock,
  FaCheck,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";
import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SinglePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const challenges = [
    {
      title: "La culpabilité",
      description:
        "Se sentir responsable de ses échecs passés peut freiner l'ouverture à de nouvelles rencontres.",
    },
    {
      title: "La peur de l'échec",
      description:
        "La crainte de ne pas réussir une relation peut empêcher d'essayer à nouveau.",
    },
    {
      title: "Le sentiment de ne pas être à la hauteur",
      description:
        "Le manque de confiance en soi rend difficile l'engagement dans une relation saine.",
    },
    {
      title: "La fatigue émotionnelle",
      description: "Les déceptions répétées peuvent épuiser et décourager.",
    },
    {
      title: "La perte d'espoir d'être heureux en couple",
      description:
        "Il est parfois difficile de croire qu'une relation épanouissante est possible.",
    },
    {
      title: "Les croyances limitantes",
      description:
        "Des idées reçues sur l'amour ou soi-même peuvent bloquer l'accès au bonheur.",
    },
    {
      title: "La difficulté à reconnaître et exprimer ses besoins",
      description:
        "Savoir ce que l'on veut et l'exprimer est essentiel pour une relation équilibrée.",
    },
    {
      title: "L'insécurité",
      description:
        "Le doute constant peut nuire à la confiance et à la sérénité dans la relation.",
    },
    {
      title: "La peur du rejet ou de l'engagement",
      description:
        "La crainte d'être blessé ou de s'engager peut empêcher d'aller vers l'autre.",
    },
    {
      title: "La peur d'être blessé… ou de blesser l'autre",
      description:
        "La sensibilité à la souffrance passée ou future freine l'ouverture à l'amour.",
    },
    {
      title: "Le manque de confiance (en soi ou en l'autre)",
      description:
        "La confiance est la base de toute relation durable et épanouissante.",
    },
    {
      title: "Le sentiment de vulnérabilité",
      description:
        "Se sentir exposé ou fragile peut rendre difficile l'acceptation de l'amour.",
    },
  ];

  const benefits = [
    "Votre vécu amoureux",
    "Vos valeurs personnelles",
    "Vos besoins relationnels",
    "Vos résistances inconscientes",
  ];

  return (
    <>
      <Header />
      <div className='min-h-screen' ref={containerRef}>
        {/* Hero Section */}
        <section className='relative pt-[8rem] pb-[4rem] overflow-hidden bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900'>
          <motion.div
            className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]'
            style={{ y, opacity }}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-purple-900/50 to-indigo-900/50' />
          <div className='container mx-auto px-4 relative'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center max-w-4xl mx-auto'
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className='inline-block mb-6'
              >
                <span className='text-purple-200 font-medium text-sm uppercase tracking-widest bg-purple-900/50 px-4 py-1.5 rounded-full border border-purple-700/50 backdrop-blur-sm'>
                  Services de Coaching
                </span>
              </motion.div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-purple-100 text-transparent bg-clip-text'>
                Célibataire?
              </h1>
              <p className='text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed'>
                Et si vous étiez la principale résistance à la réussite de vos
                relations? Découvrez comment transformer votre célibat en
                opportunité de croissance personnelle et de rencontres
                authentiques.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className='py-20 bg-gradient-to-b from-white to-gray-50'>
          <div className='container mx-auto px-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <span className='text-purple-600 w-fit mx-auto font-medium text-sm uppercase tracking-widest mb-3 block bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100'>
                Défis Courants
              </span>
              <h2 className='text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text'>
                Certaines difficultés peuvent freiner votre vie amoureuse
              </h2>
            </motion.div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='group'
                >
                  <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden'>
                    <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500' />
                    <div className='flex items-start'>
                      <div className='flex-shrink-0'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 p-3 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300'>
                          <FaHeart className='h-6 w-6' />
                        </div>
                      </div>
                      <div className='ml-4'>
                        <p className='text-gray-700 text-base font-semibold leading-relaxed'>
                          {challenge.title}
                        </p>
                        <p className='text-gray-500 text-sm mt-1'>
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className='py-20 bg-gradient-to-b from-gray-50 to-white'>
          <div className='container mx-auto px-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <span className='text-purple-600 w-fit mx-auto font-medium text-sm uppercase tracking-widest mb-3 block bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100'>
                Notre Approche
              </span>
              <h2 className='text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text'>
                Pour en finir avec le célibat
              </h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                L'Agence Faucon Trouve Inc. s'allie à l'agence JAAC Inc. pour
                vous offrir un environnement chaleureux, accueillant et
                sécuritaire, afin de vous aider à sortir du célibat et à bâtir
                une relation durable.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className='space-y-8'
              >
                <h3 className='text-2xl font-semibold text-gray-900'>
                  Vous souhaitez vivre une relation amoureuse satisfaisante?
                </h3>
                <p className='text-lg text-gray-600 leading-relaxed'>
                  Nos coachs relationnels sont là pour vous accompagner dans une
                  démarche personnalisée, à votre rythme et selon vos besoins.
                </p>
                <div className='space-y-6'>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className='flex items-center group'
                    >
                      <div className='w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 p-2 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300'>
                        <FaCheck className='h-6 w-6' />
                      </div>
                      <span className='ml-4 text-lg text-gray-700'>
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className='bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden'
              >
                <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500' />
                <div className='absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2' />
                <div className='text-center relative'>
                  <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 mb-8 text-white transform hover:scale-110 transition-transform duration-300'>
                    <FaUsers className='h-10 w-10' />
                  </div>
                  <h3 className='text-2xl font-semibold text-gray-900 mb-6'>
                    Des rencontres qui vous ressemblent
                  </h3>
                  <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                    Une fois prêt(e), Faucon Trouve sera vous guider vers des
                    rencontres sérieuses et authentiques, dans un cadre
                    professionnel.
                  </p>
                  <p className='text-lg text-gray-600 leading-relaxed'>
                    Tous les membres sont soigneusement sélectionnés pour
                    favoriser des échanges sincères et respectueux.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className='py-20 bg-gradient-to-b from-white to-gray-50'>
          <div className='container mx-auto px-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center max-w-4xl mx-auto'
            >
              <div className='relative'>
                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-200 opacity-20'>
                  <FaQuoteLeft className='text-6xl' />
                </div>
                <blockquote className='text-2xl md:text-3xl font-light text-gray-900 italic mb-8 relative z-10'>
                  "Rencontrer quelqu'un ne devrait pas combler un vide — mais
                  enrichir un bonheur déjà présent."
                </blockquote>
                <p className='text-lg text-gray-600 leading-relaxed'>
                  Nous croyons profondément que l'humain doit rester au cœur de
                  toute relation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden'>
          <motion.div
            className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]'
            style={{ y, opacity }}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-purple-600/50 to-indigo-600/50' />
          <div className='container mx-auto px-4 text-center relative'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-8'>
                Prêt(e) à commencer votre voyage vers l'amour?
              </h2>
              <a
                href='/contact'
                className='inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-purple-600 bg-white hover:bg-purple-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'
              >
                Contactez-nous
                <FaArrowRight className='ml-2' />
              </a>
            </motion.div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  );
}
