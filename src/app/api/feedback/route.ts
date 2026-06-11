import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();

  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const rating = String(form.get("rating") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  const url = new URL(request.url);

  if (name.length < 2 || name.length > 60 || message.length < 5 || message.length > 500) {
    return NextResponse.redirect(new URL("/?feedback=invalid#feedback", url), 303);
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.redirect(new URL("/?feedback=config#feedback", url), 303);
  }

  const text = [
    "New TrustFirst Feedback",
    "",
    `Name: ${name}`,
    `Phone: ${phone || "Not provided"}`,
    `Rating: ${rating || "Not selected"}`,
    "",
    `Feedback: ${message}`
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text
    })
  });

  return NextResponse.redirect(new URL("/?feedback=sent#feedback", url), 303);
}
