// Subscription Service
// This file contains functions for managing subscriptions

import { googlePayConfig, subscriptionPlans } from '../config/payment';
import { PaymentRequest, PaymentResponse, processGooglePayPayment } from '../utils/googlePay';

// Define the subscription data interface
export interface SubscriptionData {
  planId: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  paymentMethod: 'googlePay';
  transactionId?: string;
}

// Create a new subscription
export const createSubscription = async (
  data: SubscriptionData
): Promise<{ success: boolean; subscriptionId?: string; error?: string }> => {
  try {
    // Get plan details
    const plan = subscriptionPlans[data.planId as keyof typeof subscriptionPlans];
    if (!plan) {
      return { success: false, error: 'Invalid plan selected' };
    }

    // Process payment with Google Pay
    const paymentRequest: PaymentRequest = {
      totalPrice: plan.price,
      currencyCode: googlePayConfig.currencyCode,
      countryCode: googlePayConfig.countryCode,
      merchantId: googlePayConfig.merchantId,
      merchantName: googlePayConfig.merchantName,
      merchantOrigin: googlePayConfig.merchantOrigin,
    };

    const paymentResponse = await processGooglePayPayment(paymentRequest);
    
    if (!paymentResponse.success) {
      return { 
        success: false, 
        error: paymentResponse.error || 'Payment processing failed' 
      };
    }

    // In a real implementation, you would send the subscription data to your backend
    // For this example, we'll simulate a successful subscription creation
    
    // Simulate API call to create subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a random subscription ID
    const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Return success with subscription ID
    return {
      success: true,
      subscriptionId,
    };
  } catch (error) {
    console.error('Subscription creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create subscription',
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
    // For this example, we'll simulate sending an email
    
    console.log(`Sending confirmation email to ${email} for subscription ${subscriptionId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}; 