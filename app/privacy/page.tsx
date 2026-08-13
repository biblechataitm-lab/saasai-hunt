import React from 'react';
import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/ads';

export const metadata: Metadata = {
  title: 'Privacy Policy — SaaSHunt',
  description: 'Privacy Policy for SaaSHunt product directory.',
};

export default async function PrivacyPage() {
  const config = await getSiteConfig();

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '3rem', paddingBottom: '5rem' }}>
      <h1 className="swiss-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
        Privacy Policy
      </h1>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p>
          At {config?.name || 'SaaSHunt'}, we respect your privacy and are committed to protecting your personal data.
        </p>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800, marginTop: '1rem' }}>
          Visitor Identification & Cookies
        </h2>
        <p>
          We use a first-party cookie (<code>plads_vid</code>) on our domain solely for frequency capping and viewability verification for sponsored listings. We do not use third-party tracking cookies or cross-site behavioral profiling.
        </p>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800, marginTop: '1rem' }}>
          Outbound Links
        </h2>
        <p>
          Products listed on this directory link directly to third-party software websites. When you click an external product link, you leave our site and are subject to that site's privacy practices.
        </p>
      </div>
    </div>
  );
}
