"use client";

import Link from "next/link";
import { FaUsers, FaBriefcase, FaFileAlt } from "react-icons/fa";

export default function JoinUsCTA() {
  return (
    <section className='relative py-16 bg-gradient-to-br from-indigo-900 to-purple-900'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Rejoignez Notre Équipe
          </h2>
          <p className='text-lg text-indigo-100 mb-8'>
            Nous recherchons toujours des talents pour rejoindre notre mission.
            Que vous souhaitiez devenir employé, intervenant ou consultant, nous
            serions ravis d'avoir de vos nouvelles.
          </p>
          <Link
            href='/join-us'
            className='inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300'
          >
            Postuler Maintenant
            <svg
              className='w-5 h-5 ml-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </div>

        <div className='mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          <div className='bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center'>
            <div className='w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <FaUsers className='w-6 h-6 text-white' />
            </div>
            <h3 className='text-lg font-medium text-white mb-2'>
              Rôles Multiples
            </h3>
            <p className='text-indigo-100'>
              Rejoignez-nous en tant qu'employé, intervenant ou consultant
            </p>
          </div>

          <div className='bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center'>
            <div className='w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <FaBriefcase className='w-6 h-6 text-white' />
            </div>
            <h3 className='text-lg font-medium text-white mb-2'>
              Candidature Simple
            </h3>
            <p className='text-indigo-100'>
              Formulaire facile avec téléchargement de CV
            </p>
          </div>

          <div className='bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center'>
            <div className='w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <FaFileAlt className='w-6 h-6 text-white' />
            </div>
            <h3 className='text-lg font-medium text-white mb-2'>
              Réponse Rapide
            </h3>
            <p className='text-indigo-100'>Nous vous répondrons rapidement</p>
          </div>
        </div>
      </div>
    </section>
  );
}
