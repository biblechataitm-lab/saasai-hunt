import React from 'react';
import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/ads';
import { ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sponsor & Advertise — SaaSHunt',
  description: 'Promote your SaaS tool or software to thousands of active makers and software buyers.',
};

export default async function SponsorPage() {
  const config = await getSiteConfig();

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="swiss-label" style={{ color: 'var(--swiss-red)' }}>Sponsorship Opportunities</span>
        <h1 className="swiss-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Advertise on {config?.name || 'SaaSHunt'}
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Reach thousands of founders, software engineers, and small team decision-makers looking for the next tool to power their workflow.
        </p>
      </div>

      <div className="sidebar-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Why Sponsor SaaSHunt?</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle size={18} style={{ color: 'var(--swiss-red)', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>High-Intent Audience:</strong> Directory visitors are actively seeking SaaS solutions, developer tools, and productivity products.
            </span>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle size={18} style={{ color: 'var(--swiss-red)', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Native Native Ad Units:</strong> Placements sit naturally in sidebar feeds, maintaining high CTR and respecting visitor experience.
            </span>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <ShieldCheck size={18} style={{ color: 'var(--swiss-red)', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Guaranteed Viewability:</strong> Ads are only billed when 50%+ visible continuously for at least 1 second.
            </span>
          </li>
        </ul>
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-bright)', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>Book a Placement via Rate Card</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          All ad inventory across SaaSHunt and the network is booked centrally through our advertiser portal.
        </p>
        <a
          href="https://peerlist.io"
          target="_blank"
          rel="noopener"
          className="btn-swiss-primary"
          style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
        >
          View Rate Card & Book Slot <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
