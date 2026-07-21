import { JsonLdScript } from "@/components/seo/json-ld-script";
import { organizationSchema, siteServiceSchemas, websiteSchema } from "@/lib/seo/structured-data";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function JsonLd() {
  const settings = await getSiteSettings();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(settings),
      websiteSchema(settings),
      ...siteServiceSchemas(settings),
    ],
  };

  return <JsonLdScript data={schema} />;
}
