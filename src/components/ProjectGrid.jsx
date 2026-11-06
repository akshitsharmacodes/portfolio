import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectGrid({ projects, onSelectProject, motionEnabled = true }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract categories dynamically
  const categories = useMemo(() => {
    const cats = ['All'];
    projects.forEach((p) => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, [projects]);

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="work" aria-label="Selected Projects">
      <div className="container">
        {/* Section Header with Scroll Animation */}
        <MotionDiv
          initial={motionEnabled ? { opacity: 0, y: 28 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-meta">
            <span className="section-num">01</span>
            <span className="section-tag">Featured Engineering</span>
          </div>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-desc" style={{ marginBottom: '32px' }}>
            Production AI systems, multi-agent evaluation pipelines and high-throughput data architectures built for measurable real-world outcomes.
          </p>
        </MotionDiv>

        {/* Filter and Search Controls */}
        <MotionDiv
          className="work-controls"
          initial={motionEnabled ? { opacity: 0, y: 20 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="category-filter-list" role="tablist" aria-label="Project category filter">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" aria-hidden="true" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by title, stack or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter projects by search query"
            />
          </div>
        </MotionDiv>

        {/* Projects Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                motionEnabled={motionEnabled}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '16px' }}>
              No projects found matching "{searchQuery}" in category "{selectedCategory}".
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
