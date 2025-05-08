import { NextResponse } from "next/server";
import {
    sendUserConfirmationEmail,
    sendAdminNotificationEmail,
} from "@/services/emailService";

export async function POST(request: Request) {
    try {
        const testData = {
            to: "jaac.team@gmail.com", // Using your admin email for testing
            name: "Test User",
            planName: "Plan Individuel",
            amount: "49.00",
            currency: "CAD",
            nextBillingDate: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toLocaleDateString(),
        };

        // Send test emails
        const [userResult, adminResult] = await Promise.all([
            sendUserConfirmationEmail(testData),
            sendAdminNotificationEmail(testData),
        ]);

        return NextResponse.json({
            success: true,
            userEmail: userResult,
            adminEmail: adminResult,
        });
    } catch (error) {
        console.error("Error in test email endpoint:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send test emails" },
            { status: 500 }
        );
    }
}
