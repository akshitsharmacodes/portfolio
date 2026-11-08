import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, Sparkles, Check, ArrowRight } from 'lucide-react';
import { skillsData } from '../data/experience';
import SectionHeader from './SectionHeader';
import { TechLogo } from './TechLogo';

/**
 * Core Technical Capabilities as a Pleated Strip (after Scrolltide's #c-pleated-strip):
 * An endless/curved accordion strip of technical capability posters connected by paper pleats.
 * At rest, the focused capability glides to center flat and upright with its authentic tech logos;
 * scrolling, dragging, or stepping throws the folds open and rolls adjacent panels along the drum.
 */

function SwipeGestureIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M11 11.5v-2a1.5 1.5 0 1 1 3 0V12" />
      <path d="M14 10.5a1.5 1.5 0 1 1 3 0V12" />
      <path d="M17 11.5a1.5 1.5 0 1 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-4.24-1.76l-3.8-3.8a1.5 1.5 0 0 1 2.12-2.12L8 16" />
      <path d="M4 8l-2-2 2-2" opacity="0.75" />
      <path d="M20 8l2-2-2-2" opacity="0.75" />
    </svg>
  );
}

const CAPABILITY_POSTERS = [
  {
    id: 'ai-agents',
    num: '01',
    category: 'AI Orchestration & Agents',
    tag: 'Primary Speciality',
    headline: 'Multi-Agent State Graphs & Decision Automations',
    summary: 'Architecting autonomous agent networks with LangGraph and LangChain that parse fuzzy business inputs, route subtasks, invoke external tools, and verify outputs with human-in-the-loop checkpoints.',
    primaryTech: [
      { name: 'LangGraph', role: 'Multi-Agent State Graph Orchestration' },
      { name: 'LangChain', role: 'Tool Calling & Memory Chains' },
      { name: 'Python', role: 'Core AI Engineering Runtime' },
      { name: 'FastAPI', role: 'Low-Latency Streaming Endpoints' },
    ],
    otherTech: ['Agentic RAG', 'Multi-Agent Workflows', 'Decision Logic', 'Evaluations'],
    metric: 'SIH 2025 Winner',
  },
  {
    id: 'genai-rag',
    num: '02',
    category: 'GenAI & Enterprise RAG',
    tag: 'Knowledge Grounding',
    headline: 'High-Accuracy Semantic Retrieval & LLM Systems',
    summary: 'Eliminating hallucinations by grounding LLMs in proprietary enterprise data. Designing chunking strategies, hybrid vector + keyword search in ChromaDB, and real-time reranking pipelines.',
    primaryTech: [
      { name: 'ChromaDB', role: 'High-Speed Vector Embeddings' },
      { name: 'Python', role: 'Pipeline Optimization & Ingestion' },
      { name: 'PostgreSQL', role: 'Relational & Hybrid Metadata' },
      { name: 'Redis', role: 'Vector & Semantic Caching' },
    ],
    otherTech: ['LLMs', 'Generative AI', 'RAG Pipelines', 'Vector Search', 'Prompt Engineering', 'NLP'],
    metric: 'Sub-50ms Retrieval',
  },
  {
    id: 'languages',
    num: '03',
    category: 'Core Languages',
    tag: 'Systems & Logic',
    headline: 'Object-Oriented, Algorithmic & Query Foundations',
    summary: 'Rigorous software fundamentals shaped by deep data structures, algorithmic complexity, and typed asynchronous execution across Python, C++, and optimized SQL.',
    primaryTech: [
      { name: 'Python', role: 'Primary Language for AI & Backends' },
      { name: 'C++', role: 'Algorithms & Competitive Programming' },
      { name: 'SQL', role: 'Complex Querying & Schema Design' },
      { name: 'JavaScript', role: 'Modern Asynchronous Web Logic' },
    ],
    otherTech: ['Data Structures', 'Algorithms', 'OOP', 'Type Annotations'],
    metric: 'LeetCode Active',
  },
  {
    id: 'backend',
    num: '04',
    category: 'Backend & APIs',
    tag: 'Production Grade',
    headline: 'Robust Microservices & Asynchronous Task Queues',
    summary: 'Production backends built for high concurrency. Decoupled microservices with FastAPI and Django REST, asynchronous job scheduling with Celery/Redis, and comprehensive test coverage.',
    primaryTech: [
      { name: 'FastAPI', role: 'Async High-Throughput REST APIs' },
      { name: 'Django', role: 'Enterprise Model Architecture' },
      { name: 'Celery', role: 'Distributed Background Tasks' },
      { name: 'PostgreSQL', role: 'Persistent Relational Storage' },
    ],
    otherTech: ['Django REST Framework', 'REST APIs', 'JWT Auth', 'WebSockets'],
    metric: 'Scalable Architecture',
  },
  {
    id: 'databases',
    num: '05',
    category: 'Databases & Caching',
    tag: 'Data Persistence',
    headline: 'Hybrid Relational, Vector & In-Memory Stores',
    summary: 'Data architecture designed for resilience and throughput. Indexing and query planning in PostgreSQL, vector stores with ChromaDB, and in-memory session/cache management with Redis.',
    primaryTech: [
      { name: 'PostgreSQL', role: 'Primary ACID Relational Database' },
      { name: 'Redis', role: 'In-Memory Cache & Message Broker' },
      { name: 'ChromaDB', role: 'Vector Embeddings Index' },
      { name: 'SQL', role: 'Performance Tuned Queries' },
    ],
    otherTech: ['Vector Databases', 'MySQL', 'SQLite', 'Connection Pooling'],
    metric: 'Zero Data Loss',
  },
  {
    id: 'frontend',
    num: '06',
    category: 'Frontend & UI Engineering',
    tag: 'Interactive Web',
    headline: 'Performant, Accessible & Cinematic Interfaces',
    summary: 'Crafting responsive, high-performance web applications with React, Next.js, Tailwind CSS, and fluid motion systems. Engineered for micro-interactions and zero layout shift.',
    primaryTech: [
      { name: 'React.js', role: 'Component Architecture & Hooks' },
      { name: 'Next.js', role: 'SSR & Production Edge Deployments' },
      { name: 'Tailwind CSS', role: 'Utility-First Modern Styling' },
      { name: 'JavaScript', role: 'ESNext Reactive Programming' },
    ],
    otherTech: ['shadcn/ui', 'Framer Motion', 'Responsive Design', 'A11y'],
    metric: 'Sub-Second FCP',
  },
  {
    id: 'devops',
    num: '07',
    category: 'Infrastructure & DevOps',
    tag: 'Deployment & CI/CD',
    headline: 'Containerized Deployment, Linux & Cloud Systems',
    summary: 'Automating the path from code to production. Docker containerization for predictable environments, Linux server hardening, automated CI/CD pipelines, and cloud hosting on AWS.',
    primaryTech: [
      { name: 'Docker', role: 'Containerization & Multi-Stage Builds' },
      { name: 'AWS', role: 'Cloud Infrastructure & S3/EC2' },
      { name: 'Linux', role: 'Server Administration & Bash Scripting' },
      { name: 'Git', role: 'Version Control & Trunk Workflows' },
    ],
    otherTech: ['Postman', 'Vercel', 'Nginx', 'Environment Security'],
    metric: '99.9% Reliable',
  },
];

export default function Skills({ motionEnabled = true }) {
  const [active, setActive] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const total = CAPABILITY_POSTERS.length;
  const containerRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  const dismissHint = () => {
    setShowSwipeHint(false);
  };

  // Auto-dismiss swipe hint after 7 seconds if left idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const go = (delta) => {
    dismissHint();
    setActive((prev) => (prev + delta + total) % total);
  };

  const selectPoster = (idx) => {
    dismissHint();
    setActive(idx);
  };

  const current = CAPABILITY_POSTERS[active];

  // Mobile Touch Swipe detection
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Check if horizontal movement is dominant and meets swipe threshold
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.1;
    const isFlick = deltaTime < 250 && Math.abs(deltaX) > 25;
    const isSwipe = Math.abs(deltaX) > 40;

    if (isHorizontal && (isFlick || isSwipe)) {
      dismissHint();
      if (deltaX < 0) {
        go(1); // Swipe left => Next card
      } else {
        go(-1); // Swipe right => Previous card
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <section className="section-padding section-padding--tight-top" id="skills" aria-label="Skills and capabilities">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="Core Technical Capabilities"
          title={<>Technical <span className="text-accent">Stack.</span></>}
          description="Specialized across the modern AI engineering lifecycle, from LangChain/LangGraph multi-agent systems and vector embeddings to scalable, containerized Python backends."
        />

        {/* Pleated Strip Top Navigation Bar */}
        <div className="pleat-nav-bar">
          <div className="pleat-counter">
            <span className="pleat-counter-current">{current.num}</span>
            <span className="pleat-counter-sep">/</span>
            <span className="pleat-counter-total">{String(total).padStart(2, '0')}</span>
            <span className="pleat-counter-badge">{current.category}</span>
          </div>

          {/* Quick Domain Jump Tabs */}
          <div className="pleat-pills" role="tablist" aria-label="Capability categories">
            {CAPABILITY_POSTERS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active === idx}
                className={`pleat-pill${active === idx ? ' is-active' : ''}`}
                onClick={() => selectPoster(idx)}
              >
                <span>{p.num}</span>
                <span className="pleat-pill-label">{p.category.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================================
            THE PLEATED STRIP (Scrolltide Inspiration: Endless drum with paper pleats)
            =================================================================== */}
        <div
          ref={containerRef}
          className="pleat-stage"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Technical capabilities pleated strip"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Prominent Floating Side Navigation Arrows */}
          <button
            type="button"
            className="pleat-stage-arrow pleat-stage-arrow--left"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous technical capability"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft size={26} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="pleat-stage-arrow pleat-stage-arrow--right"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next technical capability"
            title="Next (Right Arrow)"
          >
            <ChevronRight size={26} aria-hidden="true" />
          </button>

          {/* Swipable & Draggable 3D Drum Container */}
          <motion.div
            className="pleat-drum"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              dismissHint();
              if (offset.x < -35 || velocity.x < -200) {
                go(1);
              } else if (offset.x > 35 || velocity.x > 200) {
                go(-1);
              }
            }}
          >
            {CAPABILITY_POSTERS.map((poster, idx) => {
              // Calculate signed distance around circular strip
              let dist = idx - active;
              if (dist > total / 2) dist -= total;
              if (dist < -total / 2) dist += total;

              // Only render visible adjacent folds for performance and crisp depth
              const isVisible = Math.abs(dist) <= 2;
              if (!isVisible) return null;

              const isFocused = dist === 0;

              return (
                <div
                  key={poster.id}
                  className={`pleat-panel pleat-panel--dist-${dist}${isFocused ? ' is-focused' : ''}`}
                  style={{
                    '--dist': dist,
                    '--abs-dist': Math.abs(dist),
                  }}
                  onClick={() => {
                    if (dist !== 0) selectPoster(idx);
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${poster.num} ${poster.category}`}
                  aria-hidden={!isFocused}
                >
                  {/* Paper pleat fold seam highlight / valley shadow */}
                  <div className="pleat-crease" aria-hidden="true" />

                  {/* The Poster Content */}
                  <div className="pleat-poster">
                    {/* Poster Top Bar */}
                    <div className="pleat-poster-head">
                      <div className="pleat-num-badge">
                        <span className="pleat-num">{poster.num}</span>
                        <span className="pleat-tag">{poster.tag}</span>
                      </div>
                      <span className="pleat-metric-badge">{poster.metric}</span>
                    </div>

                    {/* Poster Title & Headline */}
                    <div className="pleat-poster-title-wrap">
                      <h3 className="pleat-category">{poster.category}</h3>
                      <h4 className="pleat-headline">{poster.headline}</h4>
                      <p className="pleat-summary">{poster.summary}</p>
                    </div>

                    {/* Real Tech Stack Logos Grid */}
                    <div className="pleat-tech-showcase">
                      <div className="pleat-showcase-label">
                        <span>Core Technologies</span>
                        <div className="pleat-line" />
                      </div>

                      <div className="pleat-logos-grid">
                        {poster.primaryTech.map((tech) => (
                          <div key={tech.name} className="pleat-logo-card">
                            <div className="pleat-logo-icon">
                              <TechLogo name={tech.name} size={30} />
                            </div>
                            <div className="pleat-logo-info">
                              <span className="pleat-logo-name">{tech.name}</span>
                              <span className="pleat-logo-role">{tech.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Secondary tags & capabilities */}
                    <div className="pleat-chips-row">
                      {poster.otherTech.map((item) => (
                        <span key={item} className="pleat-chip">
                          <TechLogo name={item} size={13} className="pleat-chip-logo" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Floor Reflection and Gradient Fog */}
          <div className="pleat-fog pleat-fog--left" aria-hidden="true" />
          <div className="pleat-fog pleat-fog--right" aria-hidden="true" />
        </div>

        {/* Mobile Swipe Guidance Hint */}
        <div className="pleat-swipe-hint-wrap" aria-live="polite">
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                className="pleat-swipe-hint"
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.span
                  className="pleat-swipe-hint-icon"
                  animate={motionEnabled ? { x: [-3, 3, -3] } : {}}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  <SwipeGestureIcon size={16} />
                </motion.span>
                <span className="pleat-swipe-hint-text">Swipe to explore</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tactile Indicator strip at bottom */}
        <div className="pleat-dots-bar" aria-hidden="true">
          {CAPABILITY_POSTERS.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              tabIndex={-1}
              className={`pleat-dot${active === idx ? ' is-active' : ''}`}
              onClick={() => selectPoster(idx)}
              aria-label={`Jump to ${p.category}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
