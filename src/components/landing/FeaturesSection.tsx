'use client';

import React from 'react';

export function FeaturesSection() {
  return (
    <section class="swiss-grid-section container">
  <div class="swiss-section-header">
    <span class="swiss-label">02 / ATTRIBUTES</span>
    <h2>The Swiss Directory Principles</h2>
  </div>
  <div class="swiss-table-grid">
    <div class="swiss-cell">
      <span class="swiss-idx">01</span>
      <h3>Extreme Typographic Clarity</h3>
      <p>Pure mathematical sans-serif ratios. No gratuitous decorative clutter, only high-contrast utility.</p>
    </div>
    <div class="swiss-cell">
      <span class="swiss-idx">02</span>
      <h3>Zero-Telemetry Privacy</h3>
      <p>Cookieless, fingerprintless publisher directory delivering privacy-first software discovery.</p>
    </div>
    <div class="swiss-cell">
      <span class="swiss-idx">03</span>
      <h3>100% Verified Software</h3>
      <p>Live functional URLs, independent engineering reviews, and production-tested API reliability.</p>
    </div>
  </div>
</section>
  );
}
