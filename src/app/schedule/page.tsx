"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const CALENDLY_URLS = {
  face: "https://calendly.com/jaac-team/30-minutes-de-reunion-individuelle",
  google: "https://calendly.com/jaac-team/reunion-virtuelle-de-30-minutes",
};

function SchedulePageContent() {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [meetingType, setMeetingType] = useState<"face" | "google" | null>(
    null
  );
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          setError("Session ID manquant");
          setIsLoading(false);
          return;
        }

        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Échec de la vérification du paiement");
        }

        setUserData({ name: data.customerName, email: data.customerEmail });
        setIsVerified(true);
      } catch (err: any) {
        console.error("Verification error:", err);
        setError(
          err.message || "Une erreur est survenue lors de la vérification"
        );
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  useEffect(() => {
    if (!isVerified || !meetingType) return;

    if (!scriptRef.current) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => setIsCalendlyLoaded(true);
      document.body.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current) {
        scriptRef.current = null;
      }
    };
  }, [isVerified, meetingType]);

  useEffect(() => {
    if (isCalendlyLoaded && userData && meetingType) {
      const container = document.getElementById("calendly-inline");
      if (container) {
        container.innerHTML = "";
      }

      (window as any).Calendly.initInlineWidget({
        url: CALENDLY_URLS[meetingType],
        parentElement: container,
        prefill: {
          name: userData.name,
          email: userData.email,
        },
        utm: {
          utmSource: "JAAC Website",
          utmMedium: "Booking",
        },
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        backgroundColor: "ffffff",
        textColor: "4a5568",
        primaryColor: "6b46c1",
        textFont: "Inter",
        branding: true,
        hideGdprBanner: true,
        hideCookieBanner: true,
        styles: {
          height: "100%",
          width: "100%",
        },
      });
    }
  }, [isCalendlyLoaded, userData, meetingType]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>
            Vérification de votre paiement...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4'>
        <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center'>
          <div className='text-red-500 mb-4'>
            <svg
              className='w-12 h-12 mx-auto'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Erreur de vérification
          </h2>
          <p className='text-gray-600 mb-6'>{error}</p>
          <Link
            href='/'
            className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700'
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  if (!meetingType) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className='w-full max-w-md'
        >
          <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100'>
            <div className='flex justify-between items-center px-5 py-3.5 border-b bg-gradient-to-r from-purple-600 to-indigo-600'>
              <h1 className='text-lg font-medium text-white'>
                Choisissez le type de séance
              </h1>
              <Link
                href='/'
                className='text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10'
              >
                <XMarkIcon className='h-4 w-4' />
              </Link>
            </div>
            <div className='p-8 flex flex-col gap-6 items-center'>
              <button
                onClick={() => setMeetingType("face")}
                className='w-full px-6 py-4 rounded-xl bg-purple-600 text-white font-semibold text-lg shadow hover:bg-purple-700'
              >
                Face à Face
              </button>
              <button
                onClick={() => setMeetingType("google")}
                className='w-full px-6 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow hover:bg-indigo-700'
              >
                Google Meet
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='w-full max-w-4xl'
      >
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100'>
          <div className='flex justify-between items-center px-5 py-3.5 border-b bg-gradient-to-r from-purple-600 to-indigo-600'>
            <h1 className='text-lg font-medium text-white'>
              Planifier votre séance
            </h1>
            <Link
              href='/'
              className='text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10'
            >
              <XMarkIcon className='h-4 w-4' />
            </Link>
          </div>
          <div className='h-[600px] p-3'>
            <div
              id='calendly-inline'
              className='h-full w-full rounded-lg overflow-hidden shadow-inner bg-white'
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SchedulePageContent />
    </Suspense>
  );
}
