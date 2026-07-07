import { dataset, projectId } from "@/sanity/env";
import { draftMode } from "next/headers";
import { sanityClient, sanityPreviewClient } from "@/sanity/lib/client";

export const hasSanityConfig = Boolean(projectId && projectId !== "placeholder" && dataset);
export const hasSanityPreviewToken = Boolean(process.env.SANITY_API_READ_TOKEN);

type SanityParams = Record<string, string | number | boolean | null | undefined>;

export async function fetchSanity<T>(query: string, params: SanityParams = {}): Promise<T | null> {
  if (!hasSanityConfig) return null;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 300 },
    });
  } catch {
    return null;
  }
}

export async function isSanityPreviewEnabled() {
  const draft = await draftMode();
  return draft.isEnabled && hasSanityConfig && hasSanityPreviewToken;
}

export async function fetchSanityPreview<T>(
  query: string,
  previewQuery: string = query,
  params: SanityParams = {},
): Promise<T | null> {
  if (!hasSanityConfig) return null;

  const isPreview = await isSanityPreviewEnabled();
  const client = isPreview ? sanityPreviewClient : sanityClient;
  const activeQuery = isPreview ? previewQuery : query;

  try {
    return await client.fetch<T>(activeQuery, params, isPreview ? { cache: "no-store" } : { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}
