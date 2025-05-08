import { NextResponse } from "next/server";
import {
    sendUserConfirmationEmail,
    sendAdminNotificationEmail,
} from "@/services/emailService";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerEmail, customerName, planName, amount, currency } =
            body;

        // Send email to user
        const userEmailResult = await sendUserConfirmationEmail({
            to: customerEmail,
            name: customerName,
            planName,
            amount,
            currency,
        });

        // Send email to admin
        const adminEmailResult = await sendAdminNotificationEmail({
            to: customerEmail,
            name: customerName,
            planName,
            amount,
            currency,
        });

        if (!userEmailResult.success || !adminEmailResult.success) {
            const errorDetails = {
                user: userEmailResult.error,
                admin: adminEmailResult.error,
            };
            console.error("Email sending failed:", errorDetails);
            return NextResponse.json(
                {
                    error: "Failed to send confirmation emails",
                    details: errorDetails,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in send-confirmation-emails:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
