import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form endpoint.
 *
 * Delivers the message via Resend when configured (see lib/email.ts); otherwise
 * validates and returns a stub success so the form works in development.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !message) {
    return NextResponse.json(
      { error: "Please fill in your name and message." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  try {
    await sendContactEmail({ name, email, message });
  } catch {
    return NextResponse.json(
      { error: "Couldn't send your message right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thanks for reaching out — I'll get back to you soon.",
  });
}
