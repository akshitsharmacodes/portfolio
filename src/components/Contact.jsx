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
  ArrowRight,
  Github,
  FileText,
  MessageCircle,
  Code2,
  Briefcase,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollViewportEarly, fadeInUpVariant } from '../config/motion';
import SectionHeader from './SectionHeader';

// Topic chips: pick one to set the email subject and a helpful placeholder
const TOPICS = [
  { id: 'agents', label: 'AI agents', placeholder: 'What should the agent automate, and where does it plug in?' },
  { id: 'rag', label: 'RAG / search', placeholder: 'What data should it search, and who will use it?' },
  { id: 'backend', label: 'Backend / API', placeholder: 'What are you building, and what stack are you on?' },
  { id: 'consulting', label: 'Consulting', placeholder: 'What decision or problem would you like a second opinion on?' },
];

const tidyUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').split('?')[0];

/**
 * One uniform row per channel: icon · label · value · action.
 * Rows are links (or a button for the Cal.com modal); the email row adds a copy button.
 */
function ChannelRow({ icon: Icon, label, value, href, external, onClick, action = 'external', children }) {
  const ActionIcon = action === 'internal' ? ArrowRight : ArrowUpRight;
  const content = (
    <>
      <span className="ct-row-icon" aria-hidden="true">
        <Icon size={15} />
      </span>
      <span className="ct-row-label">{label}</span>
      <span className="ct-row-value">{value}</span>
      {!children && <ActionIcon size={15} className="ct-row-action" aria-hidden="true" />}
    </>
  );

  return (
    <li className={`ct-row${children ? ' has-extra' : ''}`}>
      {onClick ? (
        <button type="button" className="ct-row-main" onClick={onClick}>
          {content}
        </button>
      ) : (
        <a
          className="ct-row-main"
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </a>
      )}
      {children}
    </li>
  );
}

export default function Contact({ motionEnabled = true, onOpenCalModal }) {
  const { contact, identity } = siteConfig;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [topic, setTopic] = useState(null);
  const [errors, setErrors] = useState({});
  const [emailCopied, setEmailCopied] = useState(false);
  const [draftCopied, setDraftCopied] = useState(false);
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'fallback' | null

  const activeTopic = TOPICS.find((t) => t.id === topic);
  const subject = activeTopic
    ? `[${activeTopic.label}] Project inquiry from ${formData.name || 'portfolio'}`
    : `Inquiry from ${formData.name || 'portfolio'}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please add your name.';
    if (!formData.email.trim()) errs.email = 'Please add your email.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'That email doesn’t look right.';
    if (!formData.message.trim()) errs.message = 'Please add a short message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const mailBody = () =>
    `Hello Akshit,\n\nFrom: ${formData.name} (${formData.email})\n${activeTopic ? `Topic: ${activeTopic.label}\n` : ''}\n${formData.message}\n`;

  const triggerMailto = () => {
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody())}`;
  };

  // Sends via Web3Forms; falls back to the visitor's mail app if the request fails
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || contact.web3formsKey || '4adaa253-515d-4e65-a0df-ea4f4d7a2041';

    try {
      const submission = new FormData();
      submission.append('access_key', accessKey);
      submission.append('name', formData.name);
      submission.append('email', formData.email);
      submission.append('from_name', formData.name);
      submission.append('subject', subject);
      submission.append('message', activeTopic ? `Topic: ${activeTopic.label}\n\n${formData.message}` : formData.message);

      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: submission });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
      } else {
        triggerMailto();
        setStatus('fallback');
      }
    } catch {
      triggerMailto();
      setStatus('fallback');
    }
  };

  const copyDraft = () => {
    const text = `To: ${contact.email}\nSubject: ${subject}\n\n${mailBody()}`;
    navigator.clipboard.writeText(text).then(() => {
      setDraftCopied(true);
      setTimeout(() => setDraftCopied(false), 2500);
    });
  };

  const resetForm = () => {
    setStatus(null);
    setTopic(null);
    setFormData({ name: '', email: '', message: '' });
  };

  const field = (key) => ({
    value: formData[key],
    onChange: (e) => setFormData({ ...formData, [key]: e.target.value }),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `ct-err-${key}` : undefined,
  });

  const Reveal = motionEnabled ? motion.div : 'div';
  const revealProps = (delay = 0) =>
    motionEnabled
      ? { variants: fadeInUpVariant, custom: delay, initial: 'hidden', whileInView: 'visible', viewport: scrollViewportEarly }
      : {};

  const direct = [
    {
      key: 'call',
      icon: Calendar,
      label: 'Book a call',
      value: '15-min intro on Google Meet',
      action: 'internal',
      onClick: onOpenCalModal ? (e) => onOpenCalModal(e.currentTarget) : undefined,
      href: 'https://cal.com/akshitsharmacodes',
      external: true,
    },
    isValidContent(contact.whatsapp) && {
      key: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contact.phone || 'Message me',
      href: contact.whatsapp,
      external: true,
    },
    isValidContent(contact.email) && { key: 'email', icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    isValidContent(contact.phone) && {
      key: 'phone',
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, '')}`,
    },
  ].filter(Boolean);

  const profiles = [
    isValidContent(contact.linkedin) && { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', value: tidyUrl(contact.linkedin), href: contact.linkedin },
    isValidContent(contact.github) && { key: 'github', icon: Github, label: 'GitHub', value: tidyUrl(contact.github), href: contact.github },
    isValidContent(contact.leetcode) && { key: 'leetcode', icon: Code2, label: 'LeetCode', value: tidyUrl(contact.leetcode), href: contact.leetcode },
    isValidContent(contact.upwork) && { key: 'upwork', icon: Briefcase, label: 'Upwork', value: 'Hire me on Upwork', href: contact.upwork },
    isValidContent(identity.resume) && { key: 'resume', icon: FileText, label: 'Resume', value: 'View on Google Drive', href: identity.resume },
  ]
    .filter(Boolean)
    .map((p) => ({ ...p, external: true }));

  return (
    <section className="section-padding" id="contact" aria-label="Contact Akshit Sharma">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="Contact"
          title="Let’s build something."
          description="Tell me what you’re working on, or pick the channel that suits you. I usually reply within 24 hours."
        />

        <div className="ct-grid">
          {/* Channels: one format for every row */}
          <Reveal className="ct-channels" {...revealProps(0)}>
            <div className="ct-group">
              <h3 className="ct-group-label">Direct</h3>
              <ul className="ct-list">
                {direct.map(({ key, ...row }) =>
                  key === 'email' ? (
                    <ChannelRow key={key} {...row}>
                      <button
                        type="button"
                        className="ct-row-copy"
                        onClick={copyEmail}
                        aria-label={emailCopied ? 'Email copied' : 'Copy email address'}
                        title={emailCopied ? 'Copied' : 'Copy email'}
                      >
                        {emailCopied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                      </button>
                    </ChannelRow>
                  ) : (
                    <ChannelRow key={key} {...row} />
                  )
                )}
              </ul>
            </div>

            <div className="ct-group">
              <h3 className="ct-group-label">Profiles</h3>
              <ul className="ct-list">
                {profiles.map(({ key, ...row }) => (
                  <ChannelRow key={key} {...row} />
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Message form */}
          {siteConfig.preferences.showContactForm && (
            <Reveal {...revealProps(0.08)}>
              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <h3 className="ct-form-title">Send a message</h3>

                {status === 'success' ? (
                  <div className="ct-state" role="status">
                    <span className="ct-state-icon is-ok"><Check size={18} aria-hidden="true" /></span>
                    <h4>Message sent</h4>
                    <p>Thanks{formData.name ? `, ${formData.name}` : ''}. It’s in my inbox and I’ll get back to you soon.</p>
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                      Send another message
                    </button>
                  </div>
                ) : status === 'fallback' ? (
                  <div className="ct-state" role="status">
                    <span className="ct-state-icon"><Mail size={18} aria-hidden="true" /></span>
                    <h4>Opening your email app</h4>
                    <p>
                      The form couldn’t send right now, so I’ve opened a pre-filled email to {contact.email}. If nothing
                      opened, use Gmail or copy the draft.
                    </p>
                    <div className="ct-state-actions">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Open in Gmail
                      </a>
                      <button type="button" className="btn btn-secondary" onClick={copyDraft}>
                        {draftCopied ? 'Copied' : 'Copy draft'}
                      </button>
                    </div>
                    <button type="button" className="btn-link" onClick={() => setStatus(null)}>
                      Back to the form
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="ct-row-2">
                      <div className="ct-field">
                        <label htmlFor="ct-name">Name</label>
                        <input id="ct-name" type="text" autoComplete="name" placeholder="Your name" {...field('name')} />
                        {errors.name && <span id="ct-err-name" className="ct-error">{errors.name}</span>}
                      </div>
                      <div className="ct-field">
                        <label htmlFor="ct-email">Email</label>
                        <input id="ct-email" type="email" autoComplete="email" placeholder="you@company.com" {...field('email')} />
                        {errors.email && <span id="ct-err-email" className="ct-error">{errors.email}</span>}
                      </div>
                    </div>

                    <fieldset className="ct-field ct-topics">
                      <legend>What do you need?</legend>
                      <div className="ct-chips">
                        {TOPICS.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            className={`ct-chip${topic === t.id ? ' is-active' : ''}`}
                            aria-pressed={topic === t.id}
                            onClick={() => setTopic(topic === t.id ? null : t.id)}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div className="ct-field">
                      <label htmlFor="ct-message">Message</label>
                      <textarea
                        id="ct-message"
                        rows={5}
                        placeholder={activeTopic ? activeTopic.placeholder : 'A few lines about the project, timeline or role.'}
                        {...field('message')}
                      />
                      {errors.message && <span id="ct-err-message" className="ct-error">{errors.message}</span>}
                    </div>

                    <div className="ct-submit">
                      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                        <Send size={15} aria-hidden="true" />
                        <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
                      </button>
                      <span className="ct-note">Goes straight to my inbox.</span>
                    </div>
                  </>
                )}
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
