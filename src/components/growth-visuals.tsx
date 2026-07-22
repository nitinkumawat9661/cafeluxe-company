import { ArrowDown, MapPin, MousePointerClick, Search, Send, Sparkles, Target } from "lucide-react";
import type { ReactNode } from "react";

export function HeroGrowthVisual() {
  const stages = [
    ["Attention", "Get Seen"],
    ["Landing Experience", "Convert Better"],
    ["Lead Capture", "Get Leads"],
    ["WhatsApp / Conversation", "Follow Up"],
    ["Follow-up", "Reply + Reminder"],
    ["Growth", "Grow"],
  ];

  return (
    <div className="hero-growth-flow" aria-label="TrustFirst business growth flow">
      <div className="hero-growth-spine" aria-hidden="true"><i /></div>
      {stages.map(([label, outcome], index) => (
        <article key={label} className={`hero-growth-step hero-growth-step-${index + 1}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <b>{label}</b>
            <p>{outcome}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ServiceStoryVisual({ type }: { type: string }) {
  const visuals: Record<string, { icon: ReactNode; title: string; steps: string[] }> = {
    acquire: {
      icon: <Target size={19} />,
      title: "Ad to lead path",
      steps: ["Creative", "Audience", "Lead"],
    },
    search: {
      icon: <Search size={19} />,
      title: "Intent capture",
      steps: ["Search", "Ad", "Landing"],
    },
    content: {
      icon: <Sparkles size={19} />,
      title: "Content rhythm",
      steps: ["Idea", "Post", "Trust"],
    },
    local: {
      icon: <MapPin size={19} />,
      title: "Local discovery",
      steps: ["Map", "Profile", "Call"],
    },
    conversion: {
      icon: <MousePointerClick size={19} />,
      title: "Conversion path",
      steps: ["Offer", "Form", "WhatsApp"],
    },
    automation: {
      icon: <Send size={19} />,
      title: "Follow-up flow",
      steps: ["New Lead", "Reply", "Reminder"],
    },
  };

  const visual = visuals[type] || visuals.acquire;

  return (
    <div className="service-story-visual" aria-label={visual.title}>
      <div className="service-story-head">
        <span>{visual.icon}</span>
        <b>{visual.title}</b>
      </div>
      <div className="service-story-flow">
        {visual.steps.map((step, index) => (
          <div key={step} className="service-story-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{step}</b>
            {index < visual.steps.length - 1 && <ArrowDown size={16} aria-hidden="true" />}
          </div>
        ))}
      </div>
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
