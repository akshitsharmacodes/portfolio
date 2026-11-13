import React from 'react';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { WorkCard } from './ServicePage';
import { projects } from '../data/projects';

export default function WorkPage({ app }) {
  return (
    <>
      <PageHero
        crumbs={[
          ['Home', '/'],
          ['Work', '/work'],
        ]}
        eyebrow="Case studies"
        title="Work we've shipped"
        intro="Production AI agents, multi-agent systems, AI-powered platforms, hackathon-winning software and computer vision. Each case study covers the problem, how it was built and the outcome."
      />
      <section className="section-padding">
        <div className="container work-grid">
          {projects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </div>
      </section>
      <CtaBand onOpenCalModal={app.openCalModal} />
    </>
  );
}
