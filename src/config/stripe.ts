// Stripe Configuration
export const stripeConfig = {
    // Test publishable key
    publishableKey: "pk_test_qblFNYngBkEdjEZ16jxxoWSM",

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
            name: "Coup de Main",
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
