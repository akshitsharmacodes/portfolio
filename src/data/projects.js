/**
 * PROJECTS DATA
 * Single source of truth projects list for Akshit Sharma
 */

export const projects = [
  {
    id: "zero-ops-autosre",
    title: "Zero-Ops AutoSRE",
    category: "AI / DevOps",
    year: "2026",
    summary: "Autonomous Site Reliability Engineering agent shortlisted as Top 10 National Finalist in Hack-O-Octo 4.0 by GDG Chandigarh University.",
    description:
      "Modern cloud infrastructure produces massive alert fatigue during incidents. I designed and built Zero-Ops AutoSRE, an autonomous AI-powered Site Reliability Engineering agent that detects anomalies, performs multi-agent root cause analysis, and safely executes self-healing runbooks in real-time. Shortlisted among the Top 10 National Finalist teams across India in Hack-O-Octo 4.0 organized by Google Developer Groups (GDG) at Chandigarh University.",
    architecture: [
      { step: "01", name: "Telemetry & Log Ingestion", desc: "Real-time streaming metrics, error spikes, and cloud health events ingestion" },
      { step: "02", name: "LangGraph Root Cause Analysis", desc: "Diagnostic supervisor coordinating log parsing, dependency mapping, and commit diff inspection" },
      { step: "03", name: "Autonomous Runbook Remediation", desc: "Safety-gated automated rollbacks, self-healing pod restarts, and configuration hot-patches" },
      { step: "04", name: "Incident Telemetry Dashboard", desc: "Real-time cockpit streaming incident resolution logs, audit trails, and MTTR telemetry" },
    ],
    role: "Lead Architect & Developer",
    tools: ["Python", "FastAPI", "AI Agents", "LangGraph", "Docker", "React", "DevOps"],
    coverImage: "",
    liveUrl: "https://landing-page-for-auto-sre.vercel.app/",
    sourceUrl: "https://github.com/akshitsharmacodes/zero-ops-autosre",
    featured: true,
  },
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
    liveUrl: "https://matcha-ai-five.vercel.app/",
    sourceUrl: "https://github.com/akshitsharmacodes/Matcha-AI",
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
    liveUrl: "https://sofricai.vercel.app/",
    sourceUrl: "[PLACEHOLDER]",
    featured: true,
  },
  {
    id: "sims",
    title: "SIMS: Smart Inventory System",
    category: "Web App / Hackathon",
    year: "2025",
    summary: "Smart India Hackathon 2025 internal-round winner (Amity University): a system for tracking Indian Railways fittings.",
    description:
      "Indian Railways had no system to track the crores of rail fittings procured every year. I led Team Dokku to 1st place in the Smart India Hackathon 2025 internal round at Amity University by solving this end-to-end. Laser-marked QR codes scan on mobile to instantly surface vendor, warranty and inspection history through Django REST APIs, eliminating manual logging.",
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
    sourceUrl: "https://github.com/akshitsharmacodes/SIH-Backend",
    featured: true,
  },
  {
    id: "nova-sight",
    title: "NovaSight",
    category: "AI / Vision",
    year: "2025",
    summary: "Real-time object detection in space station environments using custom YOLOv8 trained on Falcon digital twins.",
    description:
      "Developed for the Duality AI Space Station Hackathon, NovaSight combines a custom fine-tuned YOLOv8 model with a Flask backend and React frontend to deliver real-time object detection in high-risk space station environments. Trained entirely on 100% synthetic digital twin data from Falcon, achieving 98.4% precision and 94.4% mAP@0.5 for critical safety equipment, oxygen tanks, and maintenance toolboxes.",
    architecture: [
      { step: "01", name: "Falcon Synthetic Ingestion", desc: "Data ingestion pipeline parsing synthetic digital twin renders across varied orbital lighting conditions" },
      { step: "02", name: "Custom YOLOv8 Training", desc: "Fine-tuned model achieving 98.4% precision and 94.4% mAP@0.5 over 100 training epochs" },
      { step: "03", name: "Flask Inference API", desc: "Sub-second REST endpoints returning bounding box coordinates, confidence scores, and annotations" },
      { step: "04", name: "Interactive Mission Control UI", desc: "React dashboard providing real-time visual inspection and telemetry analytics" },
    ],
    role: "AI/ML Developer",
    tools: ["Python", "YOLOv8", "Flask", "React", "OpenCV", "Roboflow"],
    coverImage: "",
    sourceUrl: "https://github.com/akshitsharmacodes/Nova-Sight",
    featured: true,
  },
];

