/**
 * PROJECTS DATA
 * Single source of truth projects list for Akshit Sharma
 */

export const projects = [
  {
    id: "matcha-ai",
    title: "Matcha AI",
    category: "AI / LLM",
    year: "2026",
    summary: "Multi-agent Resume & JD evaluation system for automated candidate-fit scoring.",
    description:
      "HR teams spent hours manually screening resumes. I built a multi-agent LangGraph pipeline that splits scoring across specialised agents (parsing, JD-matching, scoring) instead of one large prompt, which makes the system easier to debug and extend as scoring criteria change. It uses RAG with ChromaDB for semantic vector search and Redis distributed caching to deliver consistent fit-scores at scale with low latency.",
    architecture: [
      { step: "01", name: "Document Parsing", desc: "Extracts unstructured resume text and normalizes candidate schema" },
      { step: "02", name: "Vector Embedding & RAG", desc: "ChromaDB semantic indexing against Job Description parameters" },
      { step: "03", name: "LangGraph Multi-Agent Scoring", desc: "Independent sub-agents for technical fit, experience verification, and synthesis" },
      { step: "04", name: "Low-Latency Cache", desc: "Redis distributed caching for rapid repeated queries and rate management" },
    ],
    role: "AI/ML Engineer Intern, Signity Solutions",
    tools: ["Python", "LangChain", "LangGraph", "RAG", "ChromaDB", "PostgreSQL", "Redis"],
    coverImage: "", // Designed abstract card fallback
    liveUrl: "[PLACEHOLDER]",
    sourceUrl: "[PLACEHOLDER]",
    featured: true,
  },
  {
    id: "cruisecontent",
    title: "CruiseContent",
    category: "AI / Web App",
    year: "2026",
    summary: "AI-powered content platform with intelligent workflows and contextual retrieval.",
    description:
      "Built with Python and React, integrating LangChain, LangGraph and RAG to orchestrate intelligent workflows and contextual content retrieval. Designed PostgreSQL-backed data workflows with background processing through Celery, Redis and scheduled cron jobs to handle asynchronous and recurring AI tasks efficiently.",
    architecture: [
      { step: "01", name: "Context Ingestion", desc: "Dynamic document chunking and metadata enrichment pipeline" },
      { step: "02", name: "Orchestration Graph", desc: "LangGraph state machine for multi-turn conversational synthesis" },
      { step: "03", name: "Asynchronous Queue", desc: "Celery workers with Redis message broker for long-running generation" },
      { step: "04", name: "Interactive Frontend", desc: "Responsive React interface streaming tokens with live state updates" },
    ],
    role: "Developer",
    tools: ["Python", "React", "LangChain", "LangGraph", "RAG", "PostgreSQL", "Celery", "Redis"],
    coverImage: "",
    sourceUrl: "[PLACEHOLDER]",
    featured: true,
  },
  {
    id: "sims",
    title: "SIMS: Smart Inventory System",
    category: "Web App / Hackathon",
    year: "2025",
    summary: "Smart India Hackathon 2025 winning system for tracking Indian Railways fittings.",
    description:
      "Indian Railways had no system to track the crores of rail fittings procured every year. I led Team Dokku to 1st place at Smart India Hackathon 2025 by solving this end-to-end. Laser-marked QR codes scan on mobile to instantly surface vendor, warranty and inspection history through Django REST APIs, eliminating manual logging.",
    architecture: [
      { step: "01", name: "Laser-Marked QR System", desc: "Hardware-compatible industrial QR code indexing per fitting batch" },
      { step: "02", name: "Mobile Scan Endpoint", desc: "Sub-second camera decoding connecting to field inspection workflow" },
      { step: "03", name: "Django REST Backend", desc: "Role-based APIs linking vendors, warranty lifecycles, and audit logs" },
      { step: "04", name: "PostgreSQL Analytics", desc: "Centralized relational database tracking nationwide inventory movement" },
    ],
    role: "Team Lead (Team Dokku)",
    tools: ["Django", "Django REST Framework", "React", "PostgreSQL"],
    coverImage: "",
    videoUrl: "[PLACEHOLDER]",
    sourceUrl: "[PLACEHOLDER]",
    featured: true,
  },
];

