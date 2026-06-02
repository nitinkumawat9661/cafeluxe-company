import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value: unknown, max = 300) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, max);
}

async function readBody(request: Request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) return await request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export async function POST(request: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: "Telegram env missing" }, { status: 500 });
    }

    const body = await readBody(request);

    const name = clean(body.name, 60);
    const phone = clean(body.phone, 15);
    const email = clean(body.email, 80);
    const business = clean(body.business, 70);
    const service = clean(body.service, 40);
    const budget = clean(body.budget, 12);
    const message = clean(body.message, 500);

    const phoneDigits = phone.replace(/\D/g, "");
    const budgetNumber = Number(budget.replace(/\D/g, ""));

    if (name.length < 2 || name.length > 60) {
      return NextResponse.json({ ok: false, error: "Name must be 2 to 60 characters" }, { status: 400 });
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      return NextResponse.json({ ok: false, error: "Enter a valid phone number" }, { status: 400 });
    }

    if (!service) {
      return NextResponse.json({ ok: false, error: "Service is required" }, { status: 400 });
    }

    if (!budget || Number.isNaN(budgetNumber) || budgetNumber < 100) {
      return NextResponse.json({ ok: false, error: "Budget must be at least 3 digits" }, { status: 400 });
    }

    if (message.length < 10 || message.length > 500) {
      return NextResponse.json({ ok: false, error: "Message must be 10 to 500 characters" }, { status: 400 });
    }

    const text = `New TrustFirst Solutions Lead

Name: ${name}
Phone: ${phoneDigits}
Email: ${email || "Not provided"}
Business: ${business || "Not provided"}
Service: ${service}
Budget: Rs ${budgetNumber}

Message:
${message}`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "Telegram send failed" }, { status: 502 });
    }

    return NextResponse.redirect(new URL("/?lead=sent#contact", request.url), 303);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
