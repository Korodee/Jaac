import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-04-30.basil",
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sessionId } = body;

        if (!sessionId) {
            return NextResponse.json(
                { success: false, error: "Session ID is required" },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["customer", "subscription"],
        });

        // Get the plan name from the line items
        const lineItems =
            await stripe.checkout.sessions.listLineItems(sessionId);
        const planName = lineItems.data[0]?.description || "Unknown Plan";

        // Format the amount
        const amount = (session.amount_total! / 100).toFixed(2);
        const currency = session.currency?.toUpperCase() || "CAD";

        return NextResponse.json({
            success: true,
            customerEmail: session.customer_email,
            customerName: session.customer_details?.name,
            planName,
            amount,
            currency,
        });
    } catch (error) {
        console.error("Error fetching session details:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch session details" },
            { status: 500 }
        );
    }
}
