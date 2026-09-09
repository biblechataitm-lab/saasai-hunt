'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, TrendingUp } from 'lucide-react';

export function HeroLanding() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const children = hero.querySelectorAll('.saas-animate');
    children.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(24px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, 100 + i * 100);
    });
  }, []);

  return (
    <section ref={heroRef} className="saas-hero">
      <div className="saas-hero-bg" aria-hidden="true" />
      <div className="saas-hero-container">
        <div className="saas-hero-content">
          <div className="saas-animate saas-hero-badge">
            <span>The #1 SaaS Product Discovery Platform</span>
          </div>
          <h1 className="saas-animate saas-hero-title">
            Discover SaaS Products That{' '}
            <span className="saas-accent-text">Actually Ship</span>
          </h1>
          <p className="saas-animate saas-hero-subtitle">
            Explore 1,500+ curated SaaS products — from AI-powered platforms and no-code builders to analytics dashboards and team collaboration tools.
          </p>
          <form
            className="saas-animate saas-hero-search"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.querySelector('input');
              if (input?.value.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
              }
            }}
          >
            <Search size={16} className="saas-hero-search-icon" />
            <input type="text" placeholder="Search SaaS products, platforms..." />
            <button type="submit">Explore <ArrowRight size={14} /></button>
          </form>
          <div className="saas-animate saas-hero-tags">
            <Link href="/category/ai" className="saas-tag">AI SaaS</Link>
            <Link href="/category/productivity" className="saas-tag">Productivity</Link>
            <Link href="/category/developer-tools" className="saas-tag">Dev Platforms</Link>
            <Link href="/trends" className="saas-tag saas-tag-hot">
              <TrendingUp size={12} /> Trending
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
