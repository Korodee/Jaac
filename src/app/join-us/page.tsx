"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaFileAlt,
  FaPaperPlane,
  FaUsers,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";

export default function JoinUs() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
    cv: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Prepare FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("message", formData.message);
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }

      // Submit the application with the file as attachment
      const response = await fetch("/api/join-us", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.details ||
            data.error ||
            data.response?.message ||
            `Failed to submit application (Status: ${response.status})`
        );
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        message: "",
        cv: null,
      });
      setSelectedFile(null);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to submit application. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      e.target.value = "";
      return;
    }

    // Validate file type
    const fileExtension = file.name
      .toLowerCase()
      .slice(file.name.lastIndexOf("."));
    if (![".pdf", ".doc", ".docx"].includes(fileExtension)) {
      setError("Invalid file type. Only PDF, DOC, and DOCX files are allowed");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setFormData((prev) => ({ ...prev, cv: file }));
    setError("");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }

    // Validate file type
    const fileExtension = file.name
      .toLowerCase()
      .slice(file.name.lastIndexOf("."));
    if (![".pdf", ".doc", ".docx"].includes(fileExtension)) {
      setError("Invalid file type. Only PDF, DOC, and DOCX files are allowed");
      return;
    }

    setSelectedFile(file);
    setFormData((prev) => ({ ...prev, cv: file }));
    setError("");
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Hero Section */}
      <div className='relative pt-4 bg-indigo-900 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90'></div>
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        </div>

        <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center'
          >
            <h1 className='text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl'>
              Rejoignez Notre Équipe en Pleine Expansion
            </h1>
            <p className='mt-6 max-w-2xl mx-auto text-xl text-indigo-100'>
              Faites partie de quelque chose d'extraordinaire. Nous construisons
              l'avenir de l'IA et de l'automatisation, et nous voulons que vous
              fassiez partie de cette aventure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
          >
            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center'>
              <div className='mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-500'>
                <FaUsers className='h-6 w-6 text-white' />
              </div>
              <h3 className='mt-4 text-lg font-medium text-white'>
                Environnement Collaboratif
              </h3>
              <p className='mt-2 text-base text-indigo-100'>
                Travaillez avec des talents qui partagent votre passion pour
                l'innovation et l'excellence.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center'>
              <div className='mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-500'>
                <FaLightbulb className='h-6 w-6 text-white' />
              </div>
              <h3 className='mt-4 text-lg font-medium text-white'>
                Innovation en Priorité
              </h3>
              <p className='mt-2 text-base text-indigo-100'>
                Repoussez les limites et donnez vie à vos idées créatives dans
                un environnement favorable.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center'>
              <div className='mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-500'>
                <FaRocket className='h-6 w-6 text-white' />
              </div>
              <h3 className='mt-4 text-lg font-medium text-white'>
                Opportunités de Croissance
              </h3>
              <p className='mt-2 text-base text-indigo-100'>
                Opportunités continues d'apprentissage et de développement pour
                vous aider à atteindre votre plein potentiel.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Application Form Section */}
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Commencez Votre Aventure Avec Nous
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Nous recherchons toujours des talents pour rejoindre notre
              mission. Partagez votre histoire et créons ensemble quelque chose
              d'extraordinaire.
            </p>
          </motion.div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className='bg-green-50 border border-green-200 rounded-2xl p-8 text-center shadow-lg'
            >
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h2 className='text-2xl font-semibold text-green-800 mb-2'>
                Candidature Soumise !
              </h2>
              <p className='text-green-700'>
                Merci de votre intérêt pour rejoindre notre équipe. Nous
                examinerons votre candidature et vous répondrons rapidement.
              </p>
              <p className='text-green-600 mt-4'>
                Vous serez redirigé vers la page d'accueil dans quelques
                secondes...
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className='space-y-8 bg-white p-4 md:p-8 rounded-2xl shadow-xl'
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-red-50 text-red-700 p-4 rounded-xl border border-red-200'
                >
                  {error}
                </motion.div>
              )}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 flex items-center gap-2'
                  >
                    <FaUser className='text-indigo-600' />
                    Nom Complet
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className='block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200'
                    placeholder='Jean Dupont'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 flex items-center gap-2'
                  >
                    <FaEnvelope className='text-indigo-600' />
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className='block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200'
                    placeholder='jean@exemple.com'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700 flex items-center gap-2'
                  >
                    <FaPhone className='text-indigo-600' />
                    Numéro de Téléphone
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    id='phone'
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className='block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200'
                    placeholder='+33 6 00 00 00 00'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='role'
                    className='block text-sm font-medium text-gray-700 flex items-center gap-2'
                  >
                    <FaBriefcase className='text-indigo-600' />
                    Poste/Rôle
                  </label>
                  <div className='relative'>
                    <select
                      name='role'
                      id='role'
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className='block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer'
                    >
                      <option value=''>Sélectionnez un rôle</option>
                      <option value='Employee'>Employé</option>
                      <option value='Speaker'>Intervenant</option>
                      <option value='Consultant'>Consultant</option>
                      <option value='Other'>Autre</option>
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                      <svg
                        className='h-4 w-4 fill-current'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 flex items-center gap-2'
                >
                  <FaFileAlt className='text-indigo-600' />
                  Lettre de Motivation/Message
                </label>
                <textarea
                  name='message'
                  id='message'
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className='block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none'
                  placeholder='Parlez-nous de vous et de pourquoi vous souhaitez rejoindre notre équipe...'
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='cv'
                  className='block text-sm font-medium text-gray-700 flex items-center gap-2'
                >
                  <FaFileAlt className='text-indigo-600' />
                  CV (PDF, DOC, DOCX)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg transition-all duration-200 ${
                    selectedFile
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-500"
                  }`}
                >
                  <div className='space-y-1 text-center'>
                    {selectedFile ? (
                      <div className='flex flex-col items-center'>
                        <FaFileAlt className='h-12 w-12 text-indigo-600' />
                        <p className='text-sm text-gray-600 mt-2'>
                          {selectedFile.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          type='button'
                          onClick={() => {
                            setSelectedFile(null);
                            setFormData((prev) => ({ ...prev, cv: null }));
                          }}
                          className='mt-2 text-sm text-red-600 hover:text-red-500'
                        >
                          Supprimer le fichier
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='cv'
                            className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                          >
                            <span>Télécharger un fichier</span>
                            <input
                              type='file'
                              name='cv'
                              id='cv'
                              accept='.pdf,.doc,.docx'
                              onChange={handleFileChange}
                              className='sr-only'
                            />
                          </label>
                          <p className='pl-1'>ou glisser-déposer</p>
                        </div>
                        <p className='text-xs text-gray-500'>
                          PDF, DOC ou DOCX jusqu'à 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200'
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Soumettre la Candidature
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
