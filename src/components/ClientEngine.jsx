import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { Zap, Bot, Database, Server, ArrowUpRight, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollViewportEarly, cardRevealVariant, luxuryTransition } from '../config/motion';
import SectionHeader from './SectionHeader';
import MagneticButton from './MagneticButton';

function UpworkLogo({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.229l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.704-2.704 2.704zm0-8.14c-3.14 0-5.32 2.248-5.938 4.488-1.182-1.759-2.008-3.673-2.46-5.499H6.848v7.444c0 2.018-1.635 3.653-3.653 3.653-2.018 0-3.654-1.635-3.653-3.653V4.007H0v7.444c0 3.738 3.036 6.774 6.774 6.774 2.274 0 4.287-1.127 5.513-2.859.629 1.499 1.682 2.802 3.036 3.622 1.002.608 2.146.929 3.238.929 3.535 0 6.41-2.875 6.41-6.41 0-3.535-2.875-6.41-6.41-6.41z" />
    </svg>
  );
}

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

export default function ClientEngine({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';
  const bannerRef = React.useRef(null);

  // Oversized banner heading drifts sideways as the banner crosses the viewport
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
  const headingX = useTransform(scrollYProgress, [0, 1], [36, -18]);
  const HeadingTag = motionEnabled ? motion.h3 : 'h3';

  return (
    <section className="section-padding" id="hire-me" aria-label="Services and freelance engagements">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="Client Collaboration & Freelance"
          title={<>Have a Software Task? <span className="text-accent">Hire Me.</span></>}
          description="I help founders, tech leaders, and fast-growing businesses turn technical bottlenecks into scalable AI products, automated workflows, and robust backends."
        />

        {/* 4 service pillars: 4-up / 2×2 / stacked, never 3+1 */}
        <div className="client-pillars-grid">
          {clientPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <MotionDiv
                key={pillar.title}
                className="client-pillar-card interactive-hover-card"
                variants={motionEnabled ? cardRevealVariant : undefined}
                custom={index * 0.08}
                initial={motionEnabled ? 'hidden' : undefined}
                whileInView={motionEnabled ? 'visible' : undefined}
                viewport={motionEnabled ? scrollViewportEarly : undefined}
                whileHover={motionEnabled ? { y: -4 } : undefined}
              >
                <div className="client-pillar-top">
                  <div className="client-pillar-icon-box">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className="client-pillar-num" aria-hidden="true">{pillar.num}</span>
                </div>

                <h3 className="client-pillar-title">{pillar.title}</h3>
                <p className="client-pillar-desc">{pillar.desc}</p>

                <div className="client-pillar-tags">
                  {pillar.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            );
          })}
        </div>

        {/* Hire banner */}
        <MotionDiv
          ref={bannerRef}
          className="client-banner-card"
          variants={motionEnabled ? cardRevealVariant : undefined}
          custom={0.08}
          initial={motionEnabled ? 'hidden' : undefined}
          whileInView={motionEnabled ? 'visible' : undefined}
          viewport={motionEnabled ? scrollViewportEarly : undefined}
        >
          <div className="client-banner-glow" aria-hidden="true" />

          <div className="client-banner-header">
            <div className="client-banner-intro">
              <div className="client-status-badge">
                <span className="client-status-dot" aria-hidden="true" />
                <span>Available for New Projects</span>
              </div>
              <HeadingTag
                className="client-banner-heading"
                style={motionEnabled ? { x: headingX } : undefined}
              >
                Ready to build or scale your system?
              </HeadingTag>
            </div>

            <div className="client-banner-actions">
              {isValidContent(siteConfig.contact.upwork) && (
                <MagneticButton
                  as="a"
                  motionEnabled={motionEnabled}
                  href={siteConfig.contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-upwork"
                  title="Hire Akshit on Upwork with escrow payment protection"
                >
                  <UpworkLogo size={18} className="upwork-logo-svg" />
                  <span>Hire on Upwork</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </MagneticButton>
              )}

              {isValidContent(siteConfig.contact.whatsapp) && (
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  title="Direct WhatsApp message"
                >
                  <MessageCircle size={16} className="icon-whatsapp" aria-hidden="true" />
                  <span>WhatsApp DM</span>
                </a>
              )}

              <a
                href="https://cal.com/akshitsharmacodes"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Calendar size={16} aria-hidden="true" />
                <span>Book 15-Min Call</span>
              </a>
            </div>
          </div>

          <div className="client-trust-grid">
            {trustBadges.map((badge, bIdx) => (
              <MotionDiv
                key={badge.title}
                className="client-trust-item"
                initial={motionEnabled ? { opacity: 0, y: 14 } : undefined}
                whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
                viewport={motionEnabled ? scrollViewportEarly : undefined}
                transition={motionEnabled ? luxuryTransition(0.2 + bIdx * 0.06, 0.5) : undefined}
              >
                <CheckCircle2 size={18} className="client-trust-icon" aria-hidden="true" />
                <div>
                  <h4 className="client-trust-title">{badge.title}</h4>
                  <p className="client-trust-desc">{badge.desc}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
