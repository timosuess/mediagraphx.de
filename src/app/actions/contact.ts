"use server";

import nodemailer from "nodemailer";

export type ContactFormState = {
  success: boolean;
  error: string | null;
};

export async function sendContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Bitte füllen Sie alle Pflichtfelder aus." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const recipientEmail = process.env.CONTACT_EMAIL || "timo.suess@mdgx.de";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS env vars.");
    return {
      success: false,
      error: "Das Kontaktformular ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns direkt per E-Mail oder Telefon.",
    };
  }

  const subjectLabels: Record<string, string> = {
    webdesign: "Webdesign",
    corporate: "Corporate Design",
    logo: "Logoentwicklung",
    print: "Printwerbung",
    seo: "SEO / Online Marketing",
    foto: "Fotografie",
    sonstiges: "Sonstiges",
  };

  const subjectLine = subject
    ? `Projektanfrage: ${subjectLabels[subject] || subject} - ${name}`
    : `Kontaktanfrage von ${name}`;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"MediaGraphX Website" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: subjectLine,
      text: [
        `Neue Kontaktanfrage über mediagraphx.de`,
        ``,
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Betreff: ${subjectLabels[subject] || subject || "Kein Betreff"}`,
        ``,
        `Nachricht:`,
        message,
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #E8941A; padding: 20px 30px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Neue Kontaktanfrage</h1>
          </div>
          <div style="padding: 30px; background: #FEFCF9; border: 1px solid #D4D4D4;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #8C8C8C; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #2A2A2A; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8C8C8C;">E-Mail:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #E8941A;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8C8C8C;">Betreff:</td>
                <td style="padding: 8px 0; color: #2A2A2A;">${subjectLabels[subject] || subject || "Kein Betreff"}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #D4D4D4; margin: 20px 0;" />
            <p style="color: #8C8C8C; font-size: 13px; margin-bottom: 8px;">Nachricht:</p>
            <p style="color: #2A2A2A; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="padding: 15px 30px; background: #3A3A3A; text-align: center;">
            <p style="color: #8C8C8C; font-size: 12px; margin: 0;">Gesendet über mediagraphx.de</p>
          </div>
        </div>
      `,
    });

    return { success: true, error: null };
  } catch (err) {
    console.error("Failed to send email:", err);
    return {
      success: false,
      error: "Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut.",
    };
  }
}
