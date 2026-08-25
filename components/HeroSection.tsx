'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, TrendingUp, ShieldCheck, Star, Users, ArrowUpRight, Search, Zap, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

const B2B_SHOWCASE = [
  {
    id: 'revops-ai',
    name: 'RevOps Autonomous AI Co-Pilot',
    category: 'Sales Intelligence & ARR Engine',
    metricVal: '3.4x',
    metricLabel: 'Pipeline Velocity Multiplier',
    stat: '84% automated meeting summaries & CRM sync',
    tier: 'Enterprise Ready',
  },
  {
    id: 'internal-stack',
    name: 'Low-Code Internal Ops Platform',
    category: 'DevOps & Custom Workflows',
    metricVal: '10x',
    metricLabel: 'Engineering Time Saved',
    stat: 'Connects directly to Postgres, Stripe, and GraphQL',
    tier: 'SOC-2 Type II',
  },
  {
    id: 'product-analytics',
    name: 'Open-Telemetry Product Analytics',
    category: 'Event Tracking & Feature Flags',
    metricVal: '99.99%',
    metricLabel: 'Event Ingestion Reliability',
    stat: 'Cookieless session replay & cohort conversion funnels',
    tier: 'GDPR Compliant',
  },
];

export function HeroSection() {
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const currentStack = B2B_SHOWCASE[activeStackIndex];

  return (
    <section className="saashunt-hero">
      <div className="saashunt-hero-grid">
        {/* Left: Enterprise B2B Value Proposition */}
        <div className="saashunt-hero-content">
          <div className="saashunt-badge">
            <span className="saashunt-badge-dot" />
            <span>Curated Enterprise B2B SaaS & AI Co-Pilots • 2026</span>
          </div>

          <h1 className="saashunt-title">
            The Definitive Index for <span className="saashunt-gradient-text">Enterprise B2B SaaS</span> & Revenue AI.
          </h1>

          <p className="saashunt-lead">
            Discover verified enterprise co-pilots, revenue intelligence platforms, customer retention stacks, automated billing software, and SOC-2 compliant tools.
          </p>

          {/* Search Box */}
          <form 
            action="/search" 
            method="GET" 
            className="saashunt-search-box"
            onSubmit={(e) => {
              if (!searchQuery.trim()) e.preventDefault();
            }}
          >
            <Search size={18} className="saashunt-search-icon" />
            <input
              type="text"
              name="q"
              placeholder="Search 2,900+ enterprise SaaS, RevOps tools, CRM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="saashunt-search-input"
            />
            <button type="submit" className="saashunt-search-btn">
              Explore SaaS
            </button>
          </form>

          {/* Category Chips */}
          <div className="saashunt-tags-row">
            <span className="saashunt-tags-label">Segments:</span>
            <div className="saashunt-tags-list">
              <Link href="/category/ai" className="saashunt-tag-pill">
                <Sparkles size={12} /> Enterprise AI
              </Link>
              <Link href="/category/productivity" className="saashunt-tag-pill">
                <TrendingUp size={12} /> RevOps & CRM
              </Link>
              <Link href="/category/developer-tools" className="saashunt-tag-pill">
                <Layers size={12} /> Analytics
              </Link>
              <Link href="/category/automation" className="saashunt-tag-pill">
                <Building2 size={12} /> Billing Ops
              </Link>
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="saashunt-metrics-strip">
            <div className="saashunt-metric-box">
              <span className="saashunt-metric-val">2,900+</span>
              <span className="saashunt-metric-desc">B2B Platforms</span>
            </div>
            <div className="saashunt-metric-divider" />
            <div className="saashunt-metric-box">
              <span className="saashunt-metric-val">$14B+</span>
              <span className="saashunt-metric-desc">ARR Tracked</span>
            </div>
            <div className="saashunt-metric-divider" />
            <div className="saashunt-metric-box">
              <span className="saashunt-metric-val">4.9/5</span>
              <span className="saashunt-metric-desc">Buyer Rating</span>
            </div>
          </div>
        </div>

        {/* Right: Modern Bento Grid Showcase */}
        <div className="saashunt-bento-wrapper">
          {/* Main Bento Hero Card */}
          <div className="bento-card-main">
            <div className="bento-main-header">
              <div className="bento-title-group">
                <span className="bento-pulse-red" />
                <span className="bento-header-title">Enterprise ROI & Stack Matrix</span>
              </div>
              <span className="bento-tier-badge">{currentStack.tier}</span>
            </div>

            {/* Stack Switcher */}
            <div className="bento-stack-tabs">
              {B2B_SHOWCASE.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStackIndex(idx)}
                  className={`bento-stack-btn ${activeStackIndex === idx ? 'active' : ''}`}
                  type="button"
                >
                  {s.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Metric Multiplier Showcase */}
            <div className="bento-metric-highlight">
              <div className="bento-multiplier-box">
                <span className="multiplier-value">{currentStack.metricVal}</span>
                <span className="multiplier-label">{currentStack.metricLabel}</span>
              </div>
              <div className="bento-details-col">
                <h4 className="bento-stack-name">{currentStack.name}</h4>
                <p className="bento-stat-desc">{currentStack.stat}</p>
              </div>
            </div>

            {/* Bottom Row inside Bento Card */}
            <div className="bento-mini-grid">
              <div className="bento-mini-item">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Zero-Trust Enterprise SSO Ready</span>
              </div>
              <div className="bento-mini-item">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>12k+ Verified B2B Reviews</span>
              </div>
            </div>

            {/* Footer Action */}
            <div className="bento-card-footer">
              <span className="bento-verified-text">Curated SaaS Directory</span>
              <Link href="/submit" className="bento-submit-link">
                Launch Your SaaS <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
