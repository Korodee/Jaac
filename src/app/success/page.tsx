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

function SuccessPageContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [hasSent, setHasSent] = useState(false);

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
                    <div className="text-red-500 mb-4">
                        <svg
                            className="h-12 w-12 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Une erreur est survenue
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden"
            >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(40deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] opacity-20"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                        }}
                        className="relative flex items-center justify-center mb-4"
                    >
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                            <CheckCircleIcon
                                className="h-8 w-8 text-green-600"
                                aria-hidden="true"
                            />
                        </div>
                    </motion.div>

                    <h1 className="text-2xl font-bold text-center mb-1">
                        Paiement réussi !
                    </h1>
                    <p className="text-center text-purple-100 text-sm">
                        Merci pour votre confiance. Un email de confirmation
                        vous a été envoyé.
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
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
                                        Un email de confirmation a été envoyé
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <FaCalendarAlt className="w-4 h-4 text-purple-600 mr-2" />
                                    <span>
                                        Prochain paiement:{" "}
                                        {subscriptionDetails?.nextBillingDate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="space-y-2">
                            <h2 className="text-sm font-semibold text-gray-900">
                                Prochaines étapes
                            </h2>
                            <div className="space-y-2">
                                <p className="text-gray-600 text-sm">
                                    1. Vérifiez votre boîte de réception
                                </p>
                                <p className="text-gray-600 text-sm">
                                    2. Accédez à votre espace client
                                </p>
                                <p className="text-gray-600 text-sm">
                                    3. Planifiez votre première séance
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 pt-4">
                            <Link
                                href="/"
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl py-2.5 px-4 text-center text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                            >
                                Retour à l'accueil
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full bg-white border border-purple-600 text-purple-600 rounded-xl py-2.5 px-4 text-center text-sm font-medium hover:bg-purple-50 transition-all duration-300"
                            >
                                Contacter le support
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
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
