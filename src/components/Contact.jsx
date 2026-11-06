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
  Sparkles,
  MessageCircle,
  MapPin,
  Code2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  scrollViewport,
  scrollViewportEarly,
  fadeInUpVariant,
  fadeInLeftVariant,
  fadeInRightVariant,
} from '../config/motion';

export default function Contact({ motionEnabled = true }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(null); // 'sending' | 'success' | null

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
        {/* Section Header */}
        <MotionDiv
          variants={motionEnabled ? fadeInUpVariant : undefined}
          initial={motionEnabled ? "hidden" : undefined}
          whileInView={motionEnabled ? "visible" : undefined}
          viewport={motionEnabled ? scrollViewport : undefined}
        >
          <div className="section-meta">
            <span className="section-num">06</span>
            <span className="section-tag">Direct Channels</span>
          </div>
        </MotionDiv>

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
                <span className="contact-status-dot"></span>
                <span>Available for Immediate Contracts & Full-time Roles</span>
              </div>
              <h2 className="contact-headline">
                Let's Build Something <span className="text-accent">Intelligent.</span>
              </h2>
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
                    <MessageCircle size={18} />
                  </div>
                  <div className="action-card-text">
                    <div className="action-card-tag">Fastest Response</div>
                    <div className="action-card-title">WhatsApp DM</div>
                    <div className="action-card-sub">+91 7888327471</div>
                  </div>
                  <ArrowUpRight size={18} className="action-card-arrow" />
                </a>
              )}

              {/* Hire on Upwork */}
              {isValidContent(siteConfig.contact.upwork) && (
                <a
                  href={siteConfig.contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-card upwork-card"
                  aria-label="Hire Akshit on Upwork"
                >
                  <div className="action-card-icon upwork-icon">
                    Up
                  </div>
                  <div className="action-card-text">
                    <div className="action-card-tag">Milestone Contracts</div>
                    <div className="action-card-title">Hire on Upwork</div>
                    <div className="action-card-sub">Top Rated Profile</div>
                  </div>
                  <ArrowUpRight size={18} className="action-card-arrow" />
                </a>
              )}
            </div>

            {/* Direct Channels Compact Grid */}
            <div className="contact-details-grid">
              {isValidContent(siteConfig.contact.email) && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="contact-mini-item"
                  aria-label={`Send email to ${siteConfig.contact.email}`}
                >
                  <Mail size={16} className="text-accent flex-shrink-0" />
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
                  <Phone size={16} className="text-accent flex-shrink-0" />
                  <div className="mini-item-content">
                    <span className="mini-item-label">Direct Phone</span>
                    <span className="mini-item-val">{siteConfig.contact.phone}</span>
                  </div>
                </a>
              )}

              <a
                href="https://cal.com/akshitsharmacodes"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-mini-item"
                aria-label="Schedule Consultation on Cal.com"
              >
                <Calendar size={16} className="text-accent flex-shrink-0" />
                <div className="mini-item-content">
                  <span className="mini-item-label">Consultation</span>
                  <span className="mini-item-val">Schedule on Cal.com</span>
                </div>
              </a>

              <div className="contact-mini-item">
                <MapPin size={16} className="text-accent flex-shrink-0" />
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
                    <Linkedin size={14} className="text-accent" />
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
                    <Github size={14} className="text-accent" />
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
                    <Code2 size={14} className="text-accent" />
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
                    <FileText size={14} className="text-accent" />
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text)' }}>
                    SEND A MESSAGE
                  </h3>
                  <div className="contact-inbox-pill">
                    <Inbox size={13} className="text-accent" />
                    <span>Delivered to: <strong>akshitsharmacodes@gmail.com</strong></span>
                  </div>
                </div>

                {submittedStatus === 'success' ? (
                  <div
                    style={{
                      padding: '24px',
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                    }}
                  >
                    <Check size={32} style={{ color: '#10b981', margin: '0 auto 12px' }} />
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

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 1, minHeight: '48px' }}
                        disabled={submittedStatus === 'sending'}
                      >
                        <Send size={16} aria-hidden="true" />
                        <span>{submittedStatus === 'sending' ? 'Sending...' : 'Send Message'}</span>
                      </button>

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
                      Submissions deliver directly to <strong>{siteConfig.contact.email}</strong>. You will receive all inquiries in your Gmail inbox.
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
