'use client';

import React from 'react';

export function HeroLanding() {
  return (
    <section class="swiss-hero">
  <div class="swiss-container container">
    <div class="swiss-grid-meta">
      <span class="swiss-num">01 / ARCHIVE</span>
      <span class="swiss-red-badge">INTERNATIONAL STYLE</span>
      <span class="swiss-curation">STRICT CURATION</span>
    </div>
    <div class="swiss-hero-box">
      <div class="swiss-accent-bar"></div>
      <h1 class="swiss-title">
        SWISS DISPATCH: <br/><span class="swiss-red-text">SAAS &amp; SOFTWARE</span>
      </h1>
      <p class="swiss-desc">
        A minimalist directory built on rigorous typographic hierarchy, zero-tracking privacy, and verified product makers.
      </p>
      <div class="swiss-search-wrap">
        <input type="text" placeholder="FILTER ARCHIVE [RESEND, DUB, CAL]..." class="swiss-input" />
        <button class="swiss-search-btn">INDEX</button>
      </div>
    </div>
  </div>
</section>
  );
}
