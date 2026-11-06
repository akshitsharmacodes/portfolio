import React from 'react';
import { siteConfig } from '../config/site';
import { Shield, Brain, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: custom * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="section-padding" id="about" aria-label="About Akshit Sharma">
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
            <span className="section-tag">Philosophy & Background</span>
          </div>
          <h2 className="section-title">Engineering Background</h2>
        </MotionDiv>

        <div className="about-grid">
          {/* Biography text */}
          <MotionDiv
            className="about-text-column"
            initial={motionEnabled ? { opacity: 0, x: -24 } : undefined}
            whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined}
            viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <MotionDiv
              className="skill-group-card interactive-hover-card"
              custom={1}
              variants={motionEnabled ? cardVariants : undefined}
              initial={motionEnabled ? "hidden" : undefined}
              whileInView={motionEnabled ? "visible" : undefined}
              viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Brain size={20} className="text-accent" aria-hidden="true" />
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text)' }}>Multi-Agent Orchestration</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Replacing monolithic prompts with specialized LangGraph state graphs that isolate tasks, provide checkpointing, and make scoring and verification inspectable.
              </p>
            </MotionDiv>

            <MotionDiv
              className="skill-group-card interactive-hover-card"
              custom={2}
              variants={motionEnabled ? cardVariants : undefined}
              initial={motionEnabled ? "hidden" : undefined}
              whileInView={motionEnabled ? "visible" : undefined}
              viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Terminal size={20} className="text-accent" aria-hidden="true" />
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text)' }}>RAG & Vector Retrieval</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Semantic chunking, vector indexing in ChromaDB, and hybrid relational queries in PostgreSQL to ground generation in verified enterprise truth.
              </p>
            </MotionDiv>

            <MotionDiv
              className="skill-group-card interactive-hover-card"
              custom={3}
              variants={motionEnabled ? cardVariants : undefined}
              initial={motionEnabled ? "hidden" : undefined}
              whileInView={motionEnabled ? "visible" : undefined}
              viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Cpu size={20} className="text-accent" aria-hidden="true" />
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text)' }}>High-Throughput Backends</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                FastAPI, Django REST APIs, Redis caching layers, and asynchronous Celery job queues engineered for low latency and zero data loss.
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
