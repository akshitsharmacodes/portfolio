/**
 * EXPERIENCE, EDUCATION, SKILLS & AWARDS DATA
 * Single source of truth for Akshit Sharma
 */

export const skillsData = {
  groups: [
    {
      group: "AI Frameworks & Agents",
      highlight: true,
      items: ["LangChain", "LangGraph", "Multi-Agent Workflows", "AI Agents", "Agentic RAG"],
    },
    {
      group: "AI / GenAI & RAG",
      highlight: false,
      items: ["LLMs", "Generative AI", "RAG Pipelines", "NLP", "Prompt Engineering", "Vector Search"],
    },
    {
      group: "Languages",
      highlight: false,
      items: ["Python", "C++", "SQL"],
    },
    {
      group: "Backend Engineering",
      highlight: false,
      items: ["Django", "Django REST Framework", "FastAPI", "REST APIs", "Celery"],
    },
    {
      group: "Databases & Caching",
      highlight: false,
      items: ["PostgreSQL", "ChromaDB", "Vector Databases", "Redis", "MySQL", "SQLite"],
    },
    {
      group: "Frontend Development",
      highlight: false,
      items: ["React.js", "Next.js", "Tailwind CSS", "shadcn/ui", "JavaScript"],
    },
  ],
  tools: ["Docker", "Linux", "Git", "Postman", "AWS"],
};

export const experienceData = [
  {
    id: "leadmanch",
    org: "LeadManch",
    role: "AI/ML Developer",
    location: "Mohali, Punjab",
    dates: "July 2026 – Present",
    current: true,
    points: [
      "Collaborate with cross-functional teams to design and develop CRM and analytics dashboards, translating business requirements into scalable features and data-driven workflows.",
      "Build and integrate AI/ML capabilities for intelligent automation, contributing across architecture, implementation, testing and deployment to deliver AI-powered features that improve operational efficiency.",
    ],
    tech: ["Python", "LLMs", "AI Agents", "FastAPI", "CRM Workflows", "Analytics"],
  },
  {
    id: "signity",
    org: "Signity Solutions",
    role: "AI/ML Engineer Intern",
    location: "Mohali, Punjab",
    dates: "June 2026 – July 2026",
    current: false,
    points: [
      "Owned an end-to-end feature for an AI-based Resume & JD Evaluation system, working directly with stakeholders to clarify requirements, evaluate tradeoffs and translate business needs into production-ready solutions.",
      "Identified and resolved a latency bottleneck during testing, proactively improving performance while incorporating stakeholder feedback in a fast-moving environment.",
    ],
    tech: ["LangChain", "LangGraph", "ChromaDB", "RAG", "Python", "Redis"],
  },
  {
    id: "army",
    org: "Indian Army, Officers Training Academy, Gaya",
    role: "Gentleman Cadet (Technical Entry Scheme, TES-48)",
    location: "Gaya, Bihar",
    dates: "November 2022 – November 2024",
    current: false,
    points: [
      "Selected for a Permanent Commission entry after clearing the 5-day Services Selection Board (SSB).",
      "Trained in battle tactics, map reading and terrain navigation, weapons handling, drill and horsemanship, building structured decision-making under pressure, discipline and leadership.",
    ],
    tech: ["Leadership Under Pressure", "Tactical Decision Making", "High-Stakes Execution", "Discipline & Planning"],
    credentialUrl: "https://www.linkedin.com/in/akshitsharmacodes/details/education/",
    credentialLabel: "View Joining Letter / Offer",
  },
];

export const educationData = [
  {
    institution: "Amity University, Mohali",
    qualification: "B.Tech, Computer Science (specialisation in AI & ML)",
    dates: "November 2024 – June 2028",
    location: "Mohali, Punjab",
    notes: "Core focus: Deep Learning, Multi-Agent Architectures, NLP, System Design",
  },
  {
    institution: "Sainik School Kapurthala",
    qualification: "Class X & XII, CBSE (PCM with Computer Science)",
    dates: "May 2015 – June 2022",
    location: "Kapurthala, Punjab",
    notes: "Strong foundation in mathematics, analytical problem solving and computing",
  },
];

export const awardsData = [
  {
    id: "hack-o-octo",
    title: "Hack-O-Octo 4.0: Top 10 National Finalist",
    detail:
      "Shortlisted among the Top 10 teams across India by Google Developer Groups (GDG) at Chandigarh University for Zero-Ops AutoSRE — an autonomous multi-agent system for cloud incident resolution and self-healing infrastructure.",
    badge: "Top 10 Finalist",
    category: "Hackathon",
    year: "2026",
    liveUrl: "https://landing-page-for-auto-sre.vercel.app/",
    sourceUrl: "https://github.com/akshitsharmacodes/zero-ops-autosre",
  },
  {
    id: "sih-2025",
    title: "Smart India Hackathon 2025: 1st Place (Internal Round)",
    detail:
      "Won the internal-level hackathon at Amity University with Team Dokku, for an end-to-end Smart Inventory System for Indian Railways.",
    badge: "1st Place · Amity Internal Round",
    category: "Hackathon",
    year: "2025",
    sourceUrl: "https://github.com/akshitsharmacodes/SIH-Backend",
  },
  {
    id: "zinnovatio",
    title: "Zinnovatio 3.0 Finalist",
    detail:
      "Top 200 teams out of 9,000+ participants at Chandigarh University, for a component lifecycle tracking solution in the Defence & Aerospace track.",
    badge: "Top 200 / 9,000+",
    category: "Competition",
    year: "2025",
  },
  {
    id: "leetcode-50",
    title: "LeetCode 50 Days Streak Badge",
    detail:
      "Awarded for continuous algorithmic problem-solving and daily consistency across data structures, algorithms, and technical challenges.",
    badge: "50 Days Badge",
    category: "Competitive Programming",
    year: "2026",
    links: [
      {
        label: "LeetCode Profile",
        url: "https://leetcode.com/u/akshitsharmacodes/",
        icon: "code",
      },
      {
        label: "Verify Badge",
        url: "https://leetcode.com/medal/?showImg=0&id=10876117&isLevel=false",
        icon: "medal",
      },
      {
        label: "LinkedIn Post",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7512828790407065600/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "ssb",
    title: "SSB Recommended (Permanent Commission)",
    detail:
      "Cleared the rigorous 5-day Services Selection Board (18 SSB Allahabad) evaluating mental endurance, leadership and quick decision making.",
    badge: "Recommended",
    category: "Defense Selection",
    year: "2022",
    credentialUrl: "https://www.linkedin.com/in/akshitsharmacodes/details/experience/",
    credentialLabel: "View SSB Recommendation Photo",
  },
];

