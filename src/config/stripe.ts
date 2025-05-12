// Stripe Configuration
export const stripeConfig = {
    // Publishable key from environment
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE || "",

    // Product IDs for different plans
    products: {
        individual: {
            priceId: "price_INDIVIDUAL_TEST_ID", // Replace with your actual test price ID
            name: "Plan Individuel",
            price: 49,
            currency: "CAD",
            interval: "month",
        },
        coupdemain: {
            priceId: "price_COUPDEMAIN_TEST_ID", // Replace with your actual test price ID
            name: "Coup de Pouce",
            price: 29,
            currency: "CAD",
            interval: "session",
        },
        enterprise: {
            priceId: "price_ENTERPRISE_TEST_ID", // Replace with your actual test price ID
            name: "Plan Entreprise",
            price: "custom",
            currency: "CAD",
            interval: "custom",
        },
    },
};
