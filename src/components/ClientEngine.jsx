import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import {
  Zap,
  Bot,
  Database,
  Server,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClientEngine({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  const clientPillars = [
    {
      icon: Bot,
      num: '01',
      title: 'Autonomous AI Agents & Workflows',
      desc: 'Eliminate repetitive operational work. I architect multi-agent state graphs with LangGraph and LangChain that parse inputs, orchestrate tools, and deliver verified results.',
      tags: ['LangGraph', 'LangChain', 'Agent Workflows', 'Decision Logic'],
    },
    {
      icon: Database,
      num: '02',
      title: 'Enterprise RAG & Semantic Retrieval',
      desc: 'Ground AI responses in your authentic enterprise data. Vector indexing in ChromaDB, hybrid relational querying in PostgreSQL, and Redis caching for low-latency throughput.',
      tags: ['RAG Pipelines', 'ChromaDB', 'Vector Search', 'Hybrid Retrieval'],
    },
    {
      icon: Server,
      num: '03',
      title: 'Production Backend Engineering',
      desc: 'Scalable FastAPI and Django REST backends designed for enterprise reliability, asynchronous task queues with Celery and Redis, and automated data workflows.',
      tags: ['FastAPI', 'Django REST', 'Celery', 'PostgreSQL', 'Redis'],
    },
    {
      icon: Zap,
      num: '04',
      title: 'Fast MVP to Production Execution',
      desc: 'From initial architecture to deployable software. Smart India Hackathon 2025 1st place track record delivering maintainable, well-documented code on deadline.',
      tags: ['MVP Architecture', 'Clean Code', 'Docker', 'AWS / Linux'],
    },
  ];

  const trustBadges = [
    { title: 'Upwork Escrow Protection', desc: 'Hire safely with hourly tracking or milestone escrow.' },
    { title: 'Direct GitHub Repository', desc: '100% transparent commits, branches, and code documentation.' },
    { title: 'Fast Direct Communication', desc: 'Clear updates via Cal.com, Slack, or Upwork workrooms.' },
    { title: 'Military Discipline & Rigor', desc: 'OTA Gaya trained decision-making under high-stakes timelines.' },
  ];

  return (
    <section className="section-padding" id="hire-me" aria-label="Hire Me for Engineering Projects">
      <div className="container">
        {/* Section Header */}
        <MotionDiv
          initial={motionEnabled ? { opacity: 0, y: 24 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-meta">
            <span className="section-num">02</span>
            <span className="section-tag">Client Collaboration & Freelance</span>
          </div>
          <h2 className="section-title">
            Have a Software Task? <span className="text-accent">Hire Me.</span>
          </h2>
          <p className="section-desc" style={{ marginBottom: '40px' }}>
            I help founders, tech leaders, and fast-growing businesses turn technical bottlenecks into scalable AI products, automated workflows, and robust backends.
          </p>
        </MotionDiv>

        {/* 4 Core Pillars Grid */}
        <div className="client-pillars-grid">
          {clientPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <MotionDiv
                key={pillar.title}
                className="client-pillar-card interactive-hover-card"
                initial={motionEnabled ? { opacity: 0, y: 28 } : undefined}
                whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
                viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={motionEnabled ? { y: -6 } : undefined}
              >
                <div className="client-pillar-top">
                  <div className="client-pillar-icon-box">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <span className="client-pillar-num">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="client-pillar-title">
                  {pillar.title}
                </h3>
                <p className="client-pillar-desc">
                  {pillar.desc}
                </p>

                <div className="client-pillar-tags">
                  {pillar.tags.map((tag) => (
                    <span key={tag} className="tech-tag" style={{ fontSize: '0.72rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            );
          })}
        </div>

        {/* Client Trust Card Banner - Fully Optimized for Light & Dark Theme */}
        <MotionDiv
          className="client-banner-card"
          initial={motionEnabled ? { opacity: 0, y: 24 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="client-banner-glow" />

          <div className="client-banner-header">
            <div>
              <div className="client-status-badge">
                <span className="client-status-dot" />
                <span>Available for New Projects</span>
              </div>
              <h3 className="client-banner-heading">
                READY TO BUILD OR SCALE YOUR SYSTEM?
              </h3>
            </div>

            {/* High Conversion Hire Action Group */}
            <div className="client-banner-actions">
              {isValidContent(siteConfig.contact.upwork) && (
                <a
                  href={siteConfig.contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-upwork"
                  title="Hire Akshit on Upwork with Payment Protection"
                >
                  <span>Hire Me on Upwork</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}

              <a
                href="https://cal.com/akshitsharmacodes"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '12px 24px', fontSize: '0.94rem' }}
              >
                <Calendar size={16} aria-hidden="true" />
                <span>Book 15-Min Call</span>
              </a>
            </div>
          </div>

          {/* 4 Client Trust Guarantees */}
          <div className="client-trust-grid">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="client-trust-item">
                <CheckCircle2 size={18} className="client-trust-icon" />
                <div>
                  <h4 className="client-trust-title">
                    {badge.title}
                  </h4>
                  <p className="client-trust-desc">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
