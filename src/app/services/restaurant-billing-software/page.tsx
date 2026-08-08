import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ChefHat, Cloud, CreditCard, QrCode, ReceiptIndianRupee, Scaling, ShoppingCart } from "lucide-react";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { createSeoMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/site-settings";

const path = "/services/restaurant-billing-software";

const metaTitle =
  "Custom Restaurant Billing & POS Software Development in Sikar | TrustFirst Solutions";

const metaDescription =
  "Scale your restaurant, cafe, or retail store with custom QR code menu billing software and POS solutions built by TrustFirst Solutions in Sikar, Rajasthan. Get a free demo today!";

const targetKeywords = [
  "Custom Restaurant Billing Software Development Sikar",
  "QR Code Menu Billing System Rajasthan",
  "Custom POS Software Developers Sikar",
  "GST Billing Web Application Development Sikar",
  "Custom SaaS & Web Application Agency Sikar",
];

const advantages = [
  {
    title: "Table-Specific QR Ordering",
    description:
      "Allow customers to scan, browse interactive digital menus, and place orders directly from their smartphones.",
    icon: QrCode,
  },
  {
    title: "Instant Billing & Invoicing",
    description:
      "Streamline checkout with multi-payment gateway integration and automated GST calculations.",
    icon: ReceiptIndianRupee,
  },
  {
    title: "Cloud Accessibility & Analytics",
    description:
      "Access real-time sales reports, daily analytics, and inventory levels anytime, anywhere.",
    icon: Cloud,
  },
  {
    title: "Custom Scalability",
    description:
      "Built tailored to your specific operational workflow—no monthly licensing bloat of generic software.",
    icon: Scaling,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const base = await createSeoMetadata({
    title: metaTitle,
    description: metaDescription,
    path,
    imageAlt: "Custom Restaurant Billing and POS Software Development in Sikar",
  });

  return {
    ...base,
    title: metaTitle,
    description: metaDescription,
    keywords: targetKeywords,
  };
}

export default async function RestaurantBillingSoftwarePage() {
  const settings = await getSiteSettings();
  const pageUrl = `${settings.url}${path}`;
  const ratingValue = process.env.RESTAURANT_SOFTWARE_RATING_VALUE;
  const ratingCount = process.env.RESTAURANT_SOFTWARE_RATING_COUNT;

  const aggregateRating =
    ratingValue && ratingCount
      ? {
          "@type": "AggregateRating",
          ratingValue,
          ratingCount,
          bestRating: "5",
          worstRating: "1",
        }
      : undefined;

  const softwareSchema = {
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
    name: "TrustFirst Solutions Custom Restaurant Billing & POS Software",
    url: pageUrl,
    description: metaDescription,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Restaurant Management, Billing and POS Software",
    operatingSystem: "Web",
    keywords: targetKeywords.join(", "),
    featureList: [
      "Table-Specific QR Ordering",
      "Interactive Digital Menu",
      "Custom POS Billing",
      "GST Billing and Invoicing",
      "Multi-Payment Gateway Integration",
      "Real-Time Table Management",
      "Kitchen Display System (KDS)",
      "Real-Time Sales Reports",
      "Daily Analytics",
      "Inventory Management",
      "Cloud Accessibility",
      "Custom SaaS and Web Application Architecture",
    ],
    author: { "@id": `${settings.url}/#organization` },
    publisher: { "@id": `${settings.url}/#organization` },
    ...(aggregateRating ? { aggregateRating } : {}),
  };

  const serviceSchema = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Custom Restaurant Billing & POS Software Development in Sikar",
    serviceType:
      "Custom Restaurant Billing, POS, QR Menu and Web Application Development",
    url: pageUrl,
    description: metaDescription,
    provider: { "@id": `${settings.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "Sikar" },
      { "@type": "State", name: "Rajasthan" },
      { "@type": "AdministrativeArea", name: "Shekhawati" },
      { "@type": "Country", name: "India" },
    ],
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: metaTitle,
    url: pageUrl,
    description: metaDescription,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${settings.url}/#website` },
    about: { "@id": `${pageUrl}#software` },
  };

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@graph": [softwareSchema, serviceSchema, webPageSchema],
        }}
      />

      <InnerPageShell
        eyebrow="Custom Restaurant Billing Software in Sikar"
        title="Custom Restaurant Billing & POS Software Development Company in Sikar."
        description={metaDescription}
        ctaHref="/#audit"
        ctaLabel="Get a Free Demo"
      >
        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-5 md:px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {targetKeywords.map((keyword) => (
              <div
                key={keyword}
                className="rounded-2xl border border-[rgba(201,155,71,.18)] bg-white/[.03] px-4 py-3 text-sm font-bold leading-6 text-[#e7dac1]"
              >
                {keyword}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-5 md:px-6 md:py-14">
          <div className="rounded-[1.5rem] border border-[rgba(201,155,71,.26)] bg-white/[.035] p-5 sm:p-7 md:rounded-[2rem] md:p-9">
            <p className="text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">
              Restaurant & Retail Technology
            </p>

            <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,7vw,4.2rem)] leading-[.98]">
              How Custom QR Code Billing & POS Software Is Revolutionizing Sikar Restaurants and Retail
            </h2>

            <div className="mt-8 max-w-4xl space-y-6 text-[15px] leading-8 text-[#e7dac1] sm:text-base">
              <p>
                In the fast-evolving dining and retail ecosystem of Sikar and Rajasthan, static paper menus and legacy offline billing software are quickly becoming obsolete. Modern cafes, restaurants, and retail outlets require instant digital ordering, table-specific QR code billing, and real-time inventory management.
              </p>

              <p>
                At TrustFirst Solutions, we engineer enterprise-grade custom restaurant management and POS billing platforms. Our custom web applications empower food business owners with contactless QR ordering, real-time table management, automated kitchen display systems (KDS), and seamless GST-compliant invoicing.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 md:px-6 md:py-12">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">
              Key Advantages
            </p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.35rem,6vw,4rem)] leading-[.98]">
              Key Advantages of Custom POS & Billing Software by TrustFirst Solutions
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {advantages.map((advantage) => {
              const Icon = advantage.icon;
              return (
                <article
                  key={advantage.title}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[.035] p-5 sm:p-6"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,155,71,.32)] bg-[rgba(201,155,71,.08)] text-[var(--gold)]">
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-[#f8efd9]">{advantage.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#d6c8ae]">{advantage.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-5 md:px-6 md:py-14">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <QrCode size={22} className="text-[var(--gold)]" />
              <h3 className="mt-4 font-black">QR Code Menu Billing</h3>
              <p className="mt-2 text-sm leading-7 text-[#d6c8ae]">
                Table-specific digital ordering through customer smartphones.
              </p>
            </article>

            <article className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <CreditCard size={22} className="text-[var(--gold)]" />
              <h3 className="mt-4 font-black">POS & GST Billing</h3>
              <p className="mt-2 text-sm leading-7 text-[#d6c8ae]">
                Custom billing workflows with automated GST calculations and invoicing.
              </p>
            </article>

            <article className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <ChefHat size={22} className="text-[var(--gold)]" />
              <h3 className="mt-4 font-black">Kitchen Display System</h3>
              <p className="mt-2 text-sm leading-7 text-[#d6c8ae]">
                Automated kitchen display systems (KDS) connected with restaurant operations.
              </p>
            </article>

            <article className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <BarChart3 size={22} className="text-[var(--gold)]" />
              <h3 className="mt-4 font-black">Analytics & Inventory</h3>
              <p className="mt-2 text-sm leading-7 text-[#d6c8ae]">
                Real-time sales reports, daily analytics and inventory levels.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-5 md:px-6">
          <div className="rounded-[1.6rem] border border-[rgba(201,155,71,.34)] bg-[rgba(201,155,71,.055)] p-5 text-center sm:p-8 md:rounded-[2rem]">
            <ShoppingCart size={28} className="mx-auto text-[var(--gold)]" />
            <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.3rem,6vw,4rem)] leading-[.98]">
              Modernize your food and retail business today with Sikar&apos;s premier software development team.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#d6c8ae] sm:text-base">
              Custom Restaurant Billing Software Development Sikar • QR Code Menu Billing System Rajasthan • Custom POS Software Developers Sikar
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#audit"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-black text-black"
              >
                Get a Free Demo
              </Link>
              <Link
                href="/services/websites"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(201,155,71,.4)] px-6 py-3 text-sm font-black text-[var(--gold)]"
              >
                Custom SaaS & Web Applications
              </Link>
            </div>
          </div>
        </section>
      </InnerPageShell>
    </>
  );
}
