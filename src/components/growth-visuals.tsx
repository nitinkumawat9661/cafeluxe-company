import Image from "next/image";

export function HeroGrowthVisual() {
  return (
    <div className="hero-growth-art" aria-label="TrustFirst digital growth journey visual">
        <Image
          src="/images/trustfirst-growth-hero-rich.webp"
          alt="Cinematic digital growth journey showing search discovery, ads, local visibility, landing page, lead capture and WhatsApp follow-up"
          width={2100}
          height={1850}
          priority
          unoptimized
          sizes="(max-width: 767px) 0px, 62vw"
          className="hero-growth-art-image hero-growth-art-image-desktop"
        />
        <Image
          src="/images/trustfirst-growth-hero-rich-mobile.webp"
          alt="Cinematic mobile digital growth journey with local discovery, landing page, lead capture and WhatsApp follow-up"
          width={980}
          height={849}
          priority
          unoptimized
        sizes="(max-width: 767px) 100vw, 0px"
        className="hero-growth-art-image hero-growth-art-image-mobile"
      />
      <span className="hero-growth-art-glow" aria-hidden="true" />
    </div>
  );
}

export function GrowthGapsVisual() {
  return (
    <div className="growth-gaps-art" aria-label="Business growth gaps visual">
      <Image
        src="/images/trustfirst-growth-gaps.webp"
        alt="Cinematic customer journey visual showing search discovery, local presence, social trust, landing experience and a missed enquiry as the gold signal fades"
        width={1717}
        height={916}
        sizes="(max-width: 767px) 0px, 58vw"
        className="growth-gaps-art-image growth-gaps-art-image-desktop"
      />
      <Image
        src="/images/trustfirst-growth-gaps-mobile.webp"
        alt="Mobile cinematic customer journey visual showing growth gaps before conversion"
        width={900}
        height={896}
        sizes="(max-width: 767px) 100vw, 0px"
        className="growth-gaps-art-image growth-gaps-art-image-mobile"
      />
      <span className="growth-gaps-art-signal" aria-hidden="true" />
    </div>
  );
}

type ServiceChapterVisualType = "acquire" | "trust" | "conversion" | "automation";

const serviceChapterVisuals: Record<ServiceChapterVisualType, { label: string; desktop: string; mobile: string }> = {
  acquire: {
    label: "Acquire services visual showing ad and search discovery turning into a new lead",
    desktop: "/images/trustfirst-services-acquire.webp",
    mobile: "/images/trustfirst-services-acquire-mobile.webp",
  },
  trust: {
    label: "Build Trust services visual showing social content, search visibility and local presence",
    desktop: "/images/trustfirst-services-trust.webp",
    mobile: "/images/trustfirst-services-trust-mobile.webp",
  },
  conversion: {
    label: "Convert services visual showing a premium landing page and enquiry form",
    desktop: "/images/trustfirst-services-convert.webp",
    mobile: "/images/trustfirst-services-convert-mobile.webp",
  },
  automation: {
    label: "Scale services visual showing a lead, WhatsApp reply, reminder and follow-up workflow",
    desktop: "/images/trustfirst-services-scale.webp",
    mobile: "/images/trustfirst-services-scale-mobile.webp",
  },
};

export function ServiceChapterVisual({ type, priority = false }: { type: string; priority?: boolean }) {
  const visual = serviceChapterVisuals[(type as ServiceChapterVisualType) in serviceChapterVisuals ? (type as ServiceChapterVisualType) : "acquire"];

  return (
    <div className="services-chapter-visual" aria-label={visual.label}>
      <Image
        src={visual.desktop}
        alt={visual.label}
        width={1600}
        height={900}
        sizes="(max-width: 767px) 0px, 58vw"
        priority={priority}
        className="services-chapter-image services-chapter-image-desktop"
      />
      <Image
        src={visual.mobile}
        alt={visual.label}
        width={820}
        height={760}
        sizes="(max-width: 767px) 100vw, 0px"
        priority={priority}
        className="services-chapter-image services-chapter-image-mobile"
      />
      <span className="services-chapter-signal" aria-hidden="true" />
    </div>
  );
}

export function GrowthSystemVisual() {
  return (
    <div className="growth-system-visual" aria-label="Connected growth journey from discovery to scalable follow-up">
      <Image
        src="/images/trustfirst-growth-system.webp"
        alt="Cinematic connected growth journey showing discovery, trust, click, capture, conversation, follow-up and growth"
        width={1536}
        height={1024}
        sizes="(max-width: 767px) 0px, 100vw"
        priority
        className="growth-system-image growth-system-image-desktop"
      />
      <Image
        src="/images/trustfirst-growth-system-mobile.webp"
        alt="Vertical cinematic growth journey showing discovery, trust, click, capture, conversation, follow-up and growth"
        width={1024}
        height={1536}
        sizes="(max-width: 767px) 100vw, 0px"
        className="growth-system-image growth-system-image-mobile"
      />
      <span className="growth-system-signal" aria-hidden="true" />
    </div>
  );
}

export function LeadGenerationRail() {
  const steps = [
    ["01", "ATTRACT", "Ads / Search / Content"],
    ["02", "CONVERT", "Offer / Landing Page"],
    ["03", "CAPTURE", "Form / WhatsApp"],
    ["04", "FOLLOW UP", "Reply / Reminder"],
    ["05", "IMPROVE", "Optimize / Scale"],
  ];

  return (
    <div className="growth-flowline" aria-label="Connected business growth system">
      {steps.map(([number, title, detail]) => (
        <div key={title} className="growth-flowline-item">
          <span>{number}</span>
          <b>{title}</b>
          <p>{detail}</p>
        </div>
      ))}
    </div>
  );
}
