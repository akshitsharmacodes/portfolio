import React, { useRef } from 'react';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { WorkCard } from './ServicePage';
import { projects } from '../data/projects';
import gsap from 'gsap';
import { useGsapContext } from '../hooks/useScrollAnimation';

export default function WorkPage({ app }) {
  const gridRef = useRef(null);

  useGsapContext(
    gridRef,
    (ctx, mm) => {
      mm.add('(min-width: 769px)', () => {
        gsap.from('.work-card', {
          y: 28,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        });
      });

      mm.add('(max-width: 768px)', () => {
        gsap.from('.work-card', {
          y: 16,
          opacity: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 90%',
          },
        });
      });
    },
    [],
    app.motionEnabled
  );

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
        <div ref={gridRef} className="container work-grid">
          {projects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </div>
      </section>
      <CtaBand onOpenCalModal={app.openCalModal} />
    </>
  );
}
