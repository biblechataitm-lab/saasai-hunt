import React from 'react';
import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/ads';
import { Target, Layers, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — SaaSHunt',
  description: 'Learn about SaaSHunt mission and central network architecture.',
};

export default async function AboutPage() {
  const config = await getSiteConfig();
  const siteName = config?.name || 'SaaSHunt';
  const siteDomain = config?.domain || 'saashunt.com';
  const siteTags = config?.tags || ['saas', 'ai'];

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="swiss-label" style={{ color: 'var(--swiss-red)' }}>About Directory</span>
        <h1 className="swiss-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Mission & Architecture
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {siteName} is a high-performance product launch directory focused exclusively on {siteTags.join(', ')} products for makers, small teams, and engineers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="sidebar-card" style={{ padding: '1.5rem', margin: 0 }}>
          <Target size={24} style={{ color: 'var(--swiss-red)', marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Site Name</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{siteName}</p>
        </div>

        <div className="sidebar-card" style={{ padding: '1.5rem', margin: 0 }}>
          <Layers size={24} style={{ color: 'var(--swiss-red)', marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Configured Niche</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {siteTags.length > 0 ? siteTags.join(', ') : 'All SaaS Products'}
          </p>
        </div>
      </div>

      <div className="sidebar-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Network Architecture</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Each publishing site in our network is a brand and domain of its own. All sites read from a single shared backend, allowing makers to launch once while appearing across every matching directory automatically.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Domain: <code>{siteDomain}</code> | Status: <span style={{ color: 'var(--swiss-red)', fontWeight: 700 }}>{config?.status || 'live'}</span>
        </p>
      </div>
    </div>
  );
}
