export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  status: string;
  summary: string;
  challenge: string;
  solution: string;
  architecture: Array<{ title: string; description: string }>;
  capabilities: string[];
  engineeringDecisions: string[];
  stack: string[];
  evidence: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cafeluxe-pos-suite",
    category: "Restaurant operations",
    title: "CafeLuxe POS Suite",
    status: "Operational product family",
    summary:
      "A restaurant software ecosystem spanning customer QR ordering, digital menu workflows, KOT billing, staff operations and owner/admin control.",
    challenge:
      "Restaurant operations break down when ordering, kitchen communication, billing and staff workflows live in disconnected tools. CafeLuxe needed one product family that could serve guests, staff and operators without forcing every task through a single counter.",
    solution:
      "TrustFirst built a Next.js customer and management platform backed by Appwrite, plus a native Android staff application. The system separates guest-facing ordering from staff-side operational control while keeping the product family connected.",
    architecture: [
      { title: "Guest QR", description: "Table-linked customer entry into the digital ordering flow." },
      { title: "Web ordering", description: "Next.js customer experience for menu browsing and restaurant interactions." },
      { title: "Appwrite", description: "Shared backend services and production data/control integration." },
      { title: "Admin / owner", description: "Management surfaces for menu, tables, records and operational controls." },
      { title: "Android staff", description: "Native staff-side workflows for orders, KOT, billing and payment status." },
    ],
    capabilities: [
      "QR table ordering",
      "Digital menu",
      "KOT billing workflow",
      "Native Android staff app",
      "Payment and records workflows",
      "Admin and master control surfaces",
      "Client-specific Android product flavors",
      "QR generation",
    ],
    engineeringDecisions: [
      "Separate guest and staff experiences instead of forcing one interface to serve incompatible roles.",
      "Use a native Android staff surface for restaurant-side operational work.",
      "Keep backend integration centralized through Appwrite rather than embedding privileged infrastructure into clients.",
      "Support client-specific Android builds through product flavors while preserving one codebase.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Appwrite", "Kotlin", "Android", "ZXing"],
    evidence: [
      "Public CafeLuxe feature surface documents QR ordering, KOT billing, staff Android operations and admin control.",
      "The web repository exposes customer, admin and master application routes.",
      "The Android application includes Appwrite, WorkManager, QR generation and client-specific build flavors.",
    ],
  },
  {
    slug: "trustfirst-pos",
    category: "Offline-first commerce",
    title: "TrustFirst POS",
    status: "Active product · universal sync expansion",
    summary:
      "A cross-platform POS designed to keep local billing operational while adding secure multi-device cloud synchronization across installed devices.",
    challenge:
      "A business-critical POS cannot become unusable because the internet drops. At the same time, businesses increasingly need shared data across desktop, Android and browser surfaces. The architecture has to support both without turning local billing into a cloud-dependent request.",
    solution:
      "TrustFirst POS keeps local SQLite as the execution store on installed devices and layers synchronization around it using durable outboxes, pull cursors, conflict-aware application and a server-side cloud gateway. Offline and Online plans remain explicit product modes.",
    architecture: [
      { title: "Desktop / Android", description: "Installed POS surfaces continue to execute supported local operations." },
      { title: "Local SQLite", description: "Operational store for billing, stock, orders and device-resilient state." },
      { title: "Durable outbox", description: "Local mutations are queued for reliable, retry-safe synchronization." },
      { title: "Cloud gateway", description: "Authenticated business-scoped gateway owns privileged cloud data access." },
      { title: "Projection + feed", description: "Cloud projection, append-only changes and pull cursors reconcile devices." },
    ],
    capabilities: [
      "Local billing and stock execution",
      "Desktop Electron application",
      "Android application through Capacitor",
      "KDS and KOT workflows",
      "Thermal printing",
      "Durable sync outbox",
      "Conflict-aware synchronization",
      "Business-scoped cloud gateway",
      "Device registration and entitlement model",
      "Offline and Online plan separation",
    ],
    engineeringDecisions: [
      "Local SQLite remains authoritative for supported installed-device operations during connectivity loss.",
      "Cloud synchronization is a projection/event-stream layer, not a blind database replacement.",
      "Privileged Appwrite credentials remain server-side behind the TrustFirst Cloud Gateway.",
      "Transactional sync mutations are designed to be idempotent, business-scoped, authorized and auditable.",
      "Online entitlement loss and temporary internet loss are treated as different states.",
    ],
    stack: ["Electron", "Next.js", "TypeScript", "SQLite", "Capacitor", "Android", "Appwrite", "Express"],
    evidence: [
      "The repository contains a large automated regression suite across billing, KDS, auth, tax, printing, backup and lifecycle paths.",
      "The universal platform contract defines desktop, Android and browser roles without weakening installed-device offline operation.",
      "Current sync work includes durable outbox, pull state, gateway architecture and Android-specific synchronization foundations.",
    ],
  },
  {
    slug: "business-erp-client-platform",
    category: "ERP and client operations",
    title: "Business ERP & Client Platform",
    status: "Production-oriented client system",
    summary:
      "A multi-workspace business platform combining authenticated web operations, configurable workflows, tenant-aware infrastructure and deployment safeguards.",
    challenge:
      "Custom business systems often grow into a collection of one-off screens. The harder requirement is preserving tenant boundaries, controlled workflow changes, deployment safety and operational consistency as the product expands.",
    solution:
      "TrustFirst built the client platform as a workspace-based codebase with a Next.js web application, shared UI/config/database packages, authenticated platform areas and configurable workflow definitions. Deployment includes explicit environment, migration, architecture and smoke-test checks.",
    architecture: [
      { title: "Authenticated web", description: "Next.js application with separate auth and platform route groups." },
      { title: "Admin / client areas", description: "Role-oriented platform surfaces for operational and customer workflows." },
      { title: "Shared packages", description: "Configuration, database and UI boundaries reused across the workspace." },
      { title: "Workflow engine", description: "Tenant-owned nodes and edges model approvals, documents and business states." },
      { title: "Deployment controls", description: "Migration safety, environment validation, health and smoke-test tooling." },
    ],
    capabilities: [
      "Authenticated client platform",
      "Admin and client route separation",
      "Configurable workflow engine",
      "Approval and document workflow nodes",
      "Tenant-owned workflow configuration",
      "Shared database and UI packages",
      "PWA/offline support surface",
      "Receipt workflows",
      "Deployment smoke checks",
      "Migration safety checks",
    ],
    engineeringDecisions: [
      "Represent business processes as configurable nodes and edges instead of hardcoding a single workflow.",
      "Enforce architecture boundaries across workspace packages.",
      "Separate admin and client application areas while sharing platform infrastructure.",
      "Treat environment validation, migration safety and runtime health as part of product delivery.",
      "Keep tenant workflow configuration extensible for future execution providers and conditions.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "NextAuth", "Prisma", "Zod", "Vitest", "Docker"],
    evidence: [
      "The repository is structured as an npm workspace with dedicated web, database, config and UI packages.",
      "The workflow engine supports start, state, approval, automation, document, external and end nodes.",
      "Deployment tooling includes architecture checks, migration safety, environment validation, runtime health and smoke tests.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
