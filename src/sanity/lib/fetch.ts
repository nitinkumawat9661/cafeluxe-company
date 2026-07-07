import { dataset, projectId } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";

export const hasSanityConfig = Boolean(projectId && projectId !== "placeholder" && dataset);

export async function fetchSanity<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!hasSanityConfig) return null;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 300 },
    });
  } catch {
    return null;
  }
}
