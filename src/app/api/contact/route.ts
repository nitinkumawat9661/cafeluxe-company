import { NextResponse } from "next/server";

function clean(value: unknown) {
  return String(value ?? "").trim();
}

export async function POST(request: Request) {
  const url = new URL(request.url);

  try {
    const form = await request.formData();

    const name = clean(form.get("name"));
    const phone = clean(form.get("phone"));
    const service = clean(form.get("service"));
    const budget = clean(form.get("budget"));
    const business = clean(form.get("business"));
    const businessType = clean(form.get("businessType"));
    const location = clean(form.get("location"));
    const onlineUrl = clean(form.get("onlineUrl"));
    const message = clean(form.get("message"));

    const phoneDigits = phone.replace(/\D/g, "");

    const invalid =
      name.length < 2 ||
      name.length > 60 ||
      phoneDigits.length < 10 ||
      phoneDigits.length > 13 ||
      !service ||
      message.length < 10 ||
      message.length > 500;

    if (invalid) {
      return NextResponse.redirect(new URL("/?lead=invalid#contact", url), 303);
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.redirect(new URL("/?lead=config#contact", url), 303);
    }

    const text = [
      "New TrustFirst Growth Lead",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Business: ${business || "Not provided"}`,
      `Business Type: ${businessType || "Not provided"}`,
      `Location: ${location || "Not provided"}`,
      `Service: ${service}`,
      `Budget: ${budget || "Not sure yet"}`,
      `Website/Instagram: ${onlineUrl || "Not provided"}`,
      "",
      `Challenge: ${message}`
    ].join("\n");

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    if (!telegramResponse.ok) {
      return NextResponse.redirect(new URL("/?lead=telegram#contact", url), 303);
    }

    return NextResponse.redirect(new URL("/?lead=sent#contact", url), 303);
  } catch {
    return NextResponse.redirect(new URL("/?lead=error#contact", url), 303);
  }
}
