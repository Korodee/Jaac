"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 text-center'>
        <div>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Candidature Soumise !
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Merci de votre intérêt pour rejoindre notre équipe. Nous examinerons
            votre candidature et vous répondrons rapidement.
          </p>
          <p className='mt-4 text-sm text-gray-500'>
            Vous serez redirigé vers la page d'accueil dans 5 secondes...
          </p>
        </div>
      </div>
    </div>
  );
}
