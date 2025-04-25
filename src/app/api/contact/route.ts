import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password for better security
  },
  // Add connection pooling
  pool: true,
  maxConnections: 1,
  maxMessages: 100,
});

// Retry function
async function retryOperation(operation: () => Promise<any>, maxRetries = 3) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${i + 1} failed:`, error);
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  throw lastError;
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to your own email
      replyTo: email, // Allow reply to sender
      subject: `Nouveau message de contact de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6B46C1; border-bottom: 2px solid #E9D8FD; padding-bottom: 10px;">Nouveau message de contact</h2>
          <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 5px 0;"><strong style="color: #4A5568;">Nom :</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong style="color: #4A5568;">Email :</strong> ${email}</p>
            ${phone ? `<p style="margin: 5px 0;"><strong style="color: #4A5568;">Téléphone :</strong> ${phone}</p>` : ''}
          </div>
          <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 5px 0;"><strong style="color: #4A5568;">Message :</strong></p>
            <p style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #718096; font-size: 14px; margin-top: 20px;">
            Ce message a été envoyé via le formulaire de contact du site web JAAC.
          </p>
        </div>
      `,
    };

    // Send the email with retry logic
    await retryOperation(async () => {
      // Verify the connection before sending
      await transporter.verify();
      return transporter.sendMail(mailOptions);
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
} 