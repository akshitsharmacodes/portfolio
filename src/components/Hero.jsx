import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, Trophy, Award, ShieldCheck, Github, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ motionEnabled }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionEnabled ? 0.1 : 0,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: motionEnabled ? 28 : 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionDiv = motionEnabled ? motion.div : 'div';
  const MotionH1 = motionEnabled ? motion.h1 : 'h1';

  return (
    <section className="hero-section" id="hero" aria-label="Hero Introduction">
      {/* Abstract Network Graph Backdrop Motif */}
      <svg
        className="hero-graph-decor"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="160" stroke="#e32b3c" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
        <circle cx="200" cy="200" r="90" stroke="#f2efeb" strokeWidth="1" strokeOpacity="0.15" />
        <line x1="80" y1="120" x2="200" y2="200" stroke="#e32b3c" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="200" y1="200" x2="320" y2="150" stroke="#e32b3c" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="200" y1="200" x2="280" y2="300" stroke="#f2efeb" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="200" y1="200" x2="100" y2="290" stroke="#f2efeb" strokeWidth="1" strokeOpacity="0.2" />
        <circle cx="80" cy="120" r="5" fill="#e32b3c" />
        <circle cx="320" cy="150" r="5" fill="#e32b3c" />
        <circle cx="200" cy="200" r="8" fill="#e32b3c" />
        <circle cx="280" cy="300" r="4" fill="#f2efeb" />
        <circle cx="100" cy="290" r="4" fill="#f2efeb" />
      </svg>

      <div className="container">
        <MotionDiv
          className="hero-content"
          variants={motionEnabled ? containerVariants : undefined}
          initial={motionEnabled ? "hidden" : undefined}
          animate={motionEnabled ? "visible" : undefined}
        >
          {/* Availability & Profession Tagline */}
          <MotionDiv className="hero-tagline-row" variants={motionEnabled ? itemVariants : undefined}>
            <div className="status-pill">
              <span className="status-dot"></span>
              <span>{siteConfig.identity.availability}</span>
            </div>
            <span className="hero-profession">
              {siteConfig.identity.profession} · {siteConfig.identity.roleLine2}
            </span>
          </MotionDiv>

          {/* Grand Name Display */}
          <MotionH1 className="hero-name-callout" variants={motionEnabled ? itemVariants : undefined}>
            {siteConfig.identity.fullName}
          </MotionH1>

          {/* Bold Core Headline */}
          <MotionDiv className="hero-headline" variants={motionEnabled ? itemVariants : undefined}>
            I build AI agents that{' '}
            <span className="text-accent">{siteConfig.identity.headlineAccent}</span>
          </MotionDiv>

          {/* Short Narrative Intro */}
          <MotionDiv className="hero-intro" variants={motionEnabled ? itemVariants : undefined}>
            <p>{siteConfig.identity.intro}</p>
          </MotionDiv>

          {/* Specialty Tech Chips */}
          <MotionDiv className="hero-specialties" variants={motionEnabled ? itemVariants : undefined}>
            {siteConfig.specialties.map((spec) => (
              <span key={spec} className="tech-tag accent-style">
                {spec}
              </span>
            ))}
          </MotionDiv>

          {/* Action CTAs */}
          <MotionDiv className="hero-actions" variants={motionEnabled ? itemVariants : undefined}>
            <a href="#work" className="btn btn-primary">
              <span>View Selected Work</span>
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>Get In Touch</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>

            {/* Resume Button */}
            {isValidContent(siteConfig.identity.resume) && (
              <a
                href={siteConfig.identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                aria-label="View Resume on Google Drive"
              >
                <FileText size={16} className="text-accent" aria-hidden="true" />
                <span>Resume</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}

            {/* GitHub Button */}
            {isValidContent(siteConfig.contact.github) && (
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                aria-label="Visit GitHub Profile"
              >
                <Github size={16} aria-hidden="true" />
                <span>GitHub</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}

            {/* Verified Location */}
            <div className="hero-location" title="Current base">
              <MapPin size={16} className="text-accent" aria-hidden="true" />
              <span>{siteConfig.identity.location}</span>
            </div>
          </MotionDiv>

          {/* Verified Achievements Strip */}
          <MotionDiv className="metrics-strip" variants={motionEnabled ? itemVariants : undefined}>
            {siteConfig.metrics.map((metric) => (
              <div key={metric.label} className="metric-item">
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                <div className="metric-detail">{metric.detail}</div>
              </div>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}

