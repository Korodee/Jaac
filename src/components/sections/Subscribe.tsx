'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaHandHoldingHeart, FaUserFriends, FaBuilding, FaStar, FaCrown, FaClock, FaUserMd, FaPuzzlePiece } from 'react-icons/fa';
import Button from '../ui/Button';

const plans = [
  {
    title: 'Individual Plan',
    icon: <FaUserFriends className="text-4xl" />,
    price: '$49',
    period: 'per month',
    features: [
      'Monthly psychological support sessions',
      '24/7 phone support',
      'Access to online resources',
      'Crisis intervention when needed',
      'Email support'
    ],
    popular: false,
    gradient: 'from-purple-500 to-indigo-500',
    description: 'Perfect for individuals seeking regular psychological support and guidance.'
  },
  {
    title: 'Helping Hand',
    icon: <FaHandHoldingHeart className="text-4xl" />,
    price: '$29',
    period: 'per session',
    features: [
      '30-minute rapid intervention',
      'Quick problem resolution',
      'Brief, effective method',
      'Available 24/7',
      'Add to any subscription'
    ],
    popular: true,
    gradient: 'from-pink-500 to-purple-500',
    description: 'Ideal for immediate support and quick problem resolution.'
  },
  {
    title: 'Business Plan',
    icon: <FaBuilding className="text-4xl" />,
    price: 'Custom',
    period: 'contact for pricing',
    features: [
      'Employee assistance program',
      'Professional counseling',
      'Therapeutic follow-up',
      'Psychosocial intervention',
      'Telemedicine services'
    ],
    popular: false,
    gradient: 'from-indigo-500 to-blue-500',
    description: 'Comprehensive support for businesses and their employees.'
  }
];

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handlePlanSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
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
              Our Plans
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Monthly Subscriptions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Enhance your subscription by adding HELPING HAND to your à la carte services. A 30-minute intervention to help you gain clarity in your situation with our brief, quick, and effective method.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredPlan(plan.title)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300 opacity-10`} />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100 group-hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg flex items-center">
                    <FaStar className="mr-2" />
                    Popular
                  </div>
                )}
                
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${plan.gradient} mb-6 text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  {plan.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                    >
                      <div className={`p-1 rounded-full bg-gradient-to-br ${plan.gradient} mr-3`}>
                        <FaCheck className="text-white text-xs" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <Button 
                  variant={selectedPlan === plan.title ? 'primary' : 'outline'}
                  className={`w-full relative overflow-hidden group ${
                    selectedPlan === plan.title ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : ''
                  }`}
                  onClick={() => handlePlanSelect(plan.title)}
                >
                  <span className="relative z-10">
                  {selectedPlan === plan.title ? 'Selected' : 'Select Plan'}
                  </span>
                  {selectedPlan === plan.title && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Button>
              </div>
              </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center relative"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-10 blur-xl" />
          <div className="absolute -bottom-10 right-1/4 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-10 blur-xl" />
          <div className="absolute -bottom-5 left-1/4 w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-10 blur-xl" />
          
          {/* Main content container */}
          <div className="relative">
            {/* Background layers with enhanced gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 rounded-2xl transform -rotate-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-2xl transform rotate-1" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-2xl" />
            
            {/* Content card with enhanced styling */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-purple-100/50 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 rounded-full" />
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-indigo-200 rounded-full opacity-20 blur-2xl" />
              
              {/* Icon with enhanced styling */}
              <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FaHandHoldingHeart className="text-3xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              {/* Title with enhanced gradient */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text relative">
                Private Sector Access
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
              </h3>
              
              {/* Description with enhanced typography */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Now accessible to the private sector. Short-term psychological follow-up, either in accommodation or at home, for a situation of deadlock.
            </p>
              
              {/* Features list with enhanced styling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { 
                    text: "Flexible scheduling", 
                    icon: <FaClock className="text-3xl" />, 
                    color: "from-purple-500 to-indigo-500",
                    description: "Book sessions at your convenience"
                  },
                  { 
                    text: "Professional support", 
                    icon: <FaUserMd className="text-3xl" />, 
                    color: "from-indigo-500 to-blue-500",
                    description: "Expert guidance from qualified professionals"
                  },
                  { 
                    text: "Tailored solutions", 
                    icon: <FaPuzzlePiece className="text-3xl" />, 
                    color: "from-blue-500 to-purple-500",
                    description: "Personalized approach to your needs"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="group flex flex-col items-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100/50 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <div className={`p-4 rounded-full bg-gradient-to-r ${item.color} text-white mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">{item.text}</h4>
                    <p className="text-gray-600 text-center text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button with enhanced styling */}
              <div className="flex justify-center">
            <Button 
              variant="primary" 
              size="lg"
                  className="relative overflow-hidden group px-8 py-4 rounded-xl"
                >
                  <span className="relative z-10 font-medium">Contact Us for More Information</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -right-2 -top-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -left-2 -bottom-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 