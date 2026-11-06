import React, { useState } from 'react';
import { siteConfig, isValidContent } from '../config/site';
import {
  Mail,
  Phone,
  Linkedin,
  Calendar,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  Github,
  FileText,
  Inbox,
  MessageCircle,
  MapPin,
  Code2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollViewportEarly, fadeInLeftVariant, fadeInRightVariant } from '../config/motion';
import SectionHeader from './SectionHeader';
import SplitReveal from './SplitReveal';
import MagneticButton from './MagneticButton';

const SCOPE_CHIPS = [
  { id: 'agents', label: 'AI Agents / LangGraph', prompt: 'I want to build an autonomous AI agent system to...' },
  { id: 'rag', label: 'Enterprise RAG', prompt: 'We need a low-latency semantic search & RAG retrieval pipeline for...' },
  { id: 'backend', label: 'FastAPI Backend', prompt: 'We are looking to develop/scale a production FastAPI/Django REST backend for...' },
  { id: 'consulting', label: 'Tech Consultation', prompt: 'I would like technical advisory on system design and AI feasibility for...' },
];

export default function Contact({ motionEnabled = true, onOpenCalModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [selectedScope, setSelectedScope] = useState(null);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(null); // 'sending' | 'success' | null

  const handleSelectScope = (chip) => {
    if (selectedScope === chip.id) {
      setSelectedScope(null);
      setFormData((prev) => ({
        ...prev,
        subject: '',
      }));
      return;
    }
    setSelectedScope(chip.id);
    setFormData((prev) => ({
      ...prev,
      subject: `[${chip.label}] Project Inquiry`,
      message: prev.message.trim() ? prev.message : chip.prompt,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please include a message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Direct submit: sends message via Web3Forms API to akshitsharmacodes@gmail.com
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedStatus('sending');

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      siteConfig.contact.web3formsKey ||
      '4adaa253-515d-4e65-a0df-ea4f4d7a2041';

    try {
      const submission = new FormData();
      submission.append('access_key', accessKey);
      submission.append('name', formData.name);
      submission.append('email', formData.email);
      submission.append('from_name', formData.name);
      submission.append('subject', formData.subject || `Inquiry from ${formData.name} via Portfolio`);
      submission.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submission,
      });

      const data = await response.json();

      if (data.success) {
        setSubmittedStatus('success');
      } else {
        // Fallback directly to mailto
        triggerMailto();
        setSubmittedStatus('fallback');
      }
    } catch (err) {
      // In case of offline/network block, trigger mailto directly
      triggerMailto();
      setSubmittedStatus('fallback');
    }
  };

  const triggerMailto = () => {
    const subject = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name} via Portfolio`
    );
    const body = encodeURIComponent(
      `Hello Akshit,\n\nFrom: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}\n`
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyDraft = () => {
    if (!validate()) return;
    const text = `To: ${siteConfig.contact.email}\nSubject: ${
      formData.subject || `Inquiry from ${formData.name}`
    }\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="contact" aria-label="Contact Akshit Sharma">
      <div className="container">
        <SectionHeader motionEnabled={motionEnabled} tag="Direct Channels" compact />

        <div className="contact-grid">
          {/* Contact Information & Channels */}
          <MotionDiv
            className="contact-info-column"
            variants={motionEnabled ? fadeInLeftVariant : undefined}
            initial={motionEnabled ? "hidden" : undefined}
            whileInView={motionEnabled ? "visible" : undefined}
            viewport={motionEnabled ? scrollViewportEarly : undefined}
          >
            <div className="contact-info-header">
              <div className="contact-status-badge">
                <span className="contact-status-dot" aria-hidden="true"></span>
                <span>Available for Immediate Contracts & Full-time Roles</span>
              </div>
              <SplitReveal as="h2" className="contact-headline" motionEnabled={motionEnabled} inView stagger={0.07}>
                Let's Build Something <span className="text-accent">Intelligent.</span>
              </SplitReveal>
              <p className="contact-intro-text">
                Whether deploying multi-agent LLM systems, production RAG pipelines with LangGraph & ChromaDB, or high-throughput async FastAPI services, let's connect directly.
              </p>
            </div>

            {/* Direct Priority Action Cards */}
            <div className="contact-priority-actions">
              {/* WhatsApp DM */}
              {isValidContent(siteConfig.contact.whatsapp) && (
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-card whatsapp-card"
                  aria-label="Direct WhatsApp Message to Akshit Sharma"
                >
                  <div className="action-card-icon whatsapp-icon">
                    <MessageCircle size={18} aria-hidden="true" />
                  </div>
                  <div className="action-card-text">
                    <div className="action-card-tag">Fastest Response</div>
                    <div className="action-card-title">WhatsApp DM</div>
                    <div className="action-card-sub">+91 7888327471</div>
                  </div>
                  <ArrowUpRight size={18} className="action-card-arrow" aria-hidden="true" />
                </a>
              )}

              {/* Cal.com Scheduling */}
              <a
                href="https://cal.com/akshitsharmacodes"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (onOpenCalModal) {
                    e.preventDefault();
                    onOpenCalModal();
                  }
                }}
                className="contact-action-card cal-card"
                aria-label="Book a consultation with Akshit Sharma"
              >
                <div className="action-card-icon cal-icon" aria-hidden="true">
                  <Calendar size={18} />
                </div>
                <div className="action-card-text">
                  <div className="action-card-tag">15-Min Discovery</div>
                  <div className="action-card-title">Book a 1:1 Call</div>
                  <div className="action-card-sub">Instant Google Meet invite</div>
                </div>
                <ArrowUpRight size={18} className="action-card-arrow" aria-hidden="true" />
              </a>
            </div>

            {/* Direct Channels Compact Grid */}
            <div className="contact-details-grid">
              {isValidContent(siteConfig.contact.email) && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="contact-mini-item"
                  aria-label={`Send email to ${siteConfig.contact.email}`}
                >
                  <Mail size={16} className="text-accent flex-shrink-0" aria-hidden="true" />
                  <div className="mini-item-content">
                    <span className="mini-item-label">Direct Email</span>
                    <span className="mini-item-val">{siteConfig.contact.email}</span>
                  </div>
                </a>
              )}

              {isValidContent(siteConfig.contact.phone) && (
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="contact-mini-item"
                  aria-label={`Call ${siteConfig.contact.phone}`}
                >
                  <Phone size={16} className="text-accent flex-shrink-0" aria-hidden="true" />
                  <div className="mini-item-content">
                    <span className="mini-item-label">Direct Phone</span>
                    <span className="mini-item-val">{siteConfig.contact.phone}</span>
                  </div>
                </a>
              )}

              <div className="contact-mini-item">
                <MapPin size={16} className="text-accent flex-shrink-0" aria-hidden="true" />
                <div className="mini-item-content">
                  <span className="mini-item-label">Location Base</span>
                  <span className="mini-item-val">{siteConfig.identity.location} · Remote</span>
                </div>
              </div>
            </div>

            {/* Professional Profiles Dock */}
            <div className="contact-social-dock">
              <span className="contact-dock-label">Profiles:</span>
              <div className="contact-dock-pills">
                {isValidContent(siteConfig.contact.linkedin) && (
                  <a
                    href={siteConfig.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-dock-pill"
                    aria-label="Visit LinkedIn Profile"
                  >
                    <Linkedin size={14} className="text-accent" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {isValidContent(siteConfig.contact.github) && (
                  <a
                    href={siteConfig.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-dock-pill"
                    aria-label="Visit GitHub Profile"
                  >
                    <Github size={14} className="text-accent" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                )}

                {isValidContent(siteConfig.contact.leetcode) && (
                  <a
                    href={siteConfig.contact.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-dock-pill"
                    aria-label="Visit LeetCode Profile"
                  >
                    <Code2 size={14} className="text-accent" aria-hidden="true" />
                    <span>LeetCode</span>
                  </a>
                )}

                {isValidContent(siteConfig.identity.resume) && (
                  <a
                    href={siteConfig.identity.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-dock-pill"
                    aria-label="View Resume PDF"
                  >
                    <FileText size={14} className="text-accent" aria-hidden="true" />
                    <span>Resume PDF</span>
                  </a>
                )}
              </div>
            </div>
          </MotionDiv>

          {/* Contact Message Composer Form */}
          {siteConfig.preferences.showContactForm && (
            <MotionDiv
              variants={motionEnabled ? fadeInRightVariant : undefined}
              initial={motionEnabled ? "hidden" : undefined}
              whileInView={motionEnabled ? "visible" : undefined}
              viewport={motionEnabled ? scrollViewportEarly : undefined}
            >
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-header">
                  <h3 className="form-title">Send a Message</h3>
                  <div className="contact-inbox-pill">
                    <Inbox size={13} className="text-accent" aria-hidden="true" />
                    <span>Delivered to: <strong>akshitsharmacodes@gmail.com</strong></span>
                  </div>
                </div>

                {submittedStatus === 'success' ? (
                  <div
                    style={{
                      padding: '24px',
                      background: 'var(--signal-soft)',
                      border: '1px solid var(--signal-border)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                    }}
                  >
                    <Check size={32} style={{ color: 'var(--signal)', margin: '0 auto 12px' }} aria-hidden="true" />
                    <h4 style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '6px' }}>
                      Message Sent Successfully!
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      Thank you, <strong>{formData.name || 'there'}</strong>! Your message has been delivered directly to <strong>{siteConfig.contact.email}</strong>. I will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setSubmittedStatus(null);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : submittedStatus === 'fallback' ? (
                  <div
                    style={{
                      padding: '24px',
                      background: 'rgba(227, 43, 60, 0.08)',
                      border: '1px solid rgba(227, 43, 60, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                    }}
                  >
                    <Mail size={32} style={{ color: 'var(--accent)', margin: '0 auto 12px' }} />
                    <h4 style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: '6px' }}>
                      Opening in Email Application...
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      We opened your email client to send to <strong>{siteConfig.contact.email}</strong>. If your mail client did not open automatically, you can send via Gmail webmail or copy the draft:
                    </p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.contact.email}&su=${encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Hello Akshit,\n\nFrom: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                      >
                        Open in Gmail Webmail
                      </a>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCopyDraft}
                        style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                      >
                        {copied ? 'Copied!' : 'Copy Draft'}
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                      onClick={() => setSubmittedStatus(null)}
                    >
                      Return to Form
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="contact-scope-selector">
                      <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
                        Project Scope (Tap to pre-fill inquiry)
                      </label>
                      <div className="scope-chips-row">
                        {SCOPE_CHIPS.map((chip) => (
                          <button
                            key={chip.id}
                            type="button"
                            className={`scope-chip-btn ${selectedScope === chip.id ? 'active' : ''}`}
                            onClick={() => handleSelectScope(chip)}
                          >
                            <span>{chip.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-input"
                        placeholder="e.g. sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-subject" className="form-label">
                        Subject (Optional)
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        className="form-input"
                        placeholder="e.g. AI Engineering Collaboration"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message" className="form-label">
                        Project or Opportunity Details *
                      </label>
                      <textarea
                        id="contact-message"
                        className="form-textarea"
                        placeholder="Describe your requirements, timeline, or engineering role..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                      {errors.message && <span className="form-error">{errors.message}</span>}
                    </div>

                    <div className="form-actions">
                      <MagneticButton
                        as="button"
                        motionEnabled={motionEnabled}
                        strength={0.18}
                        type="submit"
                        className="btn btn-primary form-submit"
                        disabled={submittedStatus === 'sending'}
                      >
                        <Send size={16} aria-hidden="true" />
                        <span>{submittedStatus === 'sending' ? 'Sending…' : 'Send Message'}</span>
                      </MagneticButton>

                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCopyDraft}
                        title="Copy drafted message to clipboard"
                      >
                        {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                        <span>{copied ? 'Copied!' : 'Copy Draft'}</span>
                      </button>
                    </div>

                    <p className="form-feedback-note">
                      Your message is delivered straight to <strong>{siteConfig.contact.email}</strong>.
                    </p>
                  </>
                )}
              </form>
            </MotionDiv>
          )}
        </div>
      </div>
    </section>
  );
}
