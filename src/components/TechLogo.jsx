import React, { useState } from 'react';

/**
 * Authentic tech stack logos sourced directly from techicons.dev.
 * Renders the official scalable SVGs with clean sizing, styling, and fallback.
 */

const TECHICONS_MAP = {
  python: '/tech-icons/python.svg',
  fastapi: '/tech-icons/fastapi.svg',
  django: '/tech-icons/django.svg',
  'django rest framework': '/tech-icons/django.svg',
  postgres: '/tech-icons/postgresql.svg',
  postgresql: '/tech-icons/postgresql.svg',
  redis: '/tech-icons/redis.svg',
  docker: '/tech-icons/docker.svg',
  aws: '/tech-icons/aws.svg',
  react: '/tech-icons/react.svg',
  'react.js': '/tech-icons/react.svg',
  next: '/tech-icons/nextjs.svg',
  'next.js': '/tech-icons/nextjs.svg',
  nextjs: '/tech-icons/nextjs.svg',
  tailwind: '/tech-icons/tailwindcss.svg',
  'tailwind css': '/tech-icons/tailwindcss.svg',
  tailwindcss: '/tech-icons/tailwindcss.svg',
  linux: '/tech-icons/linux.svg',
  git: '/tech-icons/git.svg',
  postman: '/tech-icons/postman.svg',
  javascript: '/tech-icons/javascript.svg',
  js: '/tech-icons/javascript.svg',
  sqlite: '/tech-icons/sqlite.svg',
  mysql: '/tech-icons/mysql.svg',
  pytorch: '/tech-icons/pytorch.svg',
  c: '/tech-icons/c.svg',
  'c++': '/tech-icons/cplusplus.svg',
  cpp: '/tech-icons/cplusplus.svg',
  langchain: '/tech-icons/langchain.svg',
  langgraph: '/tech-icons/langgraph.svg',
  chromadb: '/tech-icons/chromadb.svg',
  celery: '/tech-icons/celery.svg',
};

function getIconSrc(name = '') {
  const norm = name.toLowerCase().trim();
  if (TECHICONS_MAP[norm]) return TECHICONS_MAP[norm];

  // Partial matches
  for (const [key, path] of Object.entries(TECHICONS_MAP)) {
    if (norm.includes(key)) return path;
  }
  return null;
}

export function TechLogo({ name, size = 26, className = '', showName = false }) {
  const [hasError, setHasError] = useState(false);
  const src = getIconSrc(name);

  let iconNode = null;

  if (src && !hasError) {
    iconNode = (
      <img
        src={src}
        alt={`${name} icon`}
        width={size}
        height={size}
        className={`tech-icon-img ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          display: 'block',
        }}
        loading="lazy"
        onError={() => setHasError(true)}
      />
    );
  } else {
    // Elegant fallback icon for abstract concepts (RAG, Multi-Agent, Vector Search, etc.)
    iconNode = (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={`tech-icon-fallback ${className}`}
        aria-label={name}
      >
        <rect width="100" height="100" rx="22" fill="#E32B3C" fillOpacity="0.12" stroke="#E32B3C" strokeWidth="3" />
        <circle cx="50" cy="50" r="16" fill="#E32B3C" />
      </svg>
    );
  }

  if (showName) {
    return (
      <span className="tech-badge-inline">
        {iconNode}
        <span>{name}</span>
      </span>
    );
  }

  return iconNode;
}

export default TechLogo;
