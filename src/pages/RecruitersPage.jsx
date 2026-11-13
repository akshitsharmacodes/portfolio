import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, Linkedin, Calendar, Github, Code2, ArrowUpRight, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import { WorkCard } from './ServicePage';
import { projects } from '../data/projects';
import { awardsData } from '../data/experience';
import { siteConfig, isValidContent } from '../config/site';

/**
 * Recruiter / HR view: availability and role fit first, then a scannable resume,
 * proof of skill and fast contact. Linked from the navbar, footer and every resume link.
 */
export default function RecruitersPage({ app }) {
  const { identity, contact, career } = siteConfig;
  const { motionEnabled } = app;

  const contactLinks = [
    isValidContent(identity.resume) && { href: identity.resume, icon: Download, label: 'Download resume (PDF)', primary: true },
    isValidContent(career.interviewUrl) && { href: career.interviewUrl, icon: Calendar, label: 'Schedule an interview' },
    isValidContent(contact.email) && { href: `mailto:${contact.email}`, icon: Mail, label: contact.email, internal: true },
    isValidContent(contact.linkedin) && { href: contact.linkedin, icon: Linkedin, label: 'LinkedIn' },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={[
          ['Home', '/'],
          ['For recruiters', '/recruiters'],
        ]}
        eyebrow="For recruiters & hiring managers"
        title={`${identity.fullName}: AI/ML & Backend Engineer`}
        intro="AI engineer who ships production AI agents, RAG systems and Python backends end to end. Former Gentleman Cadet (OTA Gaya, TES-48), Smart India Hackathon 2025 internal winner, currently AI/ML Developer at LeadManch."
        aside={
          <div className="rec-card">
            <span className="rec-avail">
              <span className="status-dot" aria-hidden="true" /> {career.availability}
            </span>
            <h2 className="rec-card-title">
              <Briefcase size={15} aria-hidden="true" /> Open to roles
            </h2>
            <ul className="rec-chips">
              {career.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <h2 className="rec-card-title">
              <MapPin size={15} aria-hidden="true" /> Work mode
            </h2>
            <ul className="rec-list">
              {career.workModes.map((m) => (
                <li key={m}>
                  <CheckCircle2 size={14} aria-hidden="true" /> {m}
                </li>
              ))}
            </ul>
            <p className="rec-loc">Based in {identity.location}</p>
          </div>
        }
      >
        {contactLinks.map(({ href, icon: Icon, label, primary, internal }) => (
          <a
            key={label}
            href={href}
            className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}
            {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <Icon size={15} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </PageHero>

      <section className="section-padding rec-proof" aria-labelledby="proof-title">
        <div className="container">
          <div className="section-intro-row">
            <div>
              <span className="page-eyebrow">Proof of skill</span>
              <h2 id="proof-title" className="section-title">
                Shipped projects, code and recognition
              </h2>
            </div>
            <div className="rec-profiles">
              {isValidContent(contact.github) && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Github size={15} aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              )}
              {isValidContent(contact.leetcode) && (
                <a href={contact.leetcode} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Code2 size={15} aria-hidden="true" />
                  <span>LeetCode</span>
                </a>
              )}
            </div>
          </div>
          <div className="work-grid">
            {projects.map((p) => (
              <WorkCard key={p.id} project={p} />
            ))}
          </div>
          <ul className="rec-awards">
            {awardsData.slice(0, 5).map((a) => (
              <li key={a.title}>
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>{a.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Experience motionEnabled={motionEnabled} />
      <Skills motionEnabled={motionEnabled} />

      <section className="section-padding rec-contact" aria-labelledby="rec-contact-title">
        <div className="container rec-contact-inner">
          <h2 id="rec-contact-title" className="section-title">
            Let's talk about the role.
          </h2>
          <p className="page-intro">
            Available immediately for full-time roles: remote (India or international), hybrid in Tricity, or relocation.
            Looking for a freelance team instead?{' '}
            <Link to="/" className="inline-link">
              See Gentle Tech Labs
            </Link>
            .
          </p>
          <div className="page-actions">
            {contactLinks.map(({ href, icon: Icon, label, primary, internal }) => (
              <a
                key={label}
                href={href}
                className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}
                {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
                {!internal && !primary && <ArrowUpRight size={13} aria-hidden="true" />}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
