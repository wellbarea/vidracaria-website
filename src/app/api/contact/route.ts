import { Resend } from "resend";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, unknown>;

  // Basic validation
  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof phone !== "string" || !phone.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return Response.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  // Sanitise lengths to prevent abuse
  if (
    name.length > 200 ||
    email.length > 200 ||
    phone.length > 50 ||
    message.length > 5000
  ) {
    return Response.json({ error: "Dados muito longos." }, { status: 400 });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return Response.json(
      { error: "Serviço de e-mail não configurado. Entre em contato por telefone." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Vitralle Website <onboarding@resend.dev>",
      to: "wellington.gabriel90@gmail.com",
      replyTo: email,
      subject: `Novo contato: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
          <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 24px; font-size: 22px; color: #0a0a0a; font-weight: 700;">
              Novo Contato — Vitralle
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px; width: 100px;">Nome</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #0a0a0a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px;">E-mail</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0a0a0a;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px;">Telefone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0a0a0a;">${phone}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="color: #6b7280; font-size: 13px; margin-bottom: 8px;">Mensagem</p>
              <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; color: #0a0a0a; white-space: pre-wrap; line-height: 1.6;">
                ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
              </div>
            </div>
          </div>
          <p style="text-align: center; margin-top: 16px; color: #9ca3af; font-size: 12px;">
            Enviado pelo formulário do site Vitralle
          </p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json(
      { error: "Erro ao enviar e-mail. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

