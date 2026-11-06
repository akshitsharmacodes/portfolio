import React from 'react';
import { siteConfig } from '../config/site';
import { Shield, Brain, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  scrollViewport,
  scrollViewportEarly,
  fadeInUpVariant,
  fadeInLeftVariant,
  cardRevealVariant,
} from '../config/motion';

export default function About({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  const principles = [
    {
      icon: Brain,
      title: 'Multi-Agent Orchestration',
      desc: 'Replacing monolithic prompts with specialized LangGraph state graphs that isolate tasks, provide checkpointing, and make scoring and verification inspectable.',
    },
    {
      icon: Terminal,
      title: 'RAG & Vector Retrieval',
      desc: 'Semantic chunking, vector indexing in ChromaDB, and hybrid relational queries in PostgreSQL to ground generation in verified enterprise truth.',
    },
    {
      icon: Cpu,
      title: 'High-Throughput Backends',
      desc: 'FastAPI, Django REST APIs, Redis caching layers, and asynchronous Celery job queues engineered for low latency and zero data loss.',
    },
  ];

  return (
    <section className="section-padding" id="about" aria-label="About Akshit Sharma">
      <div className="container">
        {/* Section Header */}
        <MotionDiv
          variants={motionEnabled ? fadeInUpVariant : undefined}
          initial={motionEnabled ? "hidden" : undefined}
          whileInView={motionEnabled ? "visible" : undefined}
          viewport={motionEnabled ? scrollViewport : undefined}
        >
          <div className="section-meta">
            <span className="section-num">02</span>
            <span className="section-tag">Philosophy & Background</span>
          </div>
          <h2 className="section-title">Engineering Background</h2>
        </MotionDiv>

        <div className="about-grid">
          {/* Biography text */}
          <MotionDiv
            className="about-text-column"
            variants={motionEnabled ? fadeInLeftVariant : undefined}
            initial={motionEnabled ? "hidden" : undefined}
            whileInView={motionEnabled ? "visible" : undefined}
            viewport={motionEnabled ? scrollViewportEarly : undefined}
          >
            <p className="about-paragraph">
              {siteConfig.identity.about}
            </p>

            <div className="about-highlight-box">
              <h3 className="about-highlight-title">Military Precision to AI Engineering</h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Rigorous training at the Officers Training Academy (OTA Gaya, TES-48) instilled mission discipline, situational awareness and decisive problem-solving. In modern AI systems—where nondeterministic LLMs must integrate with mission-critical databases—this structured approach ensures robust error boundaries and predictable outcomes.
              </p>
            </div>
          </MotionDiv>

          {/* Core Principles */}
          <div className="about-principles-column">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <MotionDiv
                  key={p.title}
                  className="skill-group-card about-principle-card interactive-hover-card"
                  variants={motionEnabled ? cardRevealVariant : undefined}
                  custom={idx * 0.09}
                  initial={motionEnabled ? "hidden" : undefined}
                  whileInView={motionEnabled ? "visible" : undefined}
                  viewport={motionEnabled ? scrollViewportEarly : undefined}
                  whileHover={motionEnabled ? { y: -4, borderColor: 'var(--border-strong)' } : undefined}
                >
                  <div className="about-pillar-header">
                    <div className="about-pillar-icon-box">
                      <Icon size={20} className="text-accent" aria-hidden="true" />
                    </div>
                    <h4 className="about-pillar-title">{p.title}</h4>
                  </div>
                  <p className="about-pillar-desc">
                    {p.desc}
                  </p>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
