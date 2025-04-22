'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    if (formData.phone && !/^[\d\s-+()]*$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-indigo-50" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-3 block bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 shadow-sm">
              Get in Touch
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Send Us a Message
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions or need assistance? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100 h-full">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">info@jaacpsychological.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                    <FaPhone className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Location</h4>
                    <p className="text-gray-600">123 Main Street, Montreal, QC</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Business Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative">
              {/* Background layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl transform -rotate-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl transform rotate-1" />
              
              {/* Form card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-purple-600 transition-colors">
                    Full Name
                  </label>
                      <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                          placeholder="John Doe"
                        />
                        {!errors.name && formData.name && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-purple-600 transition-colors">
                    Email Address
                  </label>
                      <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                          placeholder="john@example.com"
                        />
                        {!errors.email && formData.email && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-purple-600 transition-colors">
                    Phone Number
                  </label>
                      <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                          placeholder="(555) 123-4567"
                        />
                        {!errors.phone && formData.phone && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-purple-600 transition-colors">
                    Subject
                  </label>
                      <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                          placeholder="How can we help?"
                        />
                        {!errors.subject && formData.subject && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                            <FaCheck />
                          </div>
                        )}
                      </div>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>
              </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-purple-600 transition-colors">
                  Message
                </label>
                    <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                        placeholder="Your message here..."
                      />
                      {!errors.message && formData.message && (
                        <div className="absolute right-3 top-3 text-green-500">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                      className={`relative overflow-hidden group px-8 py-4 rounded-lg text-white font-medium transition-all duration-300 ${
                        isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                      }`}
                    >
                      <span className="relative z-10 flex items-center">
                  <FaPaperPlane className="mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
              </div>

        <AnimatePresence>
              {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-6 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center shadow-lg max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FaCheck className="text-green-500 text-xl" />
                </div>
                <p className="text-lg font-medium">
                  Thank you for your message! We'll get back to you soon.
                </p>
                </div>
            </motion.div>
              )}
        </AnimatePresence>
      </div>
    </section>
  );
} 