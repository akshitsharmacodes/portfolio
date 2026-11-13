/**
 * GENTLE TECH LABS: SERVICES
 * Single source for the service pages, pricing, navbar dropdown, home services list and
 * Service / FAQPage structured data.
 *
 * PRICES ARE SUGGESTED STARTING POINTS, NOT CONFIRMED BY AKSHIT. Review `from` before
 * publishing. They're "starting from" figures in INR and USD; final quotes come after a
 * scoping call.
 */
export const services = [
  {
    slug: 'ai-agents-chatbots',
    num: '01',
    name: 'AI agents & chatbots',
    short: 'Agents and chatbots that take repetitive work off your team.',
    title: 'AI Agent & Chatbot Development',
    metaTitle: 'AI Agent & Chatbot Development Company | Gentle Tech Labs',
    metaDescription:
      'Custom AI agents, RAG chatbots and workflow automation built with LangGraph, LangChain and Python. Starting from ₹60,000 / $900. India and worldwide.',
    intro:
      'We design and build AI agents and chatbots that do real work: answering customers from your own documents, triaging email and tickets, qualifying leads, and running multi-step workflows across your tools, with checks so you can trust the output.',
    forWho: [
      'Teams drowning in repetitive email, tickets or data entry',
      'Businesses that want a support or sales chatbot trained on their own content',
      'Founders who need an AI feature shipped to production, not a demo',
    ],
    deliverables: [
      'Discovery and a fixed-scope plan with success metrics',
      'Agent or chatbot built with LangGraph / LangChain and the right LLM for the job',
      'Retrieval (RAG) over your documents with cited answers',
      'Tool integrations: CRM, email, helpdesk, databases, internal APIs',
      'Evals and guardrails, with a readable trace of every run',
      'Deployment, documentation and a handover session',
    ],
    stack: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'PostgreSQL / pgvector', 'ChromaDB', 'Redis', 'Docker'],
    from: { inr: '₹60,000', usd: '$900', unit: 'per project' },
    timeline: 'Typically 3–6 weeks',
    relatedWork: ['zero-ops-autosre', 'matcha-ai', 'cruisecontent'],
    faqs: [
      {
        q: 'How much does it cost to build an AI chatbot or agent?',
        a: 'Projects start from ₹60,000 (about $900) for a focused chatbot or single-workflow agent. Multi-agent systems with several integrations cost more. You get a fixed quote after a free scoping call.',
      },
      {
        q: 'Which AI models do you use?',
        a: 'Whichever fits the task and budget: models from Anthropic, OpenAI or open-source models you can self-host. The system is built so the model can be swapped later.',
      },
      {
        q: 'Will the chatbot make things up?',
        a: 'We ground answers in your own documents with retrieval (RAG), show citations, and add evals and guardrails so wrong or unsupported answers are caught before customers see them.',
      },
      {
        q: 'Do we own the code?',
        a: 'Yes. Work happens in a repository you own from day one, and everything is documented for your team.',
      },
    ],
  },
  {
    slug: 'web-design-development',
    num: '02',
    name: 'Web design & development',
    short: 'Fast, premium websites and web apps that turn visitors into enquiries.',
    title: 'Website Design & Development',
    metaTitle: 'Website Design & Development Company | Gentle Tech Labs',
    metaDescription:
      'Premium, fast websites and web apps built with React and Next.js: design, development, SEO-ready structure and analytics. Starting from ₹30,000 / $450.',
    intro:
      'We design and build fast, accessible websites and web apps that look premium and are built to be found: clear messaging, clean code, Core Web Vitals in the green, and analytics from day one.',
    forWho: [
      'Businesses whose current site looks dated or loads slowly',
      'Startups that need a marketing site or MVP web app quickly',
      'Teams that need dashboards or internal tools on top of their data',
    ],
    deliverables: [
      'Messaging and page structure planned around what your buyers search for',
      'Custom design in your brand, desktop and mobile',
      'Development in React / Next.js with a CMS where you need one',
      'Technical SEO built in: metadata, schema, sitemap, fast loading',
      'Analytics and conversion tracking',
      'Launch, hosting setup and a handover',
    ],
    stack: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Django / FastAPI', 'Vercel'],
    from: { inr: '₹30,000', usd: '$450', unit: 'per website' },
    timeline: 'Typically 2–5 weeks',
    relatedWork: ['cruisecontent', 'sims'],
    faqs: [
      {
        q: 'How much does a website cost?',
        a: 'Marketing websites start from ₹30,000 (about $450). Web apps, dashboards and e-commerce cost more depending on features. You get a fixed quote after a scoping call.',
      },
      {
        q: 'How long does it take?',
        a: 'Most marketing sites take 2–5 weeks from approved plan to launch. Web apps depend on scope and are planned in milestones.',
      },
      {
        q: 'Will my website rank on Google?',
        a: 'Every site ships with technical SEO in place: fast loading, correct metadata, structured data and a sitemap. Ranking for competitive searches also needs content and authority, which our SEO service covers.',
      },
    ],
  },
  {
    slug: 'seo',
    num: '03',
    name: 'SEO',
    short: 'Technical SEO, content and fixes that get you found on Google.',
    title: 'SEO Services',
    metaTitle: 'SEO Services for Startups & Small Businesses | Gentle Tech Labs',
    metaDescription:
      'Technical SEO audits, on-page optimisation, Core Web Vitals fixes and content that ranks. Monthly SEO from ₹15,000 / $250. India, local and international SEO.',
    intro:
      'We find what is stopping your site from ranking and fix it: crawling and indexing problems, slow pages, weak titles and structure, missing schema, and content gaps against the searches your buyers actually make.',
    forWho: [
      'Sites that get little or no traffic from Google',
      'Local businesses that want to show up in Google Maps and "near me" searches',
      'Companies expanding to new cities or countries',
    ],
    deliverables: [
      'Full technical and content SEO audit with a prioritised action plan',
      'Fixes implemented: indexing, speed, metadata, schema, internal linking',
      'Keyword and topic research mapped to pages',
      'Google Search Console and analytics setup',
      'Google Business Profile optimisation for local SEO',
      'Monthly report: rankings, clicks and what we did',
    ],
    stack: ['Google Search Console', 'Lighthouse / Core Web Vitals', 'Schema.org', 'GA4', 'Bing Webmaster Tools'],
    from: { inr: '₹15,000', usd: '$250', unit: 'per month' },
    timeline: 'Audit in 1 week; results build over 3–6 months',
    relatedWork: [],
    faqs: [
      {
        q: 'How long does SEO take to show results?',
        a: 'Technical fixes can show in a few weeks; meaningful ranking and traffic gains usually take 3–6 months, depending on competition and your starting point.',
      },
      {
        q: 'Do you guarantee first-page rankings?',
        a: 'No honest SEO can guarantee rankings, because Google decides them. We commit to the work, show exactly what was done each month, and track the results.',
      },
      {
        q: 'Do you do local SEO?',
        a: 'Yes: Google Business Profile, local pages, reviews strategy and citations for businesses that serve a city or region.',
      },
    ],
  },
  {
    slug: 'aeo-ai-search',
    num: '04',
    name: 'AEO / AI search',
    short: 'Get recommended by ChatGPT, Perplexity, Gemini and Google AI Overviews.',
    title: 'AEO: Answer Engine & AI Search Optimisation',
    metaTitle: 'AEO Services: Get Cited by ChatGPT & AI Search | Gentle Tech Labs',
    metaDescription:
      'Answer engine optimisation (AEO / GEO): AI-visibility audits, answer-first content, schema and entity signals so ChatGPT, Perplexity and Google AI Overviews cite you. From ₹20,000 / $300.',
    intro:
      'More buyers now ask ChatGPT, Perplexity, Gemini or Google AI Overviews instead of scrolling search results. We audit how these AI engines see your business and make your site easy for them to read, trust and cite.',
    forWho: [
      'Businesses that want to be the answer when buyers ask AI assistants for a recommendation',
      'Brands whose competitors already show up in AI answers',
      'Teams that already invest in SEO and want to cover AI search too',
    ],
    deliverables: [
      'AI-visibility audit: how ChatGPT, Perplexity, Gemini and AI Overviews describe you today',
      'Crawler access, llms.txt and pre-rendered pages AI bots can read',
      'Answer-first rewrites of key pages and new question-led content',
      'Schema and entity signals (Organization, Service, FAQ, Person)',
      'Brand mention and citation plan across trusted sources',
      'Monthly AI-visibility tracking',
    ],
    stack: ['Schema.org', 'llms.txt', 'Pre-rendering', 'Search Console', 'AI visibility tracking'],
    from: { inr: '₹20,000', usd: '$300', unit: 'audit + setup' },
    timeline: 'Audit in 1 week; setup in 2–3 weeks',
    relatedWork: [],
    faqs: [
      {
        q: 'What is AEO?',
        a: 'Answer engine optimisation (also called GEO) makes your business easy for AI assistants such as ChatGPT, Perplexity, Gemini and Google AI Overviews to understand, trust and recommend in their answers.',
      },
      {
        q: 'Is AEO different from SEO?',
        a: 'They overlap. SEO targets ranked search results; AEO targets the answers AI assistants write. Both need crawlable, well-structured, trustworthy content, so we usually run them together.',
      },
      {
        q: 'Can you guarantee ChatGPT will recommend us?',
        a: 'No one can guarantee what an AI model says. We improve the signals these engines rely on and track how often and how accurately they mention you.',
      },
    ],
  },
];

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);

/** Questions for the home page FAQ (and its FAQPage schema) */
export const homeFaqs = [
  {
    q: 'What does Gentle Tech Labs do?',
    a: 'We build AI agents and chatbots, design and develop websites and web apps, and run SEO and AEO (AI search optimisation) for businesses in India and worldwide.',
  },
  {
    q: 'Who will work on my project?',
    a: 'Akshit Sharma, founder and lead engineer, leads every project directly. Specialists in design or content join when a project needs them.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. We work with clients across India and abroad, quote in INR or USD, and plan meetings around your time zone. Upwork escrow is available if you prefer it.',
  },
  {
    q: 'How do projects start?',
    a: 'With a free 30-minute discovery call. Within 48 hours you get a fixed-scope proposal with milestones, timeline and price.',
  },
  {
    q: 'Who owns the code and content?',
    a: 'You do. Work lands in a repository you own from day one, and everything is documented for your team.',
  },
];
