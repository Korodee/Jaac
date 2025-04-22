'use client';

import Contact from '@/components/sections/Contact';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaArrowRight } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: 'Head Office',
    details: ['585 rue Notre-Dame', 'Repentigny, QC J6A 2T6'],
    color: 'from-purple-500 to-indigo-500',
    action: 'Get Directions',
    link: 'https://maps.google.com/?q=585+rue+Notre-Dame+Repentigny+QC+J6A+2T6'
  },
  {
    icon: FaPhone,
    title: 'Phone Numbers',
    details: ['+1 (450) 932-5222', '+1 (514) 932-5222'],
    color: 'from-blue-500 to-cyan-500',
    action: 'Call Now',
    link: 'tel:+14509325222'
  },
  {
    icon: FaEnvelope,
    title: 'Email',
    details: ['info@jaac.ca'],
    color: 'from-green-500 to-emerald-500',
    action: 'Send Email',
    link: 'mailto:info@jaac.ca'
  },
  {
    icon: FaClock,
    title: 'Business Hours',
    details: ['Monday - Friday: 8:00 AM - 8:00 PM', 'Saturday - Sunday: By appointment'],
    color: 'from-pink-500 to-rose-500',
    action: 'Schedule Appointment',
    link: '/contact'
  }
];

export default function ContactPage() {
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
        {/* Hero Section */}
        <section className="relative  overflow-hidden bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
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
                Get in Touch
              </h1>
              <p className="text-xl text-gray-300">
                Whether you're seeking support, have questions about our services, or want to join our network,
                we're here to help. Reach out to us through any of the following channels.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${info.color}`} />
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${info.color} p-4 mb-6 text-white text-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                    <div className="space-y-2 mb-6">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                    <a 
                      href={info.link}
                      className={`inline-flex items-center text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${info.color} hover:opacity-80 transition-opacity`}
                    >
                      {info.action}
                      <FaArrowRight className="ml-2 text-xs" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <Contact />

        {/* Map Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Visit Our Office
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find us at our convenient location in Repentigny, Quebec
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.5076811064387!2d-73.44419688444567!3d45.74180607910534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc8e4c7b0d00001%3A0x7c371c5921e2591a!2s585%20Rue%20Notre-Dame%2C%20Repentigny%2C%20QC%20J6A%202T6!5e0!3m2!1sen!2sca!4v1647881234567!5m2!1sen!2sca"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[450px]"
                  ></iframe>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">585 rue Notre-Dame</h3>
                      <p className="text-gray-600">Repentigny, QC J6A 2T6</p>
                    </div>
                    <a 
                      href="https://maps.google.com/?q=585+rue+Notre-Dame+Repentigny+QC+J6A+2T6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Get Directions
                      <FaArrowRight className="ml-2" />
                    </a>
                  </div>
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