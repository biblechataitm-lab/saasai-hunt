import React from 'react';
import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/ads';

export const metadata: Metadata = {
  title: 'Terms of Service — SaaSHunt',
  description: 'Terms of Service for SaaSHunt product directory.',
};

export default async function TermsPage() {
  const config = await getSiteConfig();

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '3rem', paddingBottom: '5rem' }}>
      <h1 className="swiss-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
        Terms of Service
      </h1>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p>
          By accessing or using {config?.name || 'SaaSHunt'}, you agree to be bound by these Terms of Service.
        </p>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800, marginTop: '1rem' }}>
          Product Listings
        </h2>
        <p>
          Product details, taglines, and descriptions are submitted by makers or aggregated via central backend channels. We do not endorse or guarantee third-party software products listed on the platform.
        </p>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800, marginTop: '1rem' }}>
          Sponsored Units & Disclosures
        </h2>
        <p>
          Sponsored placements are clearly designated with a sponsored disclosure label. Clicking a sponsored unit redirects through our ad network for view counting and analytics.
        </p>
      </div>
    </div>
  );
}
