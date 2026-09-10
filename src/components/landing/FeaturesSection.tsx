'use client';

import React from 'react';

export function FeaturesSection() {
  return (
    <section className="swiss-grid-section container">
  <div className="swiss-section-header">
    <span className="swiss-label">02 / ATTRIBUTES</span>
    <h2>The Swiss Directory Principles</h2>
  </div>
  <div className="swiss-table-grid">
    <div className="swiss-cell">
      <span className="swiss-idx">01</span>
      <h3>Extreme Typographic Clarity</h3>
      <p>Pure mathematical sans-serif ratios. No gratuitous decorative clutter, only high-contrast utility.</p>
    </div>
    <div className="swiss-cell">
      <span className="swiss-idx">02</span>
      <h3>Zero-Telemetry Privacy</h3>
      <p>Cookieless, fingerprintless publisher directory delivering privacy-first software discovery.</p>
    </div>
    <div className="swiss-cell">
      <span className="swiss-idx">03</span>
      <h3>100% Verified Software</h3>
      <p>Live functional URLs, independent engineering reviews, and production-tested API reliability.</p>
    </div>
  </div>
</section>
  );
}
