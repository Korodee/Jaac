// Payment Configuration
// This file contains configuration settings for payment processing

// Google Pay Configuration
export const googlePayConfig = {
    merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID || "",
    merchantName: "JAAC - Soutien psychologique",
    merchantOrigin:
        process.env.NEXT_PUBLIC_BASE_URL || "https://jaac-trans.vercel.app",
    environment: "TEST", // Change to 'PRODUCTION' for live payments
    currencyCode: "CAD",
    countryCode: "CA",
};

// Payment Gateway Configuration
export const paymentGatewayConfig = {
    apiKey: process.env.NEXT_PUBLIC_PAYMENT_API_KEY || "",
    apiUrl:
        process.env.NEXT_PUBLIC_PAYMENT_API_URL ||
        "https://api.payment-gateway.com",
};

// Subscription Plans Configuration
export const subscriptionPlans = {
    individual: {
        id: "individual",
        name: "Plan Individuel",
        price: "49",
        currency: "CAD",
        interval: "month",
    },
    coupdemain: {
        id: "coupdemain",
        name: "Coup de Pouce",
        price: "29",
        currency: "CAD",
        interval: "session",
    },
    enterprise: {
        id: "enterprise",
        name: "Plan Entreprise",
        price: "custom",
        currency: "CAD",
        interval: "custom",
    },
};
