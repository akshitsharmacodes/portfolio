import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Zap, Activity, Database, CheckCircle2, Cpu, Server, Terminal, ExternalLink } from 'lucide-react';

/**
 * HIGH-PERFORMANCE AUTONOMOUS AI AGENT SWARM
 * Instant component detection, real-time scroll synchronization,
 * live LeadManch analytics dashboard query optimization telemetry,
 * and full Light/Dark mode optimization.
 */

const AGENT_PROFILES = [
  { id: 0, name: 'Agent::LangGraph', color: '#e32b3c', role: 'State Machine Orchestrator', task: 'Validating multi-agent state boundaries' },
  { id: 1, name: 'Agent::LeadManch', color: '#10b981', role: 'Analytics Query Optimizer', task: 'Optimizing analytics dashboard query cache (4.2ms)' },
  { id: 2, name: 'Agent::ChromaDB', color: '#06b6d4', role: 'Vector Retrieval', task: 'Cosine similarity search in ChromaDB collection' },
  { id: 3, name: 'Agent::FastAPI', color: '#8b5cf6', role: 'Async REST Service', task: 'Serving low-latency inference endpoints' },
  { id: 4, name: 'Agent::RedisCache', color: '#f59e0b', role: 'Cache-Aside Engine', task: 'Distributed cache hit: LeadManch metric cache' },
  { id: 5, name: 'Agent::Dokku', color: '#ec4899', role: 'SIH Winner Bot', task: 'Verifying automated evaluation pipelines' },
  { id: 6, name: 'Agent::Evaluator', color: '#3b82f6', role: 'Scoring & Guardrails', task: 'Multi-agent score convergence check' },
  { id: 7, name: 'Agent::PostgreSQL', color: '#38bdf8', role: 'Relational Indexing', task: 'Executing B-tree indexed subqueries' },
  { id: 8, name: 'Agent::Celery', color: '#4ade80', role: 'Async Task Queue', task: 'Worker thread executing parallel RAG chunking' },
  { id: 9, name: 'Agent::Ollama', color: '#fb923c', role: 'Local LLM Inference', task: 'Low-latency quantized token generation' },
  { id: 10, name: 'Agent::PyTorch', color: '#f87171', role: 'Neural Tensor Ops', task: 'Computing cosine similarity matrix' },
  { id: 11, name: 'Agent::Docker', color: '#60a5fa', role: 'Container Orchestrator', task: 'Health check passed: microservices mesh' },
  { id: 12, name: 'Agent::LangSmith', color: '#c084fc', role: 'Observability & Trace', task: 'Streaming execution traces & latencies' },
  { id: 13, name: 'Agent::Qdrant', color: '#2dd4bf', role: 'HNSW Vector Index', task: 'Approximate nearest neighbor query k=10' },
  { id: 14, name: 'Agent::AutoSRE', color: '#10b981', role: 'Autonomous SRE', task: 'GDG Hack-O-Octo finalist: monitoring live telemetry & runbooks' },
];

const REPRODUCTION_POOL = [
  { name: 'Agent::SubGraph', color: '#e32b3c', role: 'State Sub-Routine', task: 'Branching execution pathway' },
  { name: 'Agent::QueryShard', color: '#10b981', role: 'Shard Worker', task: 'Reading read-replica analytics' },
  { name: 'Agent::EmbeddingNode', color: '#06b6d4', role: 'Dense Embedder', task: 'Generating text-embedding-3 vectors' },
  { name: 'Agent::AsyncWorker', color: '#8b5cf6', role: 'I/O Concurrency', task: 'Dispatching non-blocking HTTP requests' },
  { name: 'Agent::CacheMirror', color: '#f59e0b', role: 'Redis Replica', task: 'Memory sync to hot cluster' },
  { name: 'Agent::Dokku-Node', color: '#ec4899', role: 'Cluster Runner', task: 'Executing CI verification test suite' },
  { name: 'Agent::Critic', color: '#3b82f6', role: 'Guardrail Scorer', task: 'Hallucination penalty index: 0.01' },
  { name: 'Agent::TokenStreamer', color: '#2dd4bf', role: 'SSE Dispatcher', task: 'Streaming tokens at 82 tokens/sec' },
];

const LIVE_OPERATIONS = [
  { tag: 'LEADMANCH', text: 'LeadManch analytics dashboard query optimized (4.2ms latency, Redis hit)', agent: 'Agent::LeadManch' },
  { tag: 'LANGGRAPH', text: 'LangGraph multi-agent state machine checkpoint verified', agent: 'Agent::LangGraph' },
  { tag: 'CHROMADB', text: 'Vector similarity search running against ChromaDB embeddings', agent: 'Agent::ChromaDB' },
  { tag: 'REDIS', text: 'Redis distributed cache invalidated & refreshed (cache-aside hit)', agent: 'Agent::RedisCache' },
  { tag: 'CELERY', text: 'Celery worker dispatched for background RAG job', agent: 'Agent::FastAPI' },
  { tag: 'SIH DOKKU', text: 'Smart India Hackathon verification nodes aligned & executing', agent: 'Agent::Dokku' },
  { tag: 'AUTOSRE', text: 'Hack-O-Octo 4.0 Top 10 SRE incident remediation agent actively inspecting cloud telemetry', agent: 'Agent::AutoSRE' },
  { tag: 'FASTAPI', text: 'FastAPI async REST endpoints serving low-latency payloads', agent: 'Agent::FastAPI' },
];

const TARGET_SELECTOR = `
  .project-card,
  .skill-group-card,
  .metric-item,
  .client-pillar-card,
  .client-banner-card,
  .award-card,
  .timeline-card,
  .education-card,
  .contact-form,
  .contact-action-card,
  .contact-mini-item,
  .contact-channels .channel-card,
  .about-highlight-box,
  .work-controls,
  .hero-content,
  .hero-headline
`;

export default function SwarmEffect({ isActive, theme = 'dark', onClose }) {
  const [speed, setSpeed] = useState(1);
  const [activeAgents, setActiveAgents] = useState(AGENT_PROFILES.length);
  const [currentOpIndex, setCurrentOpIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const agentsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const targetsCacheRef = useRef([]);

  const isLight = theme === 'light';

  // Find all candidate DOM elements currently on the page
  const scanTargets = useCallback(() => {
    try {
      const nodes = Array.from(document.querySelectorAll(TARGET_SELECTOR));
      targetsCacheRef.current = nodes.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 20 && rect.height > 20;
      });
    } catch {
      targetsCacheRef.current = [];
    }
  }, []);

  // Initialize swarm agents with immediate targets
  useEffect(() => {
    if (!isActive) return;

    scanTargets();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const availableTargets = targetsCacheRef.current;

    agentsRef.current = AGENT_PROFILES.map((profile, i) => {
      // Pick an initial on-screen target if available
      const initialTarget = availableTargets.length > 0 
        ? availableTargets[i % availableTargets.length] 
        : null;

      let initialX = Math.random() * width;
      let initialY = Math.random() * height;
      let initialBox = null;

      if (initialTarget) {
        const r = initialTarget.getBoundingClientRect();
        if (r.bottom >= -50 && r.top <= height + 50) {
          initialX = r.left + r.width * 0.5;
          initialY = r.top + r.height * 0.5;
          initialBox = {
            x: r.left,
            y: r.top,
            w: r.width,
            h: r.height,
          };
        }
      }

      return {
        ...profile,
        x: initialX,
        y: initialY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        targetX: initialX,
        targetY: initialY,
        targetElement: initialTarget,
        anchorX: 0.15 + Math.random() * 0.7,
        anchorY: 0.15 + Math.random() * 0.7,
        currentBox: initialBox,
        boxProgress: initialBox ? 1 : 0,
        typingText: profile.role,
        stateTimer: 10 + i * 8, // Staggered initial retargeting
      };
    });

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showModal) {
          setShowModal(false);
        } else {
          onClose();
        }
      }
    };

    const handleScrollOrResize = () => {
      scanTargets();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // Cycle through real-time operation events
    const opInterval = setInterval(() => {
      setCurrentOpIndex((prev) => (prev + 1) % LIVE_OPERATIONS.length);
    }, 2400);

    // Continuously reproduce / spawn autonomous AI agent cursors
    const reproductionTimer = setInterval(() => {
      if (agentsRef.current.length < 24) {
        const poolIndex = (agentsRef.current.length - AGENT_PROFILES.length) % REPRODUCTION_POOL.length;
        const template = REPRODUCTION_POOL[poolIndex >= 0 ? poolIndex : 0];
        
        // Spawn near an existing parent agent with an outward burst
        const parent = agentsRef.current[Math.floor(Math.random() * agentsRef.current.length)];
        const spawnX = parent ? parent.x + (Math.random() - 0.5) * 80 : Math.random() * window.innerWidth;
        const spawnY = parent ? parent.y + (Math.random() - 0.5) * 80 : Math.random() * window.innerHeight;

        const visibleCandidates = targetsCacheRef.current.filter((el) => {
          const r = el.getBoundingClientRect();
          return r.bottom >= 0 && r.top <= window.innerHeight && r.width > 20 && r.height > 20;
        });
        const spawnTarget = visibleCandidates.length > 0 
          ? visibleCandidates[Math.floor(Math.random() * visibleCandidates.length)]
          : null;
        let spawnBox = null;
        let sTargetX = Math.random() * window.innerWidth;
        let sTargetY = Math.random() * window.innerHeight;
        if (spawnTarget) {
          const r = spawnTarget.getBoundingClientRect();
          sTargetX = r.left + r.width * 0.5;
          sTargetY = r.top + r.height * 0.5;
          spawnBox = {
            x: r.left,
            y: r.top,
            w: r.width,
            h: r.height,
          };
        }

        const newAgent = {
          id: agentsRef.current.length,
          name: `${template.name}-${agentsRef.current.length + 1}`,
          color: template.color,
          role: template.role,
          task: template.task,
          x: Math.max(20, Math.min(window.innerWidth - 20, spawnX)),
          y: Math.max(20, Math.min(window.innerHeight - 20, spawnY)),
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          targetX: sTargetX,
          targetY: sTargetY,
          targetElement: spawnTarget,
          anchorX: 0.15 + Math.random() * 0.7,
          anchorY: 0.15 + Math.random() * 0.7,
          currentBox: spawnBox,
          boxProgress: spawnBox ? 1 : 0,
          typingText: template.role,
          stateTimer: 15 + Math.random() * 35,
        };

        agentsRef.current.push(newAgent);
        setActiveAgents(agentsRef.current.length);
      }
    }, speed === 2 ? 1400 : 2800);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      clearInterval(opInterval);
      clearInterval(reproductionTimer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, onClose, scanTargets, showModal]);

  // Main high-frequency animation loop
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const effectiveSpeed = speed;
      const mouse = mouseRef.current;
      const candidates = targetsCacheRef.current;
      const allAgents = agentsRef.current;

      // 1. DRAW STRUCTURAL INTER-AGENT NEURAL NETWORK MESH
      const maxMeshDist = 240;
      for (let i = 0; i < allAgents.length; i++) {
        for (let j = i + 1; j < allAgents.length; j++) {
          const a1 = allAgents[i];
          const a2 = allAgents[j];
          const dx = a1.x - a2.x;
          const dy = a1.y - a2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxMeshDist) {
            const alpha = (1 - dist / maxMeshDist) * (isLight ? 0.38 : 0.28);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(a1.x, a1.y);
            ctx.lineTo(a2.x, a2.y);
            ctx.strokeStyle = a1.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1.1;
            ctx.setLineDash([4, 4]);
            ctx.stroke();

            // Structural vertex node at midpoint
            if (dist < 130) {
              ctx.fillStyle = a1.color;
              ctx.globalAlpha = alpha * 1.5;
              ctx.beginPath();
              ctx.arc((a1.x + a2.x) / 2, (a1.y + a2.y) / 2, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        }
      }

      // Update and draw each agent
      allAgents.forEach((agent) => {
        agent.stateTimer -= 1;

        // Check if current target element is still in view
        let targetRect = null;
        if (agent.targetElement && document.body.contains(agent.targetElement)) {
          const r = agent.targetElement.getBoundingClientRect();
          // Element is considered in view if partially within viewport margins
          if (r.bottom >= -50 && r.top <= window.innerHeight + 50 && r.width > 10 && r.height > 10) {
            targetRect = r;
            agent.targetX = r.left + r.width * agent.anchorX;
            agent.targetY = r.top + r.height * agent.anchorY;
            agent.currentBox = {
              x: r.left,
              y: r.top,
              w: r.width,
              h: r.height,
            };
          }
        }

        // If no target, out of screen, or state timer expired, instantly retarget to a visible element
        if (!targetRect || agent.stateTimer <= 0) {
          agent.stateTimer = 45 + Math.random() * 55; // Fast agile retargeting (0.75 - 1.6s)
          
          // Filter candidate elements strictly inside current viewport
          const visibleCandidates = candidates.filter((el) => {
            const r = el.getBoundingClientRect();
            return r.bottom >= 0 && r.top <= window.innerHeight && r.width > 20 && r.height > 20;
          });

          if (visibleCandidates.length > 0 && Math.random() > 0.15) {
            const chosen = visibleCandidates[Math.floor(Math.random() * visibleCandidates.length)];
            agent.targetElement = chosen;
            agent.anchorX = 0.15 + Math.random() * 0.7;
            agent.anchorY = 0.15 + Math.random() * 0.7;
            const r = chosen.getBoundingClientRect();
            agent.targetX = r.left + r.width * agent.anchorX;
            agent.targetY = r.top + r.height * agent.anchorY;
            agent.currentBox = {
              x: r.left,
              y: r.top,
              w: r.width,
              h: r.height,
            };
            agent.boxProgress = 0;
          } else {
            agent.targetElement = null;
            agent.targetX = Math.random() * canvas.width;
            agent.targetY = Math.random() * canvas.height;
            agent.currentBox = null;
          }
        }

        // Agile steering toward target
        const dx = agent.targetX - agent.x;
        const dy = agent.targetY - agent.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 8) {
          const accel = (0.95 * effectiveSpeed);
          agent.vx += (dx / dist) * accel;
          agent.vy += (dy / dist) * accel;
        }

        // Mouse avoidance/attraction
        if (mouse.active) {
          const dxMouse = mouse.x - agent.x;
          const dyMouse = mouse.y - agent.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 220) {
            // Agile orbit around cursor
            agent.vx += (dxMouse / distMouse) * 0.8 * effectiveSpeed;
            agent.vy += (dyMouse / distMouse) * 0.8 * effectiveSpeed;
          }
        }

        // Fast damping & snappy movement
        agent.vx *= 0.88;
        agent.vy *= 0.88;

        // Cap speed
        const currentSpeed = Math.sqrt(agent.vx * agent.vx + agent.vy * agent.vy);
        const maxSpeed = 14 * effectiveSpeed;
        if (currentSpeed > maxSpeed) {
          agent.vx = (agent.vx / currentSpeed) * maxSpeed;
          agent.vy = (agent.vy / currentSpeed) * maxSpeed;
        }

        agent.x += agent.vx;
        agent.y += agent.vy;

        // Keep inside bounds
        if (agent.x < 10) agent.x = 10;
        if (agent.x > canvas.width - 10) agent.x = canvas.width - 10;
        if (agent.y < 10) agent.y = 10;
        if (agent.y > canvas.height - 10) agent.y = canvas.height - 10;

        // Draw structural crosshair alignment axes
        if (agent.currentBox && agent.currentBox.w && agent.currentBox.h) {
          const b = agent.currentBox;
          ctx.save();
          ctx.strokeStyle = agent.color;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([2, 5]);
          ctx.globalAlpha = isLight ? 0.24 : 0.16;

          // Horizontal alignment axis through cursor
          ctx.beginPath();
          ctx.moveTo(Math.max(0, b.x - 30), agent.y);
          ctx.lineTo(Math.min(canvas.width, b.x + b.w + 30), agent.y);
          ctx.stroke();

          // Vertical alignment axis through cursor
          ctx.beginPath();
          ctx.moveTo(agent.x, Math.max(0, b.y - 30));
          ctx.lineTo(agent.x, Math.min(canvas.height, b.y + b.h + 30));
          ctx.stroke();
          ctx.restore();
        }

        // Draw component detection bounding box (dotted lines with dimension badge)
        if (agent.currentBox && agent.currentBox.w > 0 && agent.currentBox.h > 0) {
          agent.boxProgress = Math.min(1, (agent.boxProgress || 0) + 0.16); // Fast 100ms box expand
          const b = agent.currentBox;

          ctx.save();
          ctx.strokeStyle = agent.color;
          ctx.lineWidth = isLight ? 1.8 : 1.5;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(b.x, b.y, b.w * agent.boxProgress, b.h * agent.boxProgress);

          // Component detection badge - dimensions badge matching user screenshot
          ctx.fillStyle = isLight ? '#0284c7' : '#38bdf8';
          ctx.font = '10px monospace';
          ctx.fillText(
            `${Math.round(b.w)} × ${Math.round(b.h)} px`,
            b.x + 4,
            b.y - 6
          );
          ctx.restore();
        }

        // Draw laser connector line to target
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(agent.x, agent.y);
        ctx.lineTo(agent.targetX, agent.targetY);
        ctx.strokeStyle = agent.color;
        ctx.globalAlpha = isLight ? 0.38 : 0.28;
        ctx.lineWidth = 1.3;
        ctx.setLineDash([3, 2]);
        ctx.stroke();
        ctx.restore();

        // Draw cursor pointer
        ctx.save();
        ctx.translate(agent.x, agent.y);

        // Drop shadow for cursor
        ctx.shadowColor = agent.color;
        ctx.shadowBlur = isLight ? 6 : 14;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 16);
        ctx.lineTo(4.5, 12);
        ctx.lineTo(8.5, 20);
        ctx.lineTo(11.5, 18.5);
        ctx.lineTo(7.5, 11);
        ctx.lineTo(13.5, 11);
        ctx.closePath();

        ctx.fillStyle = agent.color;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isLight ? '#1a1a1a' : '#090909';
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Draw Name Tag Pill
        const tagText = `${agent.name}`;
        ctx.font = 'bold 11px Manrope, sans-serif';
        const textWidth = ctx.measureText(tagText).width;
        const pillWidth = textWidth + 18;
        const pillHeight = 22;
        const pillX = 14;
        const pillY = 14;

        // Pill background
        ctx.fillStyle = agent.color;
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 4);
        ctx.fill();

        // Pill border for light mode contrast
        if (isLight) {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Pill text
        ctx.fillStyle = '#ffffff';
        ctx.fillText(tagText, pillX + 8, pillY + 15);

        // Blinking indicator
        if (Math.floor(frameCount / 12) % 2 === 0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fillText(' _', pillX + pillWidth - 12, pillY + 15);
        }

        ctx.restore();
      });

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, speed, isLight]);

  if (!isActive) return null;

  const currentOp = LIVE_OPERATIONS[currentOpIndex];

  return (
    <aside
      className={`swarm-overlay ${isLight ? 'swarm-theme-light' : 'swarm-theme-dark'}`}
      aria-label="Interactive AI Agent Swarm Visualization"
    >
      {/* Fullscreen Canvas for Cursors and Fast Component Bounding Boxes */}
      <canvas
        ref={canvasRef}
        className="swarm-canvas"
        style={{ pointerEvents: 'none' }}
      />

      {/* Floating HUD Bar - Fully Optimized for Light & Dark Mode */}
      <div className="swarm-hud-bar" role="region" aria-label="AI Swarm Control Dock">
        <div 
          className="swarm-hud-status"
          onClick={() => setShowModal(true)}
          title="Click to open Agent & LeadManch Analytics Inspector Modal"
          style={{ cursor: 'pointer' }}
        >
          <span className="swarm-radar-dot" aria-hidden="true"></span>
          <span className="swarm-hud-title">SWARM REBUILD ACTIVE</span>
          <span className="swarm-hud-meta">({activeAgents} AI Agents Live)</span>
        </div>

        {/* Live Operation Ticker with full text and category tag */}
        <div 
          className="swarm-hud-ticker" 
          title={currentOp.text}
          onClick={() => setShowModal(true)}
          style={{ cursor: 'pointer' }}
        >
          <span className="swarm-ticker-tag">{currentOp.tag}</span>
          <span className="swarm-hud-ticker-text">{currentOp.text}</span>
        </div>

        {/* Interactive Controls */}
        <div className="swarm-hud-actions">
          {/* Inspect / Modal Trigger */}
          <button
            type="button"
            className={`swarm-pill-btn ${showModal ? 'active' : ''}`}
            onClick={() => setShowModal((prev) => !prev)}
            title="Inspect Agent Fleet & LeadManch Telemetry Modal"
          >
            <Activity size={13} aria-hidden="true" />
            <span>Inspect</span>
          </button>

          {/* Speed switcher */}
          <button
            type="button"
            className={`swarm-pill-btn swarm-pill-speed ${speed === 1 ? 'active' : ''}`}
            onClick={() => setSpeed(1)}
            title="Standard Speed"
          >
            1×
          </button>
          <button
            type="button"
            className={`swarm-pill-btn swarm-pill-speed ${speed === 2 ? 'active' : ''}`}
            onClick={() => setSpeed(2)}
            title="Accelerated 2× Turbo Speed"
          >
            <Zap size={12} aria-hidden="true" />
            <span>2×</span>
          </button>

          {/* Close / Dismiss */}
          <button
            type="button"
            className="swarm-exit-btn"
            onClick={onClose}
            aria-label="Exit Swarm Mode"
            title="Stop Swarm (Esc)"
          >
            <X size={15} aria-hidden="true" />
            <span>Stop Swarm</span>
          </button>
        </div>
      </div>

      {/* LEADMANCH ANALYTICS & AGENT FLEET INSPECTION MODAL */}
      {showModal && (
        <div 
          className="swarm-modal-backdrop" 
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="swarm-modal-title"
        >
          <div 
            className="swarm-modal-card" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="swarm-modal-header">
              <div className="swarm-modal-header-info">
                <div className="swarm-modal-radar-box">
                  <span className="swarm-radar-dot"></span>
                </div>
                <div className="swarm-modal-title-group">
                  <h3 id="swarm-modal-title" className="swarm-modal-title">
                    SWARM REBUILD ACTIVE <span className="swarm-modal-badge">{activeAgents} AI Agents Live</span>
                  </h3>
                  <p className="swarm-modal-subtitle">
                    Autonomous Multi-Agent Telemetry & LeadManch Analytics Execution
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="swarm-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* LeadManch Analytics Dashboard Query Highlight Panel */}
            <div className="swarm-leadmanch-panel">
              <div className="swarm-leadmanch-top">
                <div className="swarm-leadmanch-title-wrap">
                  <Database size={16} className="text-accent flex-shrink-0" />
                  <span className="swarm-leadmanch-title">LeadManch Analytics Dashboard Query Engine</span>
                </div>
                <span className="swarm-leadmanch-status-pill">
                  <CheckCircle2 size={13} />
                  <span>OPTIMIZED (4.2ms)</span>
                </span>
              </div>

              <p className="swarm-leadmanch-desc">
                Real-time query execution monitoring: PostgreSQL indexed relational queries with Redis cache-aside invalidation and LangGraph schema orchestration.
              </p>

              {/* Real-time Telemetry Metrics */}
              <div className="swarm-telemetry-grid">
                <div className="swarm-telemetry-item">
                  <span className="swarm-telemetry-label">Avg Query Latency</span>
                  <span className="swarm-telemetry-val text-accent">4.2 ms</span>
                </div>
                <div className="swarm-telemetry-item">
                  <span className="swarm-telemetry-label">Cache Hit Ratio</span>
                  <span className="swarm-telemetry-val" style={{ color: '#10b981' }}>99.4%</span>
                </div>
                <div className="swarm-telemetry-item">
                  <span className="swarm-telemetry-label">Vector Retrieval</span>
                  <span className="swarm-telemetry-val" style={{ color: '#06b6d4' }}>ChromaDB k=5</span>
                </div>
                <div className="swarm-telemetry-item">
                  <span className="swarm-telemetry-label">State Checkpoints</span>
                  <span className="swarm-telemetry-val" style={{ color: '#8b5cf6' }}>Synchronized</span>
                </div>
              </div>
            </div>

            {/* Live Autonomous AI Agents Fleet */}
            <div className="swarm-fleet-section">
              <h4 className="swarm-fleet-heading">Active Autonomous Agents ({activeAgents})</h4>
              <div className="swarm-fleet-grid">
                {(agentsRef.current.length > 0 ? agentsRef.current : AGENT_PROFILES).map((agent) => (
                  <div key={agent.id} className="swarm-agent-card">
                    <div className="swarm-agent-header">
                      <span className="swarm-agent-dot" style={{ backgroundColor: agent.color }}></span>
                      <strong className="swarm-agent-name">{agent.name}</strong>
                    </div>
                    <div className="swarm-agent-role">{agent.role}</div>
                    <div className="swarm-agent-task">{agent.task}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="swarm-modal-footer">
              <div className="swarm-modal-speed-controls">
                <span className="swarm-modal-speed-label">Simulation Speed:</span>
                <div className="swarm-modal-speed-btns">
                  <button
                    type="button"
                    className={`swarm-pill-btn ${speed === 1 ? 'active' : ''}`}
                    onClick={() => setSpeed(1)}
                  >
                    1× Standard
                  </button>
                  <button
                    type="button"
                    className={`swarm-pill-btn ${speed === 2 ? 'active' : ''}`}
                    onClick={() => setSpeed(2)}
                  >
                    2× Turbo
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-secondary swarm-modal-dismiss-btn"
                onClick={() => setShowModal(false)}
              >
                Dismiss Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
