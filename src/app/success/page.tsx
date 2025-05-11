"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaCheckCircle,
    FaEnvelope,
    FaUser,
    FaCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import CalendlyModal from "@/components/CalendlyModal";

function SuccessPageContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [hasSent, setHasSent] = useState(false);
    const [showCalendlyModal, setShowCalendlyModal] = useState(false);

    useEffect(() => {
        const sendConfirmationEmails = async () => {
            try {
                const sessionId = searchParams.get("session_id");
                if (!sessionId) {
                    throw new Error("No session ID found");
                }

                // Fetch session details from your API
                const response = await fetch("/api/get-session-details", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ sessionId }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Session details API error:", {
                        status: response.status,
                        statusText: response.statusText,
                        body: errorText,
                    });
                    throw new Error(
                        `Failed to get session details: ${response.statusText}`
                    );
                }

                const sessionData = await response.json();
                if (!sessionData.success) {
                    throw new Error(
                        sessionData.error || "Failed to get session details"
                    );
                }

                // Send confirmation emails
                const emailResponse = await fetch(
                    "/api/send-confirmation-emails",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            customerEmail: sessionData.customerEmail,
                            customerName: sessionData.customerName,
                            planName: sessionData.planName,
                            amount: sessionData.amount,
                            currency: sessionData.currency,
                        }),
                    }
                );

                if (!emailResponse.ok) {
                    const errorJson = await emailResponse.json();
                    console.error("Email confirmation API error:", {
                        status: emailResponse.status,
                        statusText: emailResponse.statusText,
                        body: errorJson,
                    });
                    if (errorJson.details) {
                        console.error(
                            "Detailed email error:",
                            errorJson.details
                        );
                    }
                    throw new Error(
                        `Failed to send confirmation emails: ${errorJson.error || emailResponse.statusText}`
                    );
                }

                setSubscriptionDetails({
                    customerName: sessionData.customerName,
                    planName: sessionData.planName,
                    amount: sessionData.amount,
                    currency: sessionData.currency,
                    interval: "month",
                    nextBillingDate: sessionData.nextBillingDate,
                });
                setIsLoading(false);
                setHasSent(true);
                sessionStorage.setItem("confirmationSent", "true");
            } catch (err) {
                console.error("Error in success page:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Une erreur est survenue"
                );
                setIsLoading(false);
            }
        };
        if (
            hasSent ||
            typeof window === "undefined" ||
            sessionStorage.getItem("confirmationSent")
        )
            return;
        sendConfirmationEmails();
    }, [searchParams, hasSent]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        Traitement de votre paiement...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-6">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Une erreur est survenue
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <a
                        href="/subscribe"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    >
                        Retour à la page d'abonnement
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 text-white overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(40deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] opacity-20"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">
                                Paiement réussi !
                            </h1>
                            <p className="text-purple-100">
                                Merci pour votre confiance. Votre abonnement a
                                été activé avec succès.
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-6">
                        <div className="space-y-6">
                            {/* Subscription Details */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <FaUser className="w-4 h-4 text-purple-600 mr-2" />
                                        <span>
                                            {subscriptionDetails?.customerName}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <FaEnvelope className="w-4 h-4 text-purple-600 mr-2" />
                                        <span>
                                            Un email de confirmation a été
                                            envoyé
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <FaCalendarAlt className="w-4 h-4 text-purple-600 mr-2" />
                                        <span>
                                            Prochain paiement:{" "}
                                            {
                                                subscriptionDetails?.nextBillingDate
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Prochaines étapes
                                </h3>
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                                                    <span className="text-purple-600 font-semibold">
                                                        1
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-base font-medium text-gray-900">
                                                    Planifiez votre première
                                                    séance
                                                </h4>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Choisissez un horaire qui
                                                    vous convient pour votre
                                                    première séance.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                                                    <span className="text-purple-600 font-semibold">
                                                        2
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-base font-medium text-gray-900">
                                                    Préparez-vous
                                                </h4>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Réfléchissez à vos objectifs
                                                    et à ce que vous souhaitez
                                                    accomplir.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setShowCalendlyModal(true)}
                                    className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    Planifier ma séance
                                </button>
                                <a
                                    href="/"
                                    className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    Retour à l'accueil
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendly Modal */}
            <CalendlyModal
                isOpen={showCalendlyModal}
                onClose={() => setShowCalendlyModal(false)}
                customerName={subscriptionDetails?.customerName || ""}
                customerEmail={searchParams.get("customer_email") || ""}
            />
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <SuccessPageContent />
        </Suspense>
    );
}
