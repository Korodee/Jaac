'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaHandHoldingHeart, FaUserFriends, FaBuilding, FaStar, FaCrown, FaClock, FaUserMd, FaPuzzlePiece, FaGooglePay } from 'react-icons/fa';
import Button from '../ui/Button';
import { createSubscription, sendConfirmationEmail } from '../../services/subscriptionService';
import { initializeGooglePay } from '../../utils/googlePay';
import { googlePayConfig } from '../../config/payment';

const plans = [
  {
    id: 'individual',
    title: 'Plan Individuel',
    icon: <FaUserFriends className="text-4xl" />,
    price: '49',
    period: 'par mois',
    features: [
      'Sessions de soutien psychologique mensuelles',
      'Support téléphonique 24/7',
      'Accès aux ressources en ligne',
      'Intervention de crise au besoin',
      'Support par email'
    ],
    popular: false,
    gradient: 'from-purple-500 to-indigo-500',
    description: 'Parfait pour les individus recherchant un soutien et un accompagnement psychologique régulier.'
  },
  {
    id: 'coupdemain',
    title: 'Coup de Main',
    icon: <FaHandHoldingHeart className="text-4xl" />,
    price: '29',
    period: 'par séance',
    features: [
      'Intervention rapide de 30 minutes',
      'Résolution rapide des problèmes',
      'Méthode brève et efficace',
      'Disponible 24/7',
      'Ajoutable à tout abonnement'
    ],
    popular: true,
    gradient: 'from-pink-500 to-purple-500',
    description: 'Idéal pour un soutien immédiat et une résolution rapide des problèmes.'
  },
  {
    id: 'enterprise',
    title: 'Plan Entreprise',
    icon: <FaBuilding className="text-4xl" />,
    price: 'Sur mesure',
    period: 'contactez-nous pour les tarifs',
    features: [
      'Programme d\'aide aux employés',
      'Counseling professionnel',
      'Suivi thérapeutique',
      'Intervention psychosociale',
      'Services de télémédecine'
    ],
    popular: false,
    gradient: 'from-indigo-500 to-blue-500',
    description: 'Soutien complet pour les entreprises et leurs employés.'
  }
];

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    acceptTerms: false
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    acceptTerms: ''
  });
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [googlePayAvailable, setGooglePayAvailable] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Check if Google Pay is available
  useEffect(() => {
    const checkGooglePay = async () => {
      const isAvailable = await initializeGooglePay();
      setGooglePayAvailable(isAvailable);
    };
    
    checkGooglePay();
  }, []);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentModal(true);
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {
      fullName: '',
      email: '',
      phone: '',
      acceptTerms: ''
    };
    
    let isValid = true;
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Le nom complet est requis';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Veuillez entrer un email valide';
      isValid = false;
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Vous devez accepter les conditions';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleGooglePay = async () => {
    if (!validateForm()) {
      return;
    }
    
    if (!selectedPlan) {
      setErrorMessage('Veuillez sélectionner un forfait');
      return;
    }
    
    setPaymentStatus('processing');
    setErrorMessage('');
    
    try {
      // Create subscription with Google Pay
      const result = await createSubscription({
        planId: selectedPlan,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        paymentMethod: 'googlePay'
      });
      
      if (result.success && result.subscriptionId) {
        setSubscriptionId(result.subscriptionId);
        
        // Send confirmation email
        await sendConfirmationEmail(
          formData.email,
          result.subscriptionId,
          selectedPlanDetails?.title || 'Abonnement'
        );
        
        setPaymentStatus('success');
        
        // Reset after showing success message
        setTimeout(() => {
          setShowPaymentModal(false);
          setPaymentStatus('idle');
          // Reset form data
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            company: '',
            acceptTerms: false
          });
          setSubscriptionId(null);
        }, 5000);
      } else {
        setPaymentStatus('error');
        setErrorMessage(result.error || 'Une erreur s\'est produite lors de la création de l\'abonnement');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage('Une erreur s\'est produite lors du traitement du paiement');
    }
  };

  const selectedPlanDetails = selectedPlan 
    ? plans.find(plan => plan.id === selectedPlan) 
    : null;

  return (
    <section id="pricing" className="relative py-[3rem] md:py-[6rem] overflow-hidden">
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
              Nos Forfaits
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Abonnements Mensuels
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Améliorez votre abonnement en ajoutant COUP DE MAIN à vos services à la carte. Une intervention de 30 minutes pour vous aider à y voir plus clair dans votre situation avec notre méthode brève, rapide et efficace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id} 
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
                    Populaire
                  </div>
                )}
                
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${plan.gradient} mb-6 text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  {plan.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">{plan.price}$</span>
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
                  variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                  className={`w-full relative overflow-hidden group ${
                    selectedPlan === plan.id ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : ''
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  <span className="relative z-10">
                  {selectedPlan === plan.id ? 'Sélectionné' : 'Choisir le forfait'}
                  </span>
                  {selectedPlan === plan.id && (
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
                Accès Secteur Privé
              </h3>
              
              {/* Description with enhanced typography */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                Maintenant accessible au secteur privé. Suivi psychologique à court terme, en hébergement ou à domicile, pour une situation d'impasse.
              </p>
              
              {/* Features list with enhanced styling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { 
                    text: "Horaire flexible", 
                    icon: <FaClock className="text-3xl" />, 
                    color: "from-purple-500 to-indigo-500",
                    description: "Réservez vos séances à votre convenance"
                  },
                  { 
                    text: "Support professionnel", 
                    icon: <FaUserMd className="text-3xl" />, 
                    color: "from-indigo-500 to-blue-500",
                    description: "Guidage expert par des professionnels qualifiés"
                  },
                  { 
                    text: "Solutions adaptées", 
                    icon: <FaPuzzlePiece className="text-3xl" />, 
                    color: "from-blue-500 to-purple-500",
                    description: "Approche personnalisée à vos besoins"
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
                  <span className="relative z-10 font-medium">Contactez-nous pour plus d'informations</span>
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

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedPlanDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Paiement avec Google Pay</h3>
                <p className="text-gray-600">
                  {selectedPlanDetails.title} - {selectedPlanDetails.price}$ {selectedPlanDetails.period}
                </p>
              </div>

              {paymentStatus === 'idle' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-gray-600">Forfait</span>
                      <span className="font-medium">{selectedPlanDetails.title}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-between mb-2">
                      <span className="text-gray-600">Prix</span>
                      <span className="font-medium">{selectedPlanDetails.price}$ {selectedPlanDetails.period}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg">{selectedPlanDetails.price}$</span>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        placeholder="Votre nom complet"
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        placeholder="votre@email.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Entreprise (optionnel)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="acceptTerms"
                          name="acceptTerms"
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                          J'accepte les <a href="/politique-confidentialite" className="text-purple-600 hover:text-purple-500">conditions d'utilisation</a> <span className="text-red-500">*</span>
                        </label>
                        {formErrors.acceptTerms && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.acceptTerms}</p>
                        )}
                      </div>
                    </div>
                  </form>

                  {!googlePayAvailable && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm">
                      <p>Google Pay n'est pas disponible sur votre appareil. Veuillez utiliser un autre mode de paiement.</p>
                    </div>
                  )}

                  <button
                    onClick={handleGooglePay}
                    disabled={!googlePayAvailable}
                    className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ${!googlePayAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <FaGooglePay className="text-2xl" />
                    <span>Payer avec Google Pay</span>
                  </button>
                </div>
              )}

              {paymentStatus === 'processing' && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
                  <p className="text-gray-600">Traitement de votre paiement...</p>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Paiement réussi!</h4>
                  <p className="text-gray-600">Votre abonnement a été activé avec succès.</p>
                  <p className="text-gray-600 mt-2">Un email de confirmation a été envoyé à {formData.email}.</p>
                  {subscriptionId && (
                    <p className="text-gray-500 text-sm mt-2">ID d'abonnement: {subscriptionId}</p>
                  )}
                </div>
              )}

              {paymentStatus === 'error' && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Erreur de paiement</h4>
                  <p className="text-gray-600">{errorMessage || 'Une erreur s\'est produite lors du traitement de votre paiement.'}</p>
                  <button
                    onClick={() => setPaymentStatus('idle')}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              )}

              {paymentStatus === 'idle' && (
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="mt-4 w-full py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 