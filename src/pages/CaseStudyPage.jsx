import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import ProjectGlyph, { PROJECT_VISUALS } from '../components/ProjectGlyph';
import { WorkCard } from './ServicePage';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { isValidContent } from '../config/site';
import NotFoundPage from './NotFoundPage';

/** Case study: problem → how it was built → stack and outcome (only facts from projects.js) */
export default function CaseStudyPage({ app }) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  if (!project) return <NotFoundPage />;
  const v = PROJECT_VISUALS[project.id] || { eyebrow: project.category, glyph: 'pipeline' };
  const usedIn = services.filter((s) => s.relatedWork.includes(project.id));
  const more = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          ['Home', '/'],
          ['Work', '/work'],
          [project.title, `/work/${project.id}`],
        ]}
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        intro={project.summary}
        aside={
          <div className="cs-art" aria-hidden="true">
            <span className="cs-art-eyebrow">{v.eyebrow}</span>
            <ProjectGlyph kind={v.glyph} />
          </div>
        }
      >
        {isValidContent(project.liveUrl) && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <ExternalLink size={15} aria-hidden="true" />
            <span>View live</span>
          </a>
        )}
        {isValidContent(project.sourceUrl) && (
          <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <Github size={15} aria-hidden="true" />
            <span>Source code</span>
          </a>
        )}
      </PageHero>

      <section className="section-padding cs-body">
        <div className="container cs-cols">
          <div className="cs-main">
            <h2 className="svc-h2">The challenge and what we built</h2>
            <p className="cs-text">{project.description}</p>

            {project.architecture?.length > 0 && (
              <>
                <h2 className="svc-h2">How it works</h2>
                <ol className="cs-steps">
                  {project.architecture.map((a) => (
                    <li key={a.step}>
                      <span className="price-num">{a.step}</span>
                      <div>
                        <b>{a.name}</b>
                        <p>{a.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>

          <aside className="cs-side">
            <dl className="cs-facts">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{project.category}</dd>
              </div>
              {v.eyebrow && (
                <div>
                  <dt>Highlight</dt>
                  <dd>{v.eyebrow}</dd>
                </div>
              )}
            </dl>
            <h3 className="svc-h3">Stack</h3>
            <div className="svc-stack">
              {project.tools.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
            {usedIn.length > 0 && (
              <>
                <h3 className="svc-h3">Related services</h3>
                <ul className="cs-services">
                  {usedIn.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`}>
                        {s.name} <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="more-work">
        <div className="container">
          <h2 id="more-work" className="svc-h2">
            More case studies
          </h2>
          <div className="work-grid">
            {more.map((p) => (
              <WorkCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand onOpenCalModal={app.openCalModal} />
    </>
  );
}
