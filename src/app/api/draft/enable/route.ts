import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function safeRedirectPath(path: string | null) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const redirectPath = safeRedirectPath(url.searchParams.get("slug") || url.searchParams.get("redirect"));
  const configuredSecret = process.env.SANITY_PREVIEW_SECRET;

  if (!configuredSecret) {
    return NextResponse.json({ message: "Preview secret is not configured." }, { status: 500 });
  }

  if (!process.env.SANITY_API_READ_TOKEN) {
    return NextResponse.json({ message: "Sanity preview read token is not configured." }, { status: 500 });
  }

  if (!secret || secret !== configuredSecret) {
    return NextResponse.json({ message: "Invalid preview secret." }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectPath, request.url));
}
