export type SearchFaq = {
  question: string;
  answer: string;
};

export const localKeywordClusters = {
  primary: [
    "digital marketing agency in Sikar",
    "digital marketing company in Sikar",
    "digital marketing services in Sikar",
    "online marketing agency Sikar",
    "digital growth agency Sikar",
    "best digital marketing agency in Sikar",
  ],
  seoAndLocal: [
    "SEO company in Sikar",
    "SEO services in Sikar",
    "local SEO services Sikar",
    "Google Maps marketing Sikar",
    "Google Business Profile management Sikar",
    "Google Business Profile optimization Sikar",
    "search engine optimization company Sikar",
  ],
  websites: [
    "website development company in Sikar",
    "website designer in Sikar",
    "business website development Sikar",
    "landing page design Sikar",
    "conversion focused website Sikar",
    "SEO friendly website development Sikar",
    "ecommerce website development Sikar",
  ],
  performanceMarketing: [
    "performance marketing agency Sikar",
    "Google Ads agency Sikar",
    "Meta Ads agency Sikar",
    "Facebook ads agency Sikar",
    "Instagram ads agency Sikar",
    "PPC services Sikar",
    "paid advertising company Sikar",
    "lead generation company Sikar",
  ],
  contentAndSocial: [
    "social media marketing agency Sikar",
    "social media management Sikar",
    "content marketing agency Sikar",
    "content creation agency Sikar",
    "creative content services Sikar",
    "brand visibility services Sikar",
  ],
  automationAndConversion: [
    "WhatsApp marketing Sikar",
    "WhatsApp lead generation Sikar",
    "marketing automation Sikar",
    "lead follow up automation Sikar",
    "website and ads agency in Sikar",
    "digital marketing for small business in Sikar",
    "local business lead generation Sikar",
  ],
  geo: [
    "digital marketing agency Jaipur",
    "digital marketing agency Rajasthan",
    "performance marketing agency Rajasthan",
    "SEO services Rajasthan",
    "website development Rajasthan",
    "digital growth agency India",
  ],
  questions: [
    "how to get more local customers in Sikar",
    "how to rank a business on Google Maps in Sikar",
    "which digital marketing services help local businesses",
    "how much does digital marketing cost in Sikar",
    "is SEO or Google Ads better for a local business",
    "how to generate leads through WhatsApp",
    "what should a business website include",
  ],
} as const;

export const localSearchKeywords = Object.values(localKeywordClusters).flat();

export const homepageFaqs: SearchFaq[] = [
  {
    question: "What services does TrustFirst Solutions provide?",
    answer:
      "TrustFirst Solutions provides Meta Ads, Google Ads, performance marketing, social media management, content strategy, SEO, Google Business Profile management, websites, landing pages, lead generation systems, automation and growth consultation.",
  },
  {
    question: "Is TrustFirst Solutions a digital marketing agency in Sikar?",
    answer:
      "Yes. TrustFirst Solutions is based in Sikar, Rajasthan and works with local businesses in Sikar and Jaipur as well as businesses across India.",
  },
  {
    question: "Do you provide SEO services in Sikar?",
    answer:
      "Yes. Our SEO work can include technical SEO, on-page SEO, local search visibility, content planning, internal linking and improvements to Google Business Profile and landing pages.",
  },
  {
    question: "Can you help a Sikar business rank better on Google Maps?",
    answer:
      "We can improve the business profile, categories, services, location signals, content, review process and website relevance. Rankings cannot be guaranteed, but the local visibility system can be strengthened.",
  },
  {
    question: "Do you build websites for businesses in Sikar?",
    answer:
      "Yes. We build business websites and landing pages focused on mobile usability, clear offers, trust signals, lead capture, local relevance, accessibility and search-friendly structure.",
  },
  {
    question: "Do you manage Google Ads and Meta Ads in Sikar?",
    answer:
      "Yes. We can plan and manage Google Ads and Meta Ads campaigns, connect them to landing pages or WhatsApp, and improve conversion tracking and follow-up. Advertising spend remains separate from service fees.",
  },
  {
    question: "What is performance marketing?",
    answer:
      "Performance marketing uses measurable campaigns, landing pages, tracking and ongoing optimization to improve actions such as calls, WhatsApp enquiries, form submissions or purchases instead of focusing only on reach or impressions.",
  },
  {
    question: "Is SEO or paid advertising better for a local business?",
    answer:
      "SEO can build long-term search visibility, while paid advertising can generate faster testing and targeted traffic. The right mix depends on competition, budget, urgency, website quality and the business sales process.",
  },
  {
    question: "Can you connect WhatsApp with lead generation and follow-up?",
    answer:
      "Yes. We can design a lead path that sends customers from ads, Google or landing pages into a clear WhatsApp conversation, with structured notifications, response guidance and follow-up steps where appropriate.",
  },
  {
    question: "How do you measure digital marketing performance?",
    answer:
      "Measurement can include qualified enquiries, calls, WhatsApp conversations, form submissions, landing-page conversion rate, advertising cost, search visibility and lead quality. The exact reporting depends on the business goal.",
  },
  {
    question: "How much does digital marketing cost in Sikar?",
    answer:
      "Cost depends on the services, campaign scope, content requirements, website work and advertising budget. A growth audit helps identify the most useful starting point before a package is recommended.",
  },
  {
    question: "How soon can digital marketing results appear?",
    answer:
      "Tracking, page clarity and enquiry-flow improvements can appear quickly. SEO, local visibility, campaign learning and brand trust usually need consistent work and optimization over time.",
  },
  {
    question: "Do you guarantee leads or first-page rankings?",
    answer:
      "No. We do not make unsupported guarantees. We improve the connected system around visibility, targeting, offer, website experience, lead capture, follow-up and reporting.",
  },
  {
    question: "Can you handle a website, SEO, content and ads together?",
    answer:
      "Yes. Combining website, SEO, useful content, paid ads, tracking and follow-up often creates a clearer customer journey than running each service separately.",
  },
  {
    question: "What is included in the free digital growth audit?",
    answer:
      "The starting audit reviews social presence, Google visibility, ads opportunity, website or landing-page gaps, lead capture and follow-up basics using the information you share.",
  },
  {
    question: "Do you work outside Sikar and Rajasthan?",
    answer:
      "Yes. TrustFirst Solutions serves businesses in Sikar, Jaipur and Rajasthan and can work remotely with businesses across India.",
  },
];

export const sikarLandingFaqs = homepageFaqs.filter((faq) =>
  /Sikar|Google Maps|performance marketing|SEO or paid|WhatsApp|measure|website, SEO|guarantee/i.test(faq.question),
);
