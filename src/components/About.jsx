import React from 'react';
import { siteConfig } from '../config/site';
import { Brain, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollViewportEarly, fadeInLeftVariant, cardRevealVariant } from '../config/motion';
import SectionHeader from './SectionHeader';

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

export default function About({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="about" aria-label="About Akshit Sharma">
      <div className="container">
        <SectionHeader motionEnabled={motionEnabled} tag="Philosophy & Background" title="Engineering Background" />

        <div className="about-grid">
          <MotionDiv
            className="about-text-column"
            variants={motionEnabled ? fadeInLeftVariant : undefined}
            initial={motionEnabled ? 'hidden' : undefined}
            whileInView={motionEnabled ? 'visible' : undefined}
            viewport={motionEnabled ? scrollViewportEarly : undefined}
          >
            <p className="about-paragraph">{siteConfig.identity.about}</p>

            <div className="about-highlight-box">
              <h3 className="about-highlight-title">Military Precision to AI Engineering</h3>
              <p className="about-highlight-text">
                Rigorous training at the Officers Training Academy (OTA Gaya, TES-48) instilled mission discipline,
                situational awareness and decisive problem-solving. In modern AI systems—where nondeterministic LLMs
                must integrate with mission-critical databases—this structured approach ensures robust error
                boundaries and predictable outcomes.
              </p>
            </div>
          </MotionDiv>

          <div className="about-principles-column">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <MotionDiv
                  key={p.title}
                  className="skill-group-card about-principle-card interactive-hover-card"
                  variants={motionEnabled ? cardRevealVariant : undefined}
                  custom={idx * 0.09}
                  initial={motionEnabled ? 'hidden' : undefined}
                  whileInView={motionEnabled ? 'visible' : undefined}
                  viewport={motionEnabled ? scrollViewportEarly : undefined}
                  whileHover={motionEnabled ? { y: -4 } : undefined}
                >
                  <div className="about-pillar-header">
                    <div className="about-pillar-icon-box">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <h4 className="about-pillar-title">{p.title}</h4>
                  </div>
                  <p className="about-pillar-desc">{p.desc}</p>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
