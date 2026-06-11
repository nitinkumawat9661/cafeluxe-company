import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const rating = String(form.get("rating") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (name.length < 2 || name.length > 60) {
      return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
    }

    if (message.length < 5 || message.length > 500) {
      return NextResponse.json({ ok: false, error: "invalid_message" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: "telegram_config_missing" }, { status: 500 });
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

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    if (!telegramResponse.ok) {
      return NextResponse.json({ ok: false, error: "telegram_send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
