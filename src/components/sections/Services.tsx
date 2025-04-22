'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaUserFriends, FaHospital, FaHome, FaPhone, FaHeartbeat, FaHandHoldingHeart, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import { useRef } from 'react';

const services = [
  {
    icon: <FaUserFriends />,
    title: 'Psychological support and follow-up',
    description: 'Professional counseling and therapeutic follow-up for individuals and groups.',
    gradient: 'from-purple-500 to-indigo-500',
    shadowColor: 'shadow-purple-500/20'
  },
  {
    icon: <FaHospital />,
    title: 'Crisis situations',
    description: 'Immediate support and intervention for crisis situations and emergencies.',
    gradient: 'from-pink-500 to-rose-500',
    shadowColor: 'shadow-pink-500/20'
  },
  {
    icon: <FaHome />,
    title: 'Social support at your home',
    description: 'In-home assistance to make your life easier and provide comfort in familiar surroundings.',
    gradient: 'from-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-500/20'
  },
  {
    icon: <FaPhone />,
    title: 'Telemedicine',
    description: 'Virtual consultations with doctors and nursing services for remote support.',
    gradient: 'from-teal-500 to-emerald-500',
    shadowColor: 'shadow-teal-500/20'
  },
  {
    icon: <FaHeartbeat />,
    title: 'Mental health prevention',
    description: 'Proactive approaches to maintain and improve mental health and well-being.',
    gradient: 'from-orange-500 to-amber-500',
    shadowColor: 'shadow-orange-500/20'
  },
  {
    icon: <FaHandHoldingHeart />,
    title: 'Bereavement services',
    description: 'Compassionate support for those experiencing loss and grief.',
    gradient: 'from-red-500 to-orange-500',
    shadowColor: 'shadow-red-500/20'
  },
  {
    icon: <FaUserMd />,
    title: 'Paramedical services',
    description: 'Professional paramedical support for various health needs.',
    gradient: 'from-violet-500 to-purple-500',
    shadowColor: 'shadow-violet-500/20'
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Holistic health events',
    description: 'Events and workshops focused on holistic health and well-being.',
    gradient: 'from-fuchsia-500 to-pink-500',
    shadowColor: 'shadow-fuchsia-500/20'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-purple-50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-24 relative"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-purple-600 font-medium text-md uppercase tracking-widest mb-3 block bg-purple-50 px-4 py-1.5 rounded-full">
              Our Services
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text bg-[size:200%] animate-gradient">
            Comprehensive Care Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The JAAC team offers personal or professional psychological support to help you quickly get your life back on track.
            </p>
          {/* Decorative elements */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title} 
              variants={cardVariants}
              className="group relative perspective-1000"
            >
              <div className="relative z-10 h-full bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[2deg] transform-gpu">
                <div 
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${service.shadowColor} shadow-lg`}
            >
              <motion.div
                    className="text-3xl"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/50 to-transparent rounded-b-2xl" />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl blur-xl transition-all duration-500 transform-gpu group-hover:scale-105`} />
              </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-[2.5rem] transform -rotate-1" />
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-[2.5rem] transform rotate-1" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                  Multiple Ways to Serve You Better
                </h3>
                <p className="text-lg text-gray-700 mb-8">
                  We serve you through multiple channels to ensure accessibility and convenience:
                </p>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-center text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                    Professional office consultations
                  </motion.li>
                  <motion.li 
                    className="flex items-center text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3" />
                    Home visits for personalized care
                  </motion.li>
                  <motion.li 
                    className="flex items-center text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                    Video consultations for remote support
                  </motion.li>
                  <motion.li 
                    className="flex items-center text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3" />
                    Phone support for immediate assistance
                  </motion.li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl transform rotate-3" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">
                    Professional Excellence Guaranteed
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    All our practitioners and professional consultants have:
                  </p>
                  <ul className="mt-4 space-y-3">
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</span>
                      <span className="ml-3 text-gray-600">University education and/or equivalent qualifications</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</span>
                      <span className="ml-3 text-gray-600">Active membership in the Ritma association or respective professional order</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</span>
                      <span className="ml-3 text-gray-600">Comprehensive professional and civil liability insurance</span>
                    </motion.li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 