'use client';

import React from 'react';

export function Header({ siteName = 'SaaSAI Hunt' }: { siteName?: string }) {
  return (
    <header class="swiss-navbar">
  <div class="container swiss-nav-inner">
    <a href="/" class="swiss-logo">
      <span class="swiss-cross">+</span>
      <span>SAASAI HUNT</span>
    </a>
    <div class="swiss-nav-links">
      <a href="/">ARCHIVE</a>
      <a href="/trends">INDEX</a>
      <a href="/category/saas">CATEGORIES</a>
      <a href="/sponsor">SPONSOR</a>
    </div>
    <a href="/submit" class="swiss-submit-btn">SUBMIT PRODUCT</a>
  </div>
</header>
  );
}
