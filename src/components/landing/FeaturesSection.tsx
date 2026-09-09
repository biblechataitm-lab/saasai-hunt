'use client';

import React from 'react';
import { Zap, BarChart3, Globe, Layers, Shield, TrendingUp } from 'lucide-react';

const FEATURES = [
  { icon: Zap, title: 'Live Rankings', desc: 'Real-time leaderboards powered by community votes and usage signals.' },
  { icon: BarChart3, title: 'Growth Metrics', desc: 'MRR trends, user counts, and market positioning for every SaaS.' },
  { icon: Globe, title: 'Global Coverage', desc: '30K+ monthly visitors from 120+ countries discovering new SaaS.' },
  { icon: Layers, title: 'Smart Stacks', desc: 'Compare SaaS products head-to-head across pricing, features, and integrations.' },
  { icon: Shield, title: 'Verified Reviews', desc: 'Every review is verified. No fake testimonials, just honest feedback.' },
  { icon: TrendingUp, title: 'Trend Radar', desc: 'Our AI surfaces rising SaaS categories before they hit mainstream.' },
];

export function FeaturesSection() {
  return (
    <section className="saas-features">
      <div className="saas-features-header">
        <h2 className="saas-section-title">
          Why <span className="saas-accent-text">SaaSAI Hunt</span>
        </h2>
        <p className="saas-section-subtitle">More than a directory — a curated ecosystem built for your workflow.</p>
      </div>
      <div className="saas-features-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="saas-feature-card">
            <div className="saas-feature-icon"><f.icon size={22} /></div>
            <h3 className="saas-feature-title">{f.title}</h3>
            <p className="saas-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
