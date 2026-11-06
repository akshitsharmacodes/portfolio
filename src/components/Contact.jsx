import React, { useState } from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { Mail, Phone, Linkedin, Calendar, Send, Copy, Check, ArrowUpRight } from 'lucide-react';
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
  const [readyToSend, setReadyToSend] = useState(false);

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

  const handleComposeMailto = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name} via Portfolio`
    );
    const body = encodeURIComponent(
      `Hello Akshit,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );

    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    setReadyToSend(true);
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
                      <div className="channel-label">Email</div>
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
              <form className="contact-form" onSubmit={handleComposeMailto} noValidate>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text)' }}>
                  SEND A MESSAGE
                </h3>

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
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    <Send size={16} aria-hidden="true" />
                    <span>Open in Mail Client</span>
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
                  Direct integration: Opens your preferred email application or copies the draft to your clipboard.
                </p>
              </form>
            </MotionDiv>
          )}
        </div>
      </div>
    </section>
  );
}
