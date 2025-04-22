// Google Pay API Integration
// This file contains utility functions for integrating Google Pay into the application

// Define the payment request interface
export interface PaymentRequest {
  totalPrice: string;
  currencyCode: string;
  countryCode: string;
  merchantId: string;
  merchantName: string;
  merchantOrigin: string;
}

// Define the payment response interface
export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

// Initialize Google Pay API
export const initializeGooglePay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if Google Pay is available
    if (typeof window !== 'undefined' && window.google && window.google.payments) {
      resolve(true);
    } else {
      // Load Google Pay script if not available
      const script = document.createElement('script');
      script.src = 'https://pay.google.com/gp/p/js/pay.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    }
  });
};

// Create a payment request
export const createPaymentRequest = (request: PaymentRequest) => {
  if (typeof window === 'undefined' || !window.google || !window.google.payments) {
    throw new Error('Google Pay API not available');
  }

  const paymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'DISCOVER'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: request.merchantId,
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: request.merchantId,
      merchantName: request.merchantName,
      merchantOrigin: request.merchantOrigin,
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: request.totalPrice,
      currencyCode: request.currencyCode,
      countryCode: request.countryCode,
    },
  };

  return paymentDataRequest;
};

// Process payment with Google Pay
export const processGooglePayPayment = async (
  request: PaymentRequest
): Promise<PaymentResponse> => {
  try {
    // Check if Google Pay is available
    if (!window.google || !window.google.payments) {
      throw new Error('Google Pay is not available');
    }

    // Create a new Google Pay button
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: 'TEST', // Change to 'PRODUCTION' for live payments
    });

    // Create payment request
    const paymentDataRequest = createPaymentRequest(request);

    // Request payment data
    const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);

    // Process the payment data
    // In a real implementation, you would send this to your payment processor
    console.log('Payment data received:', paymentData);

    // Simulate successful payment
    return {
      success: true,
      transactionId: `txn_${Date.now()}`,
    };
  } catch (error: any) {
    console.error('Google Pay error:', error);
    return {
      success: false,
      error: error.message || 'Payment failed',
    };
  }
};

// Add TypeScript declarations for Google Pay
declare global {
  interface Window {
    google?: {
      payments?: {
        api: {
          PaymentsClient: new (options: { environment: string }) => {
            loadPaymentData: (request: any) => Promise<any>;
          };
        };
      };
    };
  }
} 