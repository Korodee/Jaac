// Payment Configuration
// This file contains configuration settings for payment processing

// Google Pay Configuration
export const googlePayConfig = {
  merchantId: '12345678901234567890', // Replace with your actual merchant ID
  merchantName: 'JAAC - Soutien psychologique',
  merchantOrigin: 'https://jaac-trans.vercel.app', // Replace with your actual domain
  environment: 'TEST', // Change to 'PRODUCTION' for live payments
  currencyCode: 'CAD',
  countryCode: 'CA',
};

// Payment Gateway Configuration
export const paymentGatewayConfig = {
  apiKey: process.env.NEXT_PUBLIC_PAYMENT_API_KEY || '',
  apiUrl: process.env.NEXT_PUBLIC_PAYMENT_API_URL || 'https://api.payment-gateway.com',
};

// Subscription Plans Configuration
export const subscriptionPlans = {
  individual: {
    id: 'individual',
    name: 'Plan Individuel',
    price: '49',
    currency: 'CAD',
    interval: 'month',
  },
  coupdemain: {
    id: 'coupdemain',
    name: 'Coup de Main',
    price: '29',
    currency: 'CAD',
    interval: 'session',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Plan Entreprise',
    price: 'custom',
    currency: 'CAD',
    interval: 'custom',
  },
}; 