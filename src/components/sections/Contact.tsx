'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import type { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '@/styles/phone-input.css';

type FormData = {
  fullName: string;
  email: string;
  phone: Value | undefined;
  subject: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "" as Value,
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = () => {
    const errors = {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      errors.fullName = "Le nom est requis";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Veuillez entrer une adresse email valide";
      isValid = false;
    }

    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      errors.phone = "Numéro de téléphone invalide";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Le message est requis";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "" as Value,
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (value: Value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    
    // Clear error when user starts typing
    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  return (
    <section className="relative py-[3rem] md:py-[6rem] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-indigo-50" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="container  mx-auto px-4 relative">
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
              Contactez-nous
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Envoyez-nous un Message
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vous avez des questions ou besoin d'assistance ? Nous sommes là pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
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
                Informations de Contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">jaac.team@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                    <FaPhone className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Téléphone</h4>
                    <p className="text-gray-600">+1 (514) 387-1944</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Adresse</h4>
                    <p className="text-gray-600">123 rue Principale, Montréal, QC</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Heures d'ouverture</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium">9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Samedi</span>
                    <span className="font-medium">10h00 - 16h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-medium">Fermé</span>
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
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-6 bg-green-50 rounded-xl"
                  >
                    <h3 className="text-xl font-semibold text-green-700 mb-2">
                      Message envoyé avec succès!
                    </h3>
                    <p className="text-green-600">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </motion.div>
                ) : submitStatus === "error" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-6 bg-red-50 rounded-xl"
                  >
                    <h3 className="text-xl font-semibold text-red-700 mb-2">
                      Erreur lors de l'envoi du message
                    </h3>
                    <p className="text-red-600">
                      Veuillez réessayer plus tard ou nous contacter directement.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            formErrors.fullName ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="Votre nom"
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            formErrors.email ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          placeholder="votre@email.com"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <div className="relative">
                        <PhoneInput
                          international
                          defaultCountry="CA"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className={`
                            w-full
                            [&>input]:w-full
                            [&>input]:px-4
                            [&>input]:py-2
                            [&>input]:rounded-lg
                            [&>input]:border
                            [&>input]:${formErrors.phone ? 'border-red-500' : 'border-gray-300'}
                            [&>input]:focus:ring-2
                            [&>input]:focus:ring-purple-500
                            [&>input]:focus:border-transparent
                            [&>select]:bg-white
                            [&>select]:border-gray-300
                            [&>select]:rounded-lg
                            [&>select]:focus:ring-2
                            [&>select]:focus:ring-purple-500
                            [&>select]:focus:border-transparent
                          `}
                          placeholder="Entrez votre numéro de téléphone"
                          countrySelectProps={{
                            className: `
                              !bg-white
                              !border-gray-300
                              !rounded-lg
                              !focus:ring-2
                              !focus:ring-purple-500
                              !focus:border-transparent
                            `
                          }}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          formErrors.message ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        placeholder="Votre message"
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                      )}
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                          isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-700 hover:via-purple-600 hover:to-indigo-700"
                        }`}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 