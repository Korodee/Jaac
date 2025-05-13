import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Server configuration error: Missing Stripe secret key" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { sessionId } = await request.json();
    console.log("Verifying session:", sessionId);

    if (!sessionId) {
      console.log("No session ID provided");
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    try {
      // Fetch session directly from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["customer"],
      });
      console.log(
        "Session retrieved:",
        session.id,
        "Payment status:",
        session.payment_status
      );

      if (!session) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      if (session.payment_status !== "paid") {
        return NextResponse.json(
          { error: "Payment not completed" },
          { status: 400 }
        );
      }

      // Get customer details (support both subscriptions and one-time payments)
      let customerName = "";
      let customerEmail = "";
      if (session.customer) {
        const customer = session.customer as Stripe.Customer;
        customerName = customer.name || "";
        customerEmail = customer.email || "";
      } else if (session.customer_details) {
        customerName = session.customer_details.name || "";
        customerEmail = session.customer_details.email || "";
      } else {
        return NextResponse.json(
          { error: "Customer information not found" },
          { status: 400 }
        );
      }
      console.log("Customer details retrieved:", {
        customerName,
        customerEmail,
      });

      // Return the verified status and user data
      return NextResponse.json({
        verified: true,
        customerName,
        customerEmail,
      });
    } catch (stripeError: any) {
      console.error("Stripe API error:", {
        message: stripeError.message,
        type: stripeError.type,
        code: stripeError.code,
      });
      return NextResponse.json(
        { error: `Stripe error: ${stripeError.message}` },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Payment verification error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: `Verification failed: ${error.message}` },
      { status: 500 }
    );
  }
}
