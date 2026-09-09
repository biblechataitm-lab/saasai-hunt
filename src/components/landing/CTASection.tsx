'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';

export function CTASection() {
  return (
    <section className="saas-cta">
      <div className="saas-cta-glow" aria-hidden="true" />
      <div className="saas-cta-content">
        <h2 className="saas-cta-title">Get Your SaaS Discovered</h2>
        <p className="saas-cta-subtitle">Launch your SaaS product to 30K+ decision-makers, founders, and early adopters.</p>
        <div className="saas-cta-buttons">
          <Link href="/submit" className="saas-cta-btn-primary">
            <Rocket size={15} /> Submit Product
          </Link>
          <Link href="/sponsor" className="saas-cta-btn-secondary">
            Sponsor <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
