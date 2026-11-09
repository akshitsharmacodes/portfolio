/**
 * SINGLE SOURCE OF TRUTH: OWNER CONFIGURATION
 * All personal information, links, and styling tokens for Akshit Sharma.
 * Any item marked [PLACEHOLDER] or empty is automatically filtered out by UI components.
 */

export const siteConfig = {
  referenceWebsite: "https://touquirakhtar.com/",
  websiteUrl: "https://akshitsharma.dev",

  identity: {
    fullName: "Akshit Sharma",
    displayName: "Akshit Sharma",
    profession: "AI/ML Developer",
    roleLine2: "Python · GenAI & RAG · AI Agents",
    location: "Chandigarh, India",
    availability: "Available for Hire · Contract & Freelance Projects",
    headline: "I build AI agents that eliminate repetitive work.",
    headlineAccent: "eliminate repetitive work.",
    // One-line version of the intro for the centred eclipse hero
    heroLine:
      "Bring me the process that eats your team's time. I'll turn it into an AI agent or RAG system that runs in production, with code you fully own.",
    intro:
      "Hi, I'm Akshit Sharma, an AI engineer from Chandigarh, India. Bring me the process that eats up your team's time, and I'll turn it into an AI agent or RAG system that works in production, with a clear plan, weekly progress updates and code you fully own. Currently building AI products at LeadManch.",
    about:
      "I work at the intersection of AI engineering and backend development: designing multi-agent workflows with LangChain and LangGraph, building RAG pipelines, and integrating LLMs into real applications. I started in the Indian Army as a Gentleman Cadet at the Officers Training Academy, Gaya (Technical Entry Scheme, TES-48, 2022-2024), after clearing the Services Selection Board. That training shaped how I make decisions under pressure and lead teams. I then moved into computer science and AI/ML at Amity University. I care about solutions that are practical, production-ready and maintainable.",
    portrait: "", // blank => strong typographic hero, no portrait
    resume: "https://drive.google.com/file/d/1UMoXOqMcGk80ot_mm0m3MTga9wvjo-j_/view",
    favicon: "Generate a simple 'AS' initials icon (accent colour on near-black)",
  },

  contact: {
    email: "akshitsharmacodes@gmail.com",
    phone: "+91 7888327471",
    whatsapp: "https://wa.me/917888327471?text=Hi!%20I%20saw%20your%20developer%20portfolio%20and%20wanted%20to%20discuss%20a%20project/opportunity.",
    linkedin: "https://www.linkedin.com/in/akshitsharmacodes",
    github: "https://github.com/akshitsharmacodes",
    leetcode: "https://leetcode.com/u/akshitsharmacodes/",
    upwork: "https://www.upwork.com/freelancers/~016a5a49d7e054a783?viewMode=1",
    web3formsKey: "4adaa253-515d-4e65-a0df-ea4f4d7a2041",
    instagram: "",
    youtube: "",
    behance: "",
    dribbble: "",
    otherLinks: [
      { label: "LeetCode Profile", url: "https://leetcode.com/u/akshitsharmacodes/" },
      { label: "Book a Consultation", url: "https://cal.com/akshitsharmacodes" },
    ],
  },

  metrics: [
    { label: "Smart India Hackathon 2025", value: "1st Place", detail: "Won the internal-level hackathon at Amity University with Team Dokku" },
    { label: "Zinnovatio 3.0", value: "Top 200", detail: "Out of 9,000+ participants across India" },
    { label: "Indian Army", value: "Recommended", detail: "Cleared the 5-day SSB (TES-48) for an Indian Army Permanent Commission, with a final selection rate under 0.1%" },
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
    showVentures: true,
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

