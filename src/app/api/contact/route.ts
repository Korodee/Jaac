import { NextResponse } from "next/server";
import { sendContactUsEmail } from "@/services/emailService";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, phone, message } = body;

        // Send email to admin
        const userEmailResult = await sendContactUsEmail({
            fullName,
            email,
            phone,
            message,
        });

        if (!userEmailResult.success) {
            const errorDetails = {
                user: userEmailResult.error,
            };
            console.error("Email sending failed:", errorDetails);
            return NextResponse.json(
                {
                    error: "Failed to send contact us email",
                    details: errorDetails,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in contact us email:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
