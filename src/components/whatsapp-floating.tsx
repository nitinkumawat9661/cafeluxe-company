import { FloatingActionsClient } from "@/components/floating-actions-client";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function WhatsAppFloating() {
  const settings = await getSiteSettings();
  return <FloatingActionsClient settings={settings} />;
}
