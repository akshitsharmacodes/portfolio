import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import SectionHeader from './SectionHeader';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollViewportEarly, fadeInUpVariant, bentoColumnIndex } from '../config/motion';

export default function ProjectGrid({ projects, onSelectProject, motionEnabled = true }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories with counts, so each filter shows what it will return
  const categories = useMemo(() => {
    const counts = new Map([['All', projects.length]]);
    projects.forEach((p) => {
      if (p.category) counts.set(p.category, (counts.get(p.category) || 0) + 1);
    });
    return [...counts.entries()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.tools.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="work" aria-label="Selected Projects">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="Featured Engineering"
          title="Selected Work"
          description="Production AI systems, multi-agent evaluation pipelines and high-throughput data architectures built for measurable real-world outcomes."
        />

        {/* Filter and Search Controls */}
        <MotionDiv
          className="work-controls"
          variants={motionEnabled ? fadeInUpVariant : undefined}
          custom={0.05}
          initial={motionEnabled ? 'hidden' : undefined}
          whileInView={motionEnabled ? 'visible' : undefined}
          viewport={motionEnabled ? scrollViewportEarly : undefined}
        >
          <div className="category-filter-list" role="group" aria-label="Filter projects by category">
            {categories.map(([category, count]) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  className={`filter-btn${isActive ? ' active' : ''}${motionEnabled ? ' has-pill' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {/* Shared-layout pill slides between filters */}
                  {isActive && motionEnabled && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="filter-label">{category}</span>
                  <span className="filter-count" aria-hidden="true">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="search-input-wrapper">
            <Search size={15} className="search-icon" aria-hidden="true" />
            <input
              type="search"
              className="search-input"
              placeholder="Search title, stack or keyword…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects by title, stack or keyword"
            />
          </div>
        </MotionDiv>

        {/* Projects: bento layout picks spans from the item count, so no card is ever orphaned */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid bento-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                delayIndex={bentoColumnIndex(index, filteredProjects.length)}
                motionEnabled={motionEnabled}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          <div className="projects-empty" role="status">
            <p>
              0 results for “{searchQuery}” in {selectedCategory === 'All' ? 'all categories' : selectedCategory}.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
