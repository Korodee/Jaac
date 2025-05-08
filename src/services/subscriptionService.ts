// Subscription Service
// This file contains functions for managing subscriptions

import { stripeConfig } from "../config/stripe";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(stripeConfig.publishableKey);

// Define the subscription data interface
export interface SubscriptionData {
    planId: string;
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
}

// Create a new subscription
export const createSubscription = async (
    data: SubscriptionData
): Promise<{ success: boolean; subscriptionId?: string; error?: string }> => {
    try {
        // Load Stripe
        const stripe = await stripePromise;
        if (!stripe) {
            throw new Error("Failed to load Stripe");
        }

        // Create a checkout session
        const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                planId: data.planId,
                customerEmail: data.email,
                customerName: data.fullName,
                customerPhone: data.phone,
                company: data.company,
            }),
        });

        const { sessionId, error } = await response.json();

        if (error) {
            // Handle specific error cases
            if (error.includes("card was declined")) {
                throw new Error(
                    "La carte a été refusée. Veuillez essayer une autre carte ou contacter votre banque."
                );
            }
            throw new Error(error);
        }

        if (!sessionId) {
            throw new Error("No session ID received");
        }

        // Redirect to Stripe Checkout
        const { error: stripeError } = await stripe.redirectToCheckout({
            sessionId,
        });

        if (stripeError) {
            // Handle specific Stripe error cases
            if (stripeError.type === "card_error") {
                switch (stripeError.code) {
                    case "card_declined":
                        throw new Error(
                            "La carte a été refusée. Veuillez essayer une autre carte ou contacter votre banque."
                        );
                    case "insufficient_funds":
                        throw new Error(
                            "Fonds insuffisants. Veuillez essayer une autre carte."
                        );
                    case "expired_card":
                        throw new Error(
                            "La carte a expiré. Veuillez utiliser une autre carte."
                        );
                    case "incorrect_cvc":
                        throw new Error(
                            "Code CVC incorrect. Veuillez vérifier et réessayer."
                        );
                    default:
                        throw new Error(
                            "Une erreur est survenue avec votre carte. Veuillez réessayer ou utiliser une autre carte."
                        );
                }
            }
            throw stripeError;
        }

        return {
            success: true,
        };
    } catch (error) {
        console.error("Subscription creation error:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue lors de la création de l'abonnement",
        };
    }
};

// Send confirmation email
export const sendConfirmationEmail = async (
    email: string,
    subscriptionId: string,
    planName: string
): Promise<boolean> => {
    try {
        // In a real implementation, you would call your email service
        console.log(
            `Sending confirmation email to ${email} for subscription ${subscriptionId}`
        );
        await new Promise((resolve) => setTimeout(resolve, 500));

        return true;
    } catch (error) {
        console.error("Email sending error:", error);
        return false;
    }
};
