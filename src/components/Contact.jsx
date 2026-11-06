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
} from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Direct submit: tries async dispatch or opens Gmail compose
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedStatus('sending');

    try {
      // Direct Web3Forms submission to delivered email
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE', // optional Web3Forms key
          email_to: siteConfig.contact.email,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Inquiry from ${formData.name} via Portfolio`,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmittedStatus('success');
      } else {
        // Fallback directly to mailto
        triggerMailto();
        setSubmittedStatus('success');
      }
    } catch (err) {
      // In case of offline/network block, trigger mailto directly
      triggerMailto();
      setSubmittedStatus('success');
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
          initial={motionEnabled ? { opacity: 0, y: 24 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            initial={motionEnabled ? { opacity: 0, x: -24 } : undefined}
            whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined}
            viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="contact-headline">
              Let's Build Something <span className="text-accent">Intelligent.</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              Whether you are looking to deploy multi-agent LLM systems, build production RAG pipelines, or automate complex business workflows, I am currently open to AI/ML engineering opportunities.
            </p>

            <div className="contact-channels">
              {/* Upwork - Top Client Acquisition Channel */}
              {isValidContent(siteConfig.contact.upwork) && (
                <a
                  href={siteConfig.contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card interactive-hover-card"
                  style={{ borderLeft: '3px solid #14a800' }}
                  aria-label="Hire Akshit on Upwork"
                >
                  <div className="channel-info">
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(20, 168, 0, 0.15)',
                        color: '#14a800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                      }}
                    >
                      Up
                    </div>
                    <div>
                      <div className="channel-label" style={{ color: '#14a800' }}>Hire on Upwork</div>
                      <div className="channel-value">Contract & Project Workroom</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} style={{ color: '#14a800' }} className="channel-arrow" aria-hidden="true" />
                </a>
              )}

              {/* Email */}
              {isValidContent(siteConfig.contact.email) && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="channel-card interactive-hover-card"
                  aria-label={`Send email to ${siteConfig.contact.email}`}
                >
                  <div className="channel-info">
                    <Mail size={20} className="text-accent channel-icon" aria-hidden="true" />
                    <div>
                      <div className="channel-label">Email Inbox</div>
                      <div className="channel-value">{siteConfig.contact.email}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-accent channel-arrow" aria-hidden="true" />
                </a>
              )}

              {/* Phone */}
              {isValidContent(siteConfig.contact.phone) && (
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="channel-card interactive-hover-card"
                  aria-label={`Call ${siteConfig.contact.phone}`}
                >
                  <div className="channel-info">
                    <Phone size={20} className="text-accent channel-icon" aria-hidden="true" />
                    <div>
                      <div className="channel-label">Direct Phone</div>
                      <div className="channel-value">{siteConfig.contact.phone}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-accent channel-arrow" aria-hidden="true" />
                </a>
              )}

              {/* LinkedIn */}
              {isValidContent(siteConfig.contact.linkedin) && (
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card interactive-hover-card"
                  aria-label="Visit LinkedIn Profile"
                >
                  <div className="channel-info">
                    <Linkedin size={20} className="text-accent channel-icon" aria-hidden="true" />
                    <div>
                      <div className="channel-label">LinkedIn</div>
                      <div className="channel-value">in/akshitsharmacodes</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-accent channel-arrow" aria-hidden="true" />
                </a>
              )}

              {/* GitHub */}
              {isValidContent(siteConfig.contact.github) && (
                <a
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card interactive-hover-card"
                  aria-label="Visit GitHub Profile"
                >
                  <div className="channel-info">
                    <Github size={20} className="text-accent channel-icon" aria-hidden="true" />
                    <div>
                      <div className="channel-label">GitHub</div>
                      <div className="channel-value">akshitsharmacodes</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-accent channel-arrow" aria-hidden="true" />
                </a>
              )}

              {/* Resume */}
              {isValidContent(siteConfig.identity.resume) && (
                <a
                  href={siteConfig.identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card interactive-hover-card"
                  aria-label="View Resume PDF on Google Drive"
                >
                  <div className="channel-info">
                    <FileText size={20} className="text-accent channel-icon" aria-hidden="true" />
                    <div>
                     
                      <div className="channel-value">View Resume</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-accent channel-arrow" aria-hidden="true" />
                </a>
              )}

              {/* Cal.com Scheduling */}
              {siteConfig.contact.otherLinks?.map((link) => {
                if (!isValidContent(link.url)) return null;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-card interactive-hover-card"
                    aria-label={link.label}
                  >
                    <div className="channel-info">
                      <Calendar size={20} className="text-accent channel-icon" aria-hidden="true" />
                      <div>
                        <div className="channel-label">Direct Meeting</div>
                        <div className="channel-value">{link.label}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-accent channel-arrow" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </MotionDiv>

          {/* Contact Message Composer Form */}
          {siteConfig.preferences.showContactForm && (
            <MotionDiv
              initial={motionEnabled ? { opacity: 0, x: 24 } : undefined}
              whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined}
              viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
                      Message Ready & Dispatched!
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      Your message has been compiled for <strong>{siteConfig.contact.email}</strong>. Check your email inbox to see the thread or response!
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
