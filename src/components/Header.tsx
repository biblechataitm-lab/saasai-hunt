'use client';

import React from 'react';

export function Header({ siteName = 'SaaSAI Hunt' }: { siteName?: string }) {
  return (
    <header className="cinema-navbar">
      <div className="container cinema-nav-inner">
        <div className="cinema-nav-left">
          <a href="/" className="cinema-brand">
            <span className="cinema-clapper">▶</span>
            <span className="cinema-brand-text">SaaSAI<span className="cinema-dot">.</span>studio</span>
          </a>
          <span className="cinema-live-tag">
            <span className="cinema-rec-dot" />
            REEL 2026 · 4K PREMIERE
          </span>
        </div>

        <nav className="cinema-nav-links">
          <a href="/" className="cinema-nav-link active">Featured Rehearsals</a>
          <a href="/trends" className="cinema-nav-link">Box Office</a>
          <a href="/category/saas" className="cinema-nav-link">Generative Video</a>
          <a href="/sponsor" className="cinema-nav-link">Backstage</a>
        </nav>

        <div className="cinema-nav-right">
          <div className="cinema-fps-pill">
            <span className="fps-label">RENDER PIPELINE</span>
            <span className="fps-val">60 FPS · DCI-P3</span>
          </div>
          <a href="/submit" className="cinema-cta-btn">+ Submit Film/SaaS</a>
        </div>
      </div>
    </header>
  );
}
