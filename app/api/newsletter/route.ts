import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup endpoint.
 *
 * Adds the subscriber via Resend when configured (see lib/email.ts); otherwise
 * validates and returns a stub success so the form works in development.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email)
      : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  try {
    await subscribeNewsletter(email);
  } catch {
    return NextResponse.json(
      { error: "Couldn't subscribe you right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thanks — you're on the list!",
  });
}
