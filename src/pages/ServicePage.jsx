import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Calendar, Check, Clock } from 'lucide-react';
import PageHero from '../components/PageHero';
import Faq from '../components/Faq';
import CtaBand from '../components/CtaBand';
import ProjectGlyph, { PROJECT_VISUALS } from '../components/ProjectGlyph';
import { serviceBySlug, services } from '../data/services';
import { projects } from '../data/projects';
import NotFoundPage from './NotFoundPage';

/** One page per service: who it's for, what's included, stack, price, related work, FAQ */
export default function ServicePage({ app }) {
  const { slug } = useParams();
  const svc = serviceBySlug(slug);
  if (!svc) return <NotFoundPage />;
  const related = svc.relatedWork.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
  const others = services.filter((s) => s.slug !== svc.slug);

  return (
    <>
      <PageHero
        crumbs={[
          ['Home', '/'],
          ['Services', '/#hire-me'],
          [svc.name, `/services/${svc.slug}`],
        ]}
        eyebrow={`Service ${svc.num}`}
        title={svc.title}
        intro={svc.intro}
        aside={
          <div className="svc-price-card">
            <small>Starting from</small>
            <b>{svc.from.inr}</b>
            <span>
              {svc.from.usd} · {svc.from.unit}
            </span>
            <p>
              <Clock size={14} aria-hidden="true" /> {svc.timeline}
            </p>
            <small className="svc-price-note">Fixed quote after a free scoping call.</small>
          </div>
        }
      >
        <button type="button" className="btn btn-primary" onClick={(e) => app.openCalModal(e.currentTarget)}>
          <Calendar size={16} aria-hidden="true" />
          <span>Book a discovery call</span>
        </button>
        <Link to="/pricing" className="btn btn-secondary">
          <span>Compare pricing</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </PageHero>

      <section className="section-padding svc-body">
        <div className="container svc-cols">
          <div>
            <h2 className="svc-h2">Who it's for</h2>
            <ul className="svc-for">
              {svc.forWho.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="svc-h2">What's included</h2>
            <ul className="svc-included">
              {svc.deliverables.map((d) => (
                <li key={d}>
                  <Check size={16} aria-hidden="true" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <h3 className="svc-h3">Tools we use</h3>
            <div className="svc-stack">
              {svc.stack.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding svc-related" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className="svc-h2">
              Related work
            </h2>
            <div className="work-grid">
              {related.map((p) => (
                <WorkCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq items={svc.faqs} title={`${svc.name}: questions clients ask`} />

      <section className="section-padding svc-others" aria-labelledby="others-title">
        <div className="container">
          <h2 id="others-title" className="svc-h2">
            Other services
          </h2>
          <div className="svc-other-list">
            {others.map((o) => (
              <Link key={o.slug} to={`/services/${o.slug}`} className="svc-other">
                <span className="price-num">{o.num}</span>
                <b>{o.name}</b>
                <span>{o.short}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand onOpenCalModal={app.openCalModal} />
    </>
  );
}

/** Compact project card linking to its case study */
export function WorkCard({ project }) {
  const v = PROJECT_VISUALS[project.id] || { eyebrow: project.category, glyph: 'pipeline' };
  return (
    <Link to={`/work/${project.id}`} className="work-card">
      <span className="work-card-art" aria-hidden="true">
        <ProjectGlyph kind={v.glyph} />
      </span>
      <span className="work-card-meta">
        {project.category} · {project.year}
      </span>
      <b className="work-card-title">{project.title}</b>
      <span className="work-card-sum">{project.summary}</span>
      <span className="work-card-cta">
        Read case study <ArrowUpRight size={14} aria-hidden="true" />
      </span>
    </Link>
  );
}
