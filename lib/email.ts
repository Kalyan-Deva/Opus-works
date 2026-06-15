import { Resend } from "resend";

/**
 * Email delivery via Resend, gated on environment variables.
 *
 * If RESEND_API_KEY is not set, every function returns `{ delivered: false }`
 * and the API routes fall back to "stub success" — so the forms work in
 * development with no configuration. Set the env vars (see .env.example) to go
 * live.
 *
 * Env:
 *   RESEND_API_KEY      required to send anything
 *   EMAIL_FROM          verified sender, e.g. "Opus <hello@yourdomain.com>"
 *   CONTACT_TO_EMAIL    inbox that receives contact-form messages
 *   RESEND_AUDIENCE_ID  optional; if set, newsletter signups are added to it
 */
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM ?? "Opus <onboarding@resend.dev>";
const contactTo = process.env.CONTACT_TO_EMAIL ?? process.env.EMAIL_FROM;
const audienceId = process.env.RESEND_AUDIENCE_ID;

const resend = apiKey ? new Resend(apiKey) : null;

export function isEmailConfigured(): boolean {
  return resend !== null;
}

type Result = { delivered: boolean };

export async function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
}): Promise<Result> {
  if (!resend || !contactTo) return { delivered: false };

  const { error } = await resend.emails.send({
    from,
    to: contactTo,
    replyTo: input.email,
    subject: `New message from ${input.name} via Opus`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  });

  if (error) throw new Error(error.message);
  return { delivered: true };
}

export async function subscribeNewsletter(email: string): Promise<Result> {
  if (!resend) return { delivered: false };

  // Preferred: add the subscriber to a Resend Audience.
  if (audienceId) {
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
    if (error) throw new Error(error.message);
    return { delivered: true };
  }

  // Fallback: notify the owner so no signup is lost.
  if (contactTo) {
    const { error } = await resend.emails.send({
      from,
      to: contactTo,
      subject: "New newsletter signup",
      text: `New subscriber: ${email}`,
    });
    if (error) throw new Error(error.message);
    return { delivered: true };
  }

  return { delivered: false };
}
