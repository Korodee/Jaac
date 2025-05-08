import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const { fullName, email, phone, company, message } = await req.json();

        // Validate required fields
        if (!fullName || !email) {
            return new Response(
                JSON.stringify({ error: "Nom complet et email requis." }),
                { status: 400 }
            );
        }

        // Check for required env vars
        const apiKey = process.env.BREVO_API_KEY;
        const fromEmail = process.env.BREVO_FROM_EMAIL;
        const toEmail = process.env.BREVO_TO_EMAIL;
        if (!apiKey || !fromEmail || !toEmail) {
            console.error("Missing Resend environment variables.");
            return new Response(
                JSON.stringify({
                    error: "Erreur de configuration du serveur email.",
                }),
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        // Compose email
        const data = {
            from: fromEmail,
            to: toEmail,
            reply_to: email,
            subject: `Nouveau message du formulaire de contact JAAC`,
            text: `Nom: ${fullName}\nEmail: ${email}\nTéléphone: ${phone || ""}\nEntreprise: ${company || ""}\n\nMessage:\n${message || ""}`,
            html: `<p><strong>Nom:</strong> ${fullName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Téléphone:</strong> ${phone || ""}</p>
             <p><strong>Entreprise:</strong> ${company || ""}</p>
             <p><strong>Message:</strong><br/>${message || ""}</p>`,
        };

        // Send email
        try {
            await resend.emails.send(data);
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
            });
        } catch (sendErr) {
            console.error("Resend error:", sendErr);
            return new Response(
                JSON.stringify({ error: "Erreur lors de l'envoi de l'email." }),
                { status: 500 }
            );
        }
    } catch (err) {
        console.error("API error:", err);
        return new Response(JSON.stringify({ error: "Erreur serveur." }), {
            status: 500,
        });
    }
}
