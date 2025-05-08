import axios from "axios";

if (!process.env.NEXT_PUBLIC_BREVO_API) {
    throw new Error(
        "NEXT_PUBLIC_BREVO_API is not defined in environment variables"
    );
}

if (!process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    throw new Error(
        "NEXT_PUBLIC_ADMIN_EMAIL is not defined in environment variables"
    );
}

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const headers = {
    accept: "application/json",
    "api-key": process.env.NEXT_PUBLIC_BREVO_API,
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
            to: [
                {
                    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
                    name: "JAAC Admin",
                },
            ],
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

export const sendContactUsEmail = async (data: {
    fullName: string;
    email: string;
    phone: string;
    message: string;
}) => {
    try {
        if (!data.email) {
            throw new Error("Missing required email data");
        }

        const payload = {
            to: [
                {
                    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
                    name: "JAAC Admin",
                },
            ],
            sender: { email: "jaac.team@gmail.com", name: "JAAC" },
            templateId: 3,
            params: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                message: data.message,
            },
        };

        const response = await axios.post(BREVO_API_URL, payload, { headers });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error sending contact us email:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to send contact us email",
        };
    }
};
