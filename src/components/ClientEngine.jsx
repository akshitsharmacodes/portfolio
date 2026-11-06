import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import {
  ShieldCheck,
  Zap,
  Bot,
  Database,
  Server,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {clientPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <MotionDiv
                key={pillar.title}
                className="skill-group-card interactive-hover-card"
                style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}
                initial={motionEnabled ? { opacity: 0, y: 28 } : undefined}
                whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
                viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={motionEnabled ? { y: -6 } : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(227, 43, 60, 0.1)',
                      border: '1px solid rgba(227, 43, 60, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-dim)' }}>
                    {pillar.num}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--text)', marginBottom: '10px', lineHeight: '1.3' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '16px', flex: 1 }}>
                  {pillar.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
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

        {/* Client Trust Card Banner */}
        <MotionDiv
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(12, 12, 12, 0.98) 100%)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(28px, 5vw, 44px)',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={motionEnabled ? { opacity: 0, y: 24 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Ambient Radial Highlight */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(227, 43, 60, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              marginBottom: '32px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '12px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span>Available for New Projects</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text)', textTransform: 'uppercase', lineHeight: '1.1' }}>
                READY TO BUILD OR SCALE YOUR SYSTEM?
              </h3>
            </div>

            {/* High Conversion Hire Action Group */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {isValidContent(siteConfig.contact.upwork) && (
                <a
                  href={siteConfig.contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#14a800',
                    boxShadow: '0 4px 20px rgba(20, 168, 0, 0.3)',
                    padding: '12px 28px',
                    fontSize: '0.94rem',
                    fontWeight: 700,
                  }}
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {trustBadges.map((badge) => (
              <div key={badge.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} className="text-accent" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 700, marginBottom: '2px' }}>
                    {badge.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
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

