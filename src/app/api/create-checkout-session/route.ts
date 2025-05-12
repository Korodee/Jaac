import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripeConfig } from "../../../config/stripe";

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-04-30.basil",
});

// Create test product and price for Plan Individuel if they don't exist
async function ensureTestProductIndividual() {
    try {
        const product = await stripe.products.create({
            name: "Plan Individuel",
            description: "Plan mensuel de soutien psychologique",
        });
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: 4900, // $49.00
            currency: "cad",
            recurring: {
                interval: "month",
            },
        });
        stripeConfig.products.individual.priceId = price.id;
        return price.id;
    } catch (error) {
        console.error("Error creating test product (individual):", error);
        throw error;
    }
}

// Create test product and price for Coup de Main if they don't exist
async function ensureTestProductCoupDeMain() {
    try {
        const product = await stripe.products.create({
            name: "Coup de Main",
            description: "Intervention rapide de 30 minutes",
        });
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: 2900, // $29.00
            currency: "cad",
            // No recurring for one-time session
        });
        stripeConfig.products.coupdemain.priceId = price.id;
        return price.id;
    } catch (error) {
        console.error("Error creating test product (coupdemain):", error);
        throw error;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { planId, customerEmail, customerName, customerPhone, company } =
            body;

        // Validate required fields
        if (!customerEmail || !customerName) {
            return NextResponse.json(
                { error: "Email and name are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Get the price ID from the plan ID
        let priceId =
            stripeConfig.products[planId as keyof typeof stripeConfig.products]
                ?.priceId;

        // If using the test price ID, create a real one
        if (planId === "individual" && priceId === "price_INDIVIDUAL_TEST_ID") {
            priceId = await ensureTestProductIndividual();
        }
        if (planId === "coupdemain" && priceId === "price_COUPDEMAIN_TEST_ID") {
            priceId = await ensureTestProductCoupDeMain();
        }

        if (!priceId) {
            return NextResponse.json(
                { error: "Invalid plan ID" },
                { status: 400 }
            );
        }

        // Determine the correct mode for Stripe Checkout
        const mode = planId === "coupdemain" ? "payment" : "subscription";

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
            customer_email: customerEmail,
            billing_address_collection: "required",
            metadata: {
                customerName,
                customerPhone,
                company: "JAAC",
            },
        });

        if (!session?.id) {
            throw new Error("Failed to create checkout session");
        }

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Error creating checkout session",
            },
            { status: 500 }
        );
    }
}
