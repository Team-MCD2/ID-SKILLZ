import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		const { name, email, company, services, message } = data;

		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({ ok: false, error: "Les champs nom, email et message sont requis." }),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		// Read credentials from Vercel environment variables safely supporting both standard Node process.env and Vite import.meta.env
		const user = import.meta.env?.SMTP_USER || process.env.SMTP_USER;
		const pass = import.meta.env?.SMTP_PASS || process.env.SMTP_PASS;

		if (!user || !pass) {
			console.error("Configuration SMTP manquante (SMTP_USER / SMTP_PASS).");
			return new Response(
				JSON.stringify({ ok: false, error: "Configuration serveur de messagerie incomplète sur Vercel." }),
				{ status: 500, headers: { "Content-Type": "application/json" } }
			);
		}

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user,
				pass,
			},
		});

		const mailOptions = {
			from: `"${name}" <${email}>`,
			to: "etame.eddy01@gmail.com",
			replyTo: email,
			subject: `Nouvelle demande ID SKILLZ : ${name} ${company ? `(${company})` : ""}`,
			text: `Nom: ${name}\nEmail: ${email}\nSociété: ${company || "N/A"}\nMétiers souhaités: ${services || "N/A"}\n\nMessage:\n${message}`,
			html: `
				<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
					<div style="background: #0A0908; color: #F2EEE5; padding: 20px; text-align: center;">
						<h2 style="margin: 0; font-weight: 400; letter-spacing: -0.5px;">Nouvelle demande de projet</h2>
						<p style="margin: 5px 0 0; font-size: 13px; color: #B85B3D;">ID SKILLZ Digital Flagship</p>
					</div>
					<div style="padding: 24px;">
						<p><strong>Nom :</strong> ${name}</p>
						<p><strong>Email :</strong> <a href="mailto:${email}" style="color: #B85B3D;">${email}</a></p>
						<p><strong>Société :</strong> ${company || "<em>Non renseignée</em>"}</p>
						<p><strong>Métiers ciblés :</strong> <span style="background: #F2EEE5; padding: 4px 8px; border-radius: 4px; font-size: 13px; color: #0A0908;">${services || "<em>Aucun</em>"}</span></p>
						<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
						<h4 style="margin: 0 0 10px; color: #444;">Le projet :</h4>
						<p style="background: #FAF7F0; padding: 16px; border-radius: 6px; white-space: pre-wrap; line-height: 1.5; margin: 0; color: #111;">${message}</p>
					</div>
					<div style="background: #F2EEE5; padding: 12px; text-align: center; font-size: 12px; color: #666;">
						Message envoyé depuis le formulaire de contact du site <a href="https://id-skillz.com" style="color: #111;">id-skillz.com</a>
					</div>
				</div>
			`,
		};

		await transporter.sendMail(mailOptions);

		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err: any) {
		console.error("Erreur d'envoi d'email Nodemailer :", err);
		return new Response(
			JSON.stringify({ ok: false, error: err.message || "Erreur interne lors de l'envoi de l'email." }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
};
