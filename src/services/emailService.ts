import axios from "axios";

if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not defined in environment variables");
}

if (!process.env.ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not defined in environment variables");
}

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const headers = {
    accept: "application/json",
    "api-key": process.env.BREVO_API_KEY,
    "content-type": "application/json",
};

interface EmailData {
    to: string;
    name: string;
    planName: string;
    amount: string;
    currency: string;
    nextBillingDate?: string;
}

export const sendUserConfirmationEmail = async (data: EmailData) => {
    try {
        if (!data.to || !data.name) {
            throw new Error("Missing required email data");
        }

        const payload = {
            to: [{ email: data.to, name: data.name }],
            sender: { email: "jaac.team@gmail.com", name: "JAAC" },
            templateId: 1,
            params: {
                name: data.name,
                planName: data.planName,
                amount: data.amount,
                currency: data.currency,
            },
        };

        const response = await axios.post(BREVO_API_URL, payload, { headers });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error sending user confirmation email:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to send user confirmation email",
        };
    }
};

export const sendAdminNotificationEmail = async (data: EmailData) => {
    try {
        if (!data.to || !data.name) {
            throw new Error("Missing required email data");
        }

        const payload = {
            to: [{ email: process.env.ADMIN_EMAIL, name: "JAAC Admin" }],
            sender: { email: "jaac.team@gmail.com", name: "JAAC" },
            templateId: 2,
            params: {
                customerName: data.name,
                customerEmail: data.to,
                planName: data.planName,
                amount: data.amount,
                currency: data.currency,
            },
        };

        const response = await axios.post(BREVO_API_URL, payload, { headers });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error sending admin notification email:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to send admin notification email",
        };
    }
};
