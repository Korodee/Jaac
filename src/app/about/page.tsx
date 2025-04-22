'use client';

import About from '@/components/sections/About';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaUsers, FaHandshake, FaHospital, FaHome, FaHeart, FaStar, FaShieldAlt, FaLightbulb, FaQuoteLeft, FaCheck } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const clientTypes = [
  { 
    icon: <FaUsers />, 
    title: 'Individual & Family', 
    description: 'Support for individuals and families facing challenges.',
    color: 'from-purple-500 to-indigo-500',
    features: ['Personalized care', 'Family support', 'Flexible scheduling']
  },
  { 
    icon: <FaHandshake />, 
    title: 'Corporate', 
    description: 'Professional support for businesses and their employees.',
    color: 'from-blue-500 to-cyan-500',
    features: ['Employee wellness', 'Stress management', 'Team building']
  },
  { 
    icon: <FaHospital />, 
    title: 'Healthcare', 
    description: 'Support in hospital settings and after discharge.',
    color: 'from-green-500 to-emerald-500',
    features: ['Medical integration', 'Recovery support', 'Professional care']
  },
  { 
    icon: <FaHome />, 
    title: 'In-Home Care', 
    description: 'Personalized care in the comfort of your home.',
    color: 'from-pink-500 to-rose-500',
    features: ['Comfortable environment', 'Personal attention', 'Flexible care']
  },
];

const values = [
  {
    icon: <FaHeart />,
    title: 'Compassionate Care',
    description: 'We provide empathetic and understanding support to all our clients.',
    color: 'from-red-500 to-pink-500',
    details: 'Our approach is centered on empathy, understanding, and genuine care for each individual.'
  },
  {
    icon: <FaStar />,
    title: 'Excellence',
    description: 'We maintain the highest standards in our professional services.',
    color: 'from-yellow-500 to-amber-500',
    details: 'We continuously strive for excellence in every aspect of our service delivery.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Trust & Security',
    description: 'Your privacy and well-being are our top priorities.',
    color: 'from-blue-500 to-indigo-500',
    details: 'We ensure complete confidentiality and create a safe space for healing and growth.'
  },
  {
    icon: <FaLightbulb />,
    title: 'Innovation',
    description: 'We continuously evolve our methods to better serve our clients.',
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
                Our Mission & Values
              </h1>
              <p className="text-xl text-gray-300">
                Dedicated to improving mental health through compassionate care and professional excellence
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
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide our work and define our approach to mental health care
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
                Our Clients
              </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We serve a diverse range of clients with unique needs, providing tailored support for every situation
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
                  Our Mission
                </h2>
                <div className="space-y-6 text-lg text-gray-700 relative z-10">
                  <p className="leading-relaxed">
                  Our agency is the best ally in mental and global health and is distinguished by its humanistic and relational approach tailored to the individual who contributes to improving mental health in our society.
                </p>
                  <p className="leading-relaxed">
                  We provide support and comfort for common life issues, tailored to the current reality. From now on, access to our services for common life problems will be met with responses and support to help individuals quickly resume their lives.
                </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 