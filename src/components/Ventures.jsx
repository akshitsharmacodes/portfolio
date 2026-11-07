import React from 'react';
import { venturesData } from '../data/ventures';
import {
  Building2,
  FlaskConical,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollViewportEarly, cardRevealVariant } from '../config/motion';
import SectionHeader from './SectionHeader';

export default function Ventures({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  const getVentureIcon = (id) => {
    switch (id) {
      case 'gentle-estates':
        return <Building2 size={24} className="venture-primary-icon" />;
      case 'gentle-tech-labs':
        return <FlaskConical size={24} className="venture-primary-icon" />;
      case 'equestrian-sport':
        return (
          <svg
            className="venture-primary-icon horse-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            aria-hidden="true"
          >
            {/* Elegant Horse Silhouette Path */}
            <path d="M4 19 L6 14 C6 14 7 11 8 9 C9 7 11 5 14 5 C15.5 5 17 6 18 7 L19 8 C20 7 21 8 20 10 C19 12 18 13 17 14 L18 19" />
            <path d="M9 11 L13 13" />
            <path d="M12 9 C13 9 14.5 9.5 15 10" />
            <circle cx="16" cy="8" r="0.8" fill="currentColor" />
            <path d="M3 21 H21" strokeDasharray="2 2" />
          </svg>
        );
      default:
        return <Sparkles size={24} className="venture-primary-icon" />;
    }
  };

  const renderCardGraphic = (id) => {
    if (id === 'gentle-estates') {
      return (
        <svg
          className="venture-card-graphic"
          viewBox="0 0 160 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Architectural Blueprint Grids & Elevations */}
          <path
            d="M10 90 L10 40 L50 20 L90 40 L90 90 Z"
            stroke="rgba(227, 43, 60, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <path
            d="M50 20 L50 90"
            stroke="rgba(227, 43, 60, 0.3)"
            strokeWidth="1.2"
          />
          <path
            d="M80 90 L80 50 L120 30 L150 45 L150 90 Z"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.4"
          />
          <line
            x1="0"
            y1="90"
            x2="160"
            y2="90"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="50" cy="20" r="3" fill="var(--accent)" />
          <circle cx="120" cy="30" r="2.5" fill="currentColor" />
          {/* Dimension indicator lines */}
          <path
            d="M10 15 L90 15"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <text
            x="38"
            y="11"
            fill="currentColor"
            fillOpacity="0.4"
            fontSize="7"
            fontFamily="var(--font-mono)"
          >
            ESTATE_01
          </text>
        </svg>
      );
    }

    if (id === 'gentle-tech-labs') {
      return (
        <svg
          className="venture-card-graphic"
          viewBox="0 0 160 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Neural state graph & agent logic network */}
          <circle cx="30" cy="50" r="12" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="30" cy="50" r="4" fill="#3b82f6" />
          <circle cx="85" cy="25" r="9" stroke="currentColor"
            strokeOpacity="0.4" strokeWidth="1.4" />
          <circle cx="85" cy="75" r="9" stroke="currentColor"
            strokeOpacity="0.4" strokeWidth="1.4" />
          <circle cx="140" cy="50" r="14" stroke="#60a5fa" strokeWidth="1.8" />
          <circle cx="140" cy="50" r="5" fill="#60a5fa" />
          {/* Connectors */}
          <line x1="42" y1="46" x2="76" y2="29" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="42" y1="54" x2="76" y2="71" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="94" y1="28" x2="126" y2="44" stroke="#60a5fa" strokeWidth="1.5" />
          <line x1="94" y1="72" x2="126" y2="56" stroke="#60a5fa" strokeWidth="1.5" />
          <text
            x="48"
            y="92"
            fill="rgba(59, 130, 246, 0.7)"
            fontSize="7"
            fontFamily="var(--font-mono)"
          >
            AUTONOMOUS_LAB
          </text>
        </svg>
      );
    }

    if (id === 'equestrian-sport') {
      return (
        <svg
          className="venture-card-graphic"
          viewBox="0 0 160 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Jumping trajectory arc + obstacle hurdle + cavalry lance line */}
          <path
            d="M15 85 C40 80, 55 25, 85 20 C115 15, 130 75, 150 85"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          {/* Showjumping fence hurdle */}
          <line x1="75" y1="50" x2="95" y2="50" stroke="currentColor"
            strokeOpacity="0.6" strokeWidth="2.5" />
          <line x1="75" y1="65" x2="95" y2="65" stroke="#e32b3c" strokeWidth="2.5" />
          <line x1="75" y1="85" x2="75" y2="45" stroke="currentColor"
            strokeOpacity="0.4" strokeWidth="2" />
          <line x1="95" y1="85" x2="95" y2="45" stroke="currentColor"
            strokeOpacity="0.4" strokeWidth="2" />
          {/* Cavalry Lance vector */}
          <line x1="25" y1="75" x2="135" y2="25" stroke="rgba(16, 185, 129, 0.35)" strokeWidth="1.2" />
          <circle cx="85" cy="20" r="3.5" fill="#10b981" />
          <text
            x="36"
            y="94"
            fill="rgba(16, 185, 129, 0.75)"
            fontSize="7"
            fontFamily="var(--font-mono)"
          >
            CAVALRY_DISCIPLINE
          </text>
        </svg>
      );
    }

    return null;
  };

  return (
    <section
      className="section-padding"
      id="side-hustles"
      aria-label="Side Hustles and Leisure Passions"
    >
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag={venturesData.tag}
          title={
            <>
              {venturesData.title}
              <span className="section-title-italic-accent"> — My Poison</span>
            </>
          }
          description={venturesData.intro}
          className="section-header--wide"
        />

        {/* 3-Column Ventures Grid */}
        <div className="ventures-grid">
          {venturesData.ventures.map((venture, index) => (
            <MotionDiv
              key={venture.id}
              className={`venture-card venture-${venture.id} interactive-hover-card`}
              variants={motionEnabled ? cardRevealVariant : undefined}
              custom={index * 0.09}
              initial={motionEnabled ? "hidden" : undefined}
              whileInView={motionEnabled ? "visible" : undefined}
              viewport={motionEnabled ? scrollViewportEarly : undefined}
              style={{ '--venture-accent': venture.accent }}
            >
              {/* Card Background Subtle Illustration Graphic */}
              <div className="venture-card-graphic-container">
                {renderCardGraphic(venture.id)}
              </div>

              {/* Card Header */}
              <div className="venture-card-header">
                <div className="venture-icon-box">
                  {getVentureIcon(venture.id)}
                </div>
              </div>

              {/* Venture Titles */}
              <div className="venture-body">
                <div className="venture-title-row">
                  <h3 className="venture-name">{venture.name}</h3>
                </div>

                <p className="venture-tagline">{venture.tagline}</p>

                <p className="venture-description">{venture.description}</p>

                {/* Equestrian Sport Disciplines Showcase */}
                {venture.disciplines && (
                  <div className="venture-disciplines-list">
                    <span className="venture-subheading">Active Training Disciplines:</span>
                    <div className="disciplines-grid">
                      {venture.disciplines.map((d) => (
                        <div key={d.name} className="discipline-item">
                          <div className="discipline-top">
                            <span className="discipline-name">{d.name}</span>
                            <span className="discipline-tag">{d.tag}</span>
                          </div>
                          <p className="discipline-detail">{d.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights List (for all ventures) */}
                {!venture.disciplines && venture.highlights && (
                  <div className="venture-highlights-box">
                    <span className="venture-subheading">Core Focus Areas:</span>
                    <ul className="venture-highlights-list">
                      {venture.highlights.map((item, i) => (
                        <li key={i} className="venture-highlight-item">
                          <CheckCircle2
                            size={14}
                            className="venture-highlight-check"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer with Metrics & Action Link */}
              <div className="venture-card-footer">
                <div className="venture-metrics-row">
                  {venture.metrics.map((m, i) => (
                    <div key={i} className="venture-metric-chip">
                      <span className="metric-chip-label">{m.label}:</span>
                      <span className="metric-chip-value">{m.value}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={venture.linkTarget}
                  target={venture.linkTarget.startsWith('http') ? '_blank' : undefined}
                  rel={venture.linkTarget.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="venture-action-btn"
                  title={`Chat with Akshit on WhatsApp about ${venture.name}`}
                >
                  <MessageCircle size={14} className="icon-whatsapp" aria-hidden="true" />
                  <span>{venture.linkText}</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
