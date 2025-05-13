import { NextResponse } from "next/server";
import axios from "axios";

// Debug environment variables at startup
console.log("Environment Variables Check:", {
  NODE_ENV: process.env.NODE_ENV,
  hasBrevoKey: !!process.env.NEXT_PUBLIC_BREVO_API,
  brevoKeyLength: process.env.NEXT_PUBLIC_BREVO_API?.length,
  brevoKeyPrefix: process.env.NEXT_PUBLIC_BREVO_API?.substring(0, 8),
  hasAdminEmail: !!process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  // Log all environment variable names (not values) for debugging
  envKeys: Object.keys(process.env).filter(
    (key) =>
      key.includes("NEXT_PUBLIC_BREVO_API") ||
      key.includes("NEXT_PUBLIC_ADMIN_EMAIL")
  ),
});

// Check if we're in development or production
console.log("Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
});

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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const role = formData.get("role") as string;
    const message = formData.get("message") as string;
    const cvFile = formData.get("cv") as File | null;

    // Basic validation
    if (!name || !email || !phone || !role || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare attachment if CV is present
    let attachment = [];
    if (cvFile) {
      const arrayBuffer = await cvFile.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      attachment.push({
        content: base64,
        name: cvFile.name,
      });
    }

    const payload = {
        to: [
          {
            email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            name: "JAAC Admin",
          },
        ],
        sender: { email: "jaac.team@gmail.com", name: "JAAC" },
        subject: `Nouvelle candidature: ${role}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; background: #fff; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="margin-top: 0; color: #222; font-size: 1.5rem;">Nouvelle candidature reçue</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 1rem;">
              <tr>
                <td style="font-weight: bold; padding: 6px 0; width: 120px;">Nom</td>
                <td style="padding: 6px 0;">${name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 6px 0;">Email</td>
                <td style="padding: 6px 0;">${email}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 6px 0;">Téléphone</td>
                <td style="padding: 6px 0;">${phone}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 6px 0;">Poste</td>
                <td style="padding: 6px 0;">${role}</td>
              </tr>
            </table>
            <div style="margin-bottom: 18px;">
              <div style="font-weight: bold; margin-bottom: 6px; color: #444;">Lettre de motivation / Message</div>
              <div style="background: #f7f7f7; border-radius: 4px; padding: 12px; color: #222; border: 1px solid #e5e7eb;">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div style="margin-top: 18px; color: #555; font-size: 1rem;">
              CV en pièce jointe
            </div>
          </div>
        `,
        attachment,
      };

    const headers = {
      accept: "application/json",
      "api-key": process.env.NEXT_PUBLIC_BREVO_API,
      "content-type": "application/json",
    };

    await axios.post("https://api.brevo.com/v3/smtp/email", payload, {
      headers,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error.response?.data?.message || error.message,
      },
      { status: 500 }
    );
  }
}
