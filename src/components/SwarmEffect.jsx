import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Zap, RefreshCw } from 'lucide-react';

/**
 * STANDALONE SWARM EFFECT
 * Inspired by Joel Califa's Swarm & multiplayer cursor rebuild extensions.
 * Deploys autonomous AI Agent cursors that swarm across the portfolio,
 * highlighting DOM elements, typing simulated actions, drawing bounding boxes,
 * and reacting to mouse movement.
 */

const AGENT_PROFILES = [
  { name: 'Agent::LangGraph', color: '#e32b3c', role: 'State Machine' },
  { name: 'Agent::RAG-Pipeline', color: '#10b981', role: 'Vector Retrieval' },
  { name: 'Agent::ChromaDB', color: '#06b6d4', role: 'Semantic Search' },
  { name: 'Agent::FastAPI', color: '#8b5cf6', role: 'Async REST' },
  { name: 'Agent::RedisCache', color: '#f59e0b', role: 'Low-Latency Cache' },
  { name: 'Agent::Dokku', color: '#ec4899', role: 'SIH Winner Bot' },
  { name: 'Agent::Evaluator', color: '#3b82f6', role: 'Multi-Agent Scoring' },
];

export default function SwarmEffect({ isActive, onClose }) {
  const [speed, setSpeed] = useState(1);
  const [activeAgents, setActiveAgents] = useState(AGENT_PROFILES.length);
  const [swarmActionText, setSwarmActionText] = useState('Orchestrating agent workflows...');
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const agentsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Initialize swarm agents
  useEffect(() => {
    if (!isActive) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    agentsRef.current = AGENT_PROFILES.map((profile, i) => ({
      ...profile,
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      targetX: Math.random() * width,
      targetY: Math.random() * height,
      currentBox: null,
      boxProgress: 0,
      typingText: profile.role,
      stateTimer: Math.random() * 60,
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keydown', handleKeyDown);

    // Periodically update headline action text
    const actionInterval = setInterval(() => {
      const actions = [
        'LangGraph agents parsing candidate schemas...',
        'Vector similarity search running against ChromaDB...',
        'Redis distributed cache invalidated & refreshed...',
        'Celery worker dispatched for background RAG job...',
        'Smart India Hackathon verification nodes aligned...',
        'LeadManch analytics dashboard query optimized...',
      ];
      setSwarmActionText(actions[Math.floor(Math.random() * actions.length)]);
    }, 2800);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(actionInterval);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, onClose]);

  // Main animation loop
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

    // Find interactive DOM targets on page for agents to inspect
    const getTargets = () => {
      const elements = document.querySelectorAll(
        '.project-card, .skill-group-card, .metric-item, .hero-headline, .channel-card, .timeline-card'
      );
      const rects = [];
      elements.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top >= -100 && r.bottom <= window.innerHeight + 100) {
          rects.push({
            x: r.left,
            y: r.top,
            w: r.width,
            h: r.height,
          });
        }
      });
      return rects;
    };

    let targetRects = getTargets();
    let frameCount = 0;

    const render = () => {
      frameCount++;
      if (frameCount % 60 === 0) {
        targetRects = getTargets();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const effectiveSpeed = speed;
      const mouse = mouseRef.current;

      // Update and draw each agent
      agentsRef.current.forEach((agent) => {
        // AI Behavior: Seek target or mouse
        agent.stateTimer -= 1;
        if (agent.stateTimer <= 0) {
          agent.stateTimer = 90 + Math.random() * 120;
          if (targetRects.length > 0 && Math.random() > 0.3) {
            const target = targetRects[Math.floor(Math.random() * targetRects.length)];
            agent.targetX = target.x + Math.random() * target.w;
            agent.targetY = target.y + Math.random() * target.h;
            agent.currentBox = { ...target };
            agent.boxProgress = 0;
          } else {
            agent.targetX = Math.random() * canvas.width;
            agent.targetY = Math.random() * canvas.height;
            agent.currentBox = null;
          }
        }

        // Swarm towards mouse if mouse is close
        if (mouse.active) {
          const dxMouse = mouse.x - agent.x;
          const dyMouse = mouse.y - agent.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 260) {
            agent.vx += (dxMouse / distMouse) * 0.45 * effectiveSpeed;
            agent.vy += (dyMouse / distMouse) * 0.45 * effectiveSpeed;
          }
        }

        // Steer towards current target
        const dx = agent.targetX - agent.x;
        const dy = agent.targetY - agent.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 10) {
          agent.vx += (dx / dist) * 0.22 * effectiveSpeed;
          agent.vy += (dy / dist) * 0.22 * effectiveSpeed;
        }

        // Apply friction
        agent.vx *= 0.92;
        agent.vy *= 0.92;

        agent.x += agent.vx;
        agent.y += agent.vy;

        // Keep inside bounds
        if (agent.x < 10) agent.x = 10;
        if (agent.x > canvas.width - 10) agent.x = canvas.width - 10;
        if (agent.y < 10) agent.y = 10;
        if (agent.y > canvas.height - 10) agent.y = canvas.height - 10;

        // Draw selection bounding box if agent has a target
        if (agent.currentBox) {
          agent.boxProgress = Math.min(1, agent.boxProgress + 0.04);
          const b = agent.currentBox;

          ctx.save();
          ctx.strokeStyle = agent.color;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(b.x, b.y, b.w * agent.boxProgress, b.h * agent.boxProgress);

          // Draw dimensions badge
          ctx.fillStyle = agent.color;
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
        ctx.globalAlpha = 0.18;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Draw cursor pointer (SVG style arrow)
        ctx.save();
        ctx.translate(agent.x, agent.y);

        // Drop shadow for cursor
        ctx.shadowColor = agent.color;
        ctx.shadowBlur = 12;

        // Draw arrow cursor path
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
        ctx.strokeStyle = '#090909';
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Draw Name Tag Pill
        const tagText = `${agent.name}`;
        ctx.font = 'bold 11px Manrope, sans-serif';
        const textWidth = ctx.measureText(tagText).width;
        const pillWidth = textWidth + 16;
        const pillHeight = 22;
        const pillX = 14;
        const pillY = 14;

        // Pill background
        ctx.fillStyle = agent.color;
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 4);
        ctx.fill();

        // Pill text
        ctx.fillStyle = '#ffffff';
        ctx.fillText(tagText, pillX + 8, pillY + 15);

        // Blinking typing caret or status
        if (Math.floor(frameCount / 18) % 2 === 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
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
  }, [isActive, speed]);

  if (!isActive) return null;

  return (
    <aside
      className="swarm-overlay"
      aria-label="Interactive AI Agent Swarm Visualization"
    >
      {/* Fullscreen Canvas for Cursors and Trails */}
      <canvas
        ref={canvasRef}
        className="swarm-canvas"
        style={{ pointerEvents: 'none' }}
      />

      {/* Top Floating Control Bar */}
      <div className="swarm-hud-bar">
        <div className="swarm-hud-status">
          <span className="swarm-radar-dot"></span>
          <span className="swarm-hud-title">SWARM REBUILD ACTIVE</span>
          <span className="swarm-hud-meta">({activeAgents} AI Agents Live)</span>
        </div>

        <div className="swarm-hud-ticker">
          <span className="swarm-hud-ticker-text">{swarmActionText}</span>
        </div>

        <div className="swarm-hud-actions">
          {/* Speed switcher */}
          <button
            type="button"
            className={`swarm-pill-btn ${speed === 1 ? 'active' : ''}`}
            onClick={() => setSpeed(1)}
            title="Standard Swarm Speed"
          >
            1×
          </button>
          <button
            type="button"
            className={`swarm-pill-btn ${speed === 2 ? 'active' : ''}`}
            onClick={() => setSpeed(2)}
            title="Accelerated Swarm Speed"
          >
            2× Turbo
          </button>

          {/* Close / Dismiss */}
          <button
            type="button"
            className="swarm-exit-btn"
            onClick={onClose}
            aria-label="Exit Swarm Mode"
            title="Close Swarm Effect (Esc)"
          >
            <X size={16} />
            <span>Stop Swarm</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

