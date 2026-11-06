/**
 * SINGLE SOURCE OF TRUTH: OWNER CONFIGURATION
 * All personal information, links, and styling tokens for Akshit Sharma.
 * Any item marked [PLACEHOLDER] or empty is automatically filtered out by UI components.
 */

export const siteConfig = {
  referenceWebsite: "https://touquirakhtar.com/",
  websiteUrl: "[PLACEHOLDER: my own domain, e.g. https://akshitsharma.dev]",

  identity: {
    fullName: "Akshit Sharma",
    displayName: "Akshit Sharma",
    profession: "AI/ML Developer",
    roleLine2: "Python · GenAI & RAG · AI Agents",
    location: "Chandigarh, India",
    availability: "Open to AI/ML engineering opportunities",
    headline: "I build AI agents that eliminate repetitive work.",
    headlineAccent: "eliminate repetitive work.",
    intro:
      "AI/ML developer building LLM-powered products, agentic workflows and RAG systems that turn complex business processes into reliable software. Smart India Hackathon 2025 winner, currently at LeadManch.",
    about:
      "I work at the intersection of AI engineering and backend development: designing multi-agent workflows with LangChain and LangGraph, building RAG pipelines, and integrating LLMs into real applications. I started in the Indian Army as a Gentleman Cadet at the Officers Training Academy, Gaya (Technical Entry Scheme, TES-48, 2022-2024), after clearing the Services Selection Board. That training shaped how I make decisions under pressure and lead teams. I then moved into computer science and AI/ML at Amity University. I care about solutions that are practical, production-ready and maintainable.",
    portrait: "", // blank => strong typographic hero, no portrait
    resume: "https://drive.google.com/file/d/1Mh6jHs3Itk818LOrLuyLDyQyHJsScBcZ/view",
    favicon: "Generate a simple 'AS' initials icon (accent colour on near-black)",
  },

  contact: {
    email: "akshitsharmacodes@gmail.com",
    phone: "+91 7888327471",
    whatsapp: "", // empty => no WhatsApp button
    linkedin: "https://www.linkedin.com/in/akshitsharmacodes",
    github: "https://github.com/akshitsharmacodes",
    instagram: "",
    youtube: "",
    behance: "",
    dribbble: "",
    otherLinks: [
      { label: "Book a call", url: "https://cal.com/akshitsharmacodes" },
      { label: "LeetCode", url: "[PLACEHOLDER]" },
    ],
  },

  metrics: [
    { label: "Smart India Hackathon 2025", value: "1st Place", detail: "Winner with Team Dokku among hundreds of university teams" },
    { label: "Zinnovatio 3.0", value: "Top 200", detail: "Out of 9,000+ participants across India" },
    { label: "Services Selection Board", value: "Recommended", detail: "Cleared 5-day SSB at 18 SSB Allahabad (TES-48)" },
  ],

  specialties: [
    "LangChain",
    "LangGraph",
    "RAG Pipelines",
    "Multi-Agent Systems",
    "FastAPI & Django",
    "PostgreSQL & Redis",
  ],

  appearance: {
    style: "cinematic minimal, premium, editorial, refined typography",
    theme: "dark",
    background: "#090909",
    backgroundSecondary: "#121212",
    backgroundElevated: "#181818",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(255, 255, 255, 0.16)",
    text: "#f2efeb",
    textMuted: "#a09c9a",
    textDim: "#686462",
    accent: "#e32b3c",
    accentHover: "#ff3d4f",
    accentGlow: "rgba(227, 43, 60, 0.15)",
    displayFont: "'Anton', sans-serif",
    bodyFont: "'Manrope', sans-serif",
    accentFont: "'Caveat', cursive",
    animationIntensity: "balanced",
    storageKeyMotion: "akshit-portfolio-motion",
    language: "English",
  },

  preferences: {
    showAwards: true,
    showEducation: true,
    showExperience: true,
    showBeforeAfter: false,
    showClientLogos: false,
    showTestimonials: false,
    showContactForm: true,
    showDownloadResume: true,
    showProjectArchive: true,
  },
};

/**
 * Utility to check if a value is a valid, active link/content
 * Returns false if undefined, null, empty string, or containing [PLACEHOLDER]
 */
export function isValidContent(val) {
  if (!val || typeof val !== "string") return false;
  const trimmed = val.trim();
  if (trimmed === "" || trimmed.startsWith("[PLACEHOLDER")) return false;
  return true;
}

