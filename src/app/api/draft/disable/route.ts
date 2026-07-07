import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function safeRedirectPath(path: string | null) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectPath = safeRedirectPath(url.searchParams.get("redirect"));
  const draft = await draftMode();

  draft.disable();

  return NextResponse.redirect(new URL(redirectPath, request.url));
}
