import { siteConfig } from './site';
import { services, serviceBySlug, homeFaqs } from '../data/services';
import { projects } from '../data/projects';

/**
 * PER-PAGE SEO REGISTRY
 * One place that defines every route's title, description, canonical URL and JSON-LD.
 * Used by <Seo> at runtime (client-side navigation) and by scripts/prerender.mjs at build
 * time, so the static HTML and the live page always agree.
 */
export const SITE = siteConfig.websiteUrl.replace(/\/$/, '');
const ORG_ID = `${SITE}/#organization`;
const PERSON_ID = `${SITE}/#person`;
const OG_IMAGE = `${SITE}/og-preview.jpg`;
const { agency, identity, contact } = siteConfig;

const sameAs = [contact.linkedin, contact.github, contact.leetcode, contact.upwork, 'https://cal.com/akshitsharmacodes'].filter(
  (u) => u && !String(u).startsWith('[PLACEHOLDER')
);

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: identity.fullName,
  url: `${SITE}/recruiters`,
  image: OG_IMAGE,
  jobTitle: 'AI Engineer & Founder, Gentle Tech Labs',
  worksFor: { '@id': ORG_ID },
  address: { '@type': 'PostalAddress', addressLocality: 'Chandigarh', addressCountry: 'IN' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Amity University, Mohali' },
    { '@type': 'EducationalOrganization', name: 'Officers Training Academy, Gaya' },
  ],
  knowsAbout: ['AI agents', 'Chatbots', 'Retrieval-augmented generation', 'LangGraph', 'LangChain', 'Python', 'FastAPI', 'Django', 'React', 'SEO', 'Answer engine optimization'],
  sameAs,
};

const organization = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: agency.name,
  url: `${SITE}/`,
  logo: `${SITE}/icon-512.png`,
  image: OG_IMAGE,
  description: agency.heroLine,
  founder: { '@id': PERSON_ID },
  email: contact.email,
  telephone: contact.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Chandigarh', addressRegion: 'Chandigarh', addressCountry: 'IN' },
  areaServed: ['IN', 'Worldwide'],
  priceRange: '₹₹',
  sameAs,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${agency.name} services`,
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, url: `${SITE}/services/${s.slug}` },
    })),
  },
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: `${SITE}/`,
  name: agency.name,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
};

const faqPage = (faqs, url) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE}${path}`,
  })),
});

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes });

/** Every route the site serves (used by the pre-renderer and the sitemap) */
export const ROUTES = [
  '/',
  ...services.map((s) => `/services/${s.slug}`),
  '/work',
  ...projects.map((p) => `/work/${p.id}`),
  '/pricing',
  '/about',
  '/contact',
  '/recruiters',
];

/** SEO for a path: { title, description, canonical, jsonLd } */
export function seoFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const canonical = `${SITE}${path === '/' ? '/' : path}`;

  if (path === '/') {
    return {
      title: `${agency.name} | AI Agents, Web Development, SEO & AEO Studio`,
      description:
        'Gentle Tech Labs builds AI agents and chatbots, premium websites, SEO and AI-search (AEO) visibility for businesses in India and worldwide. Founder-led by AI engineer Akshit Sharma.',
      canonical,
      jsonLd: graph(website, organization, person, faqPage(homeFaqs, canonical)),
    };
  }

  const svc = path.startsWith('/services/') && serviceBySlug(path.split('/')[2]);
  if (svc) {
    return {
      title: svc.metaTitle,
      description: svc.metaDescription,
      canonical,
      jsonLd: graph(
        {
          '@type': 'Service',
          '@id': `${canonical}#service`,
          name: svc.title,
          serviceType: svc.name,
          description: svc.intro,
          url: canonical,
          provider: { '@id': ORG_ID },
          areaServed: ['IN', 'Worldwide'],
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: svc.from.inr.replace(/[^\d]/g, ''),
            description: `Starting from ${svc.from.inr} / ${svc.from.usd} ${svc.from.unit}`,
          },
        },
        faqPage(svc.faqs, canonical),
        breadcrumbs([
          ['Home', '/'],
          ['Services', `/services/${svc.slug}`],
          [svc.name, `/services/${svc.slug}`],
        ]),
        organization
      ),
    };
  }

  if (path === '/work') {
    return {
      title: `Case Studies: AI Agents, RAG & Web Projects | ${agency.name}`,
      description:
        'Case studies from Gentle Tech Labs: autonomous SRE agents, multi-agent hiring tools, AI content platforms, hackathon-winning systems and computer vision.',
      canonical,
      jsonLd: graph(
        {
          '@type': 'CollectionPage',
          '@id': `${canonical}#page`,
          name: 'Case studies',
          url: canonical,
          hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: `${SITE}/work/${p.id}` })),
        },
        breadcrumbs([
          ['Home', '/'],
          ['Work', '/work'],
        ])
      ),
    };
  }

  const proj = path.startsWith('/work/') && projects.find((p) => p.id === path.split('/')[2]);
  if (proj) {
    return {
      title: `${proj.title}: Case Study | ${agency.name}`,
      description: proj.summary,
      canonical,
      jsonLd: graph(
        {
          '@type': 'CreativeWork',
          '@id': `${canonical}#work`,
          name: proj.title,
          headline: proj.title,
          abstract: proj.summary,
          description: proj.description,
          url: canonical,
          dateCreated: proj.year,
          keywords: proj.tools.join(', '),
          author: { '@id': PERSON_ID },
          publisher: { '@id': ORG_ID },
        },
        breadcrumbs([
          ['Home', '/'],
          ['Work', '/work'],
          [proj.title, `/work/${proj.id}`],
        ]),
        person,
        organization
      ),
    };
  }

  if (path === '/pricing') {
    return {
      title: `Pricing: AI Agents, Websites, SEO & AEO | ${agency.name}`,
      description:
        'Starting prices in INR and USD for AI agents and chatbots, website design and development, SEO and AEO. Fixed quotes after a free scoping call.',
      canonical,
      jsonLd: graph(organization, breadcrumbs([
        ['Home', '/'],
        ['Pricing', '/pricing'],
      ])),
    };
  }

  if (path === '/about') {
    return {
      title: `About ${agency.name} & founder Akshit Sharma`,
      description:
        'Gentle Tech Labs is a founder-led studio from Chandigarh. Meet Akshit Sharma: AI engineer, former Gentleman Cadet at OTA Gaya, and builder of production AI agents.',
      canonical,
      jsonLd: graph(
        { '@type': 'AboutPage', '@id': `${canonical}#page`, url: canonical, about: { '@id': ORG_ID }, mainEntity: { '@id': PERSON_ID } },
        person,
        organization,
        breadcrumbs([
          ['Home', '/'],
          ['About', '/about'],
        ])
      ),
    };
  }

  if (path === '/contact') {
    return {
      title: `Contact & Book a Discovery Call | ${agency.name}`,
      description:
        'Book a free 30-minute discovery call, send a project brief, or message us on WhatsApp. We reply to clients in India and worldwide.',
      canonical,
      jsonLd: graph(
        { '@type': 'ContactPage', '@id': `${canonical}#page`, url: canonical, about: { '@id': ORG_ID } },
        organization,
        breadcrumbs([
          ['Home', '/'],
          ['Contact', '/contact'],
        ])
      ),
    };
  }

  if (path === '/recruiters') {
    return {
      title: 'Akshit Sharma: AI/ML & Backend Engineer Resume',
      description:
        'Resume of Akshit Sharma, AI/ML and backend engineer (Python, LangGraph, RAG, FastAPI, React). Available immediately for remote, hybrid (Tricity) or relocation roles.',
      canonical,
      jsonLd: graph(
        { '@type': 'ProfilePage', '@id': `${canonical}#page`, url: canonical, mainEntity: { '@id': PERSON_ID } },
        { ...person, url: canonical },
        breadcrumbs([
          ['Home', '/'],
          ['For recruiters', '/recruiters'],
        ])
      ),
    };
  }

  return {
    title: `Page not found | ${agency.name}`,
    description: 'This page does not exist.',
    canonical: `${SITE}/`,
    jsonLd: null,
    notFound: true,
  };
}
