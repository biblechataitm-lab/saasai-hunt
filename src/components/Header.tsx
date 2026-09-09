'use client';

import React from 'react';

export function Header({ siteName = 'SaaSAI Hunt' }: { siteName?: string }) {
  return (
    <header className="swiss-navbar">
      <div className="container swiss-nav-inner">
        <a href="/" className="swiss-logo">
          <span className="swiss-cross">+</span>
          <span>SAASAI HUNT</span>
        </a>
        <div className="swiss-nav-links">
        <a href="/">ARCHIVE</a>
        <a href="/trends">INDEX</a>
        <a href="/category/saas">MICRO-SAAS</a>
        <a href="/sponsor">SPONSOR</a>
        </div>
        <a href="/submit" className="swiss-submit-btn">SUBMIT PRODUCT</a>
      </div>
    </header>
  );
}
