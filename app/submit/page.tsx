import React from 'react';
import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/ads';
import { Rocket, ExternalLink, Globe, CheckSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Launch a Product — SaaSHunt',
  description: 'Submit your SaaS tool to launch across our entire network of product directories.',
};

export default async function SubmitPage() {
  const config = await getSiteConfig();

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="swiss-label" style={{ color: 'var(--swiss-red)' }}>Maker Launchpad</span>
        <h1 className="swiss-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Launch Your Product
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Launch your product once on our central network, and automatically appear across {config?.name || 'SaaSHunt'} and all matching niche directories.
        </p>
      </div>

      <div className="sidebar-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>How Launch Sync Works</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--swiss-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
              1
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Submit to the Central Network</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Fill out your product title, tagline, logo, link, maker bio, and select relevant tags (e.g. <code>saas</code>, <code>ai</code>, <code>developer-tools</code>).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-bright)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
              2
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Automatic Niche Distribution</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Our backend instantly routes your product to every directory in the network that lists your product tags.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-bright)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
              3
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Instant Visibility & Upvotes</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Your product goes live immediately on {config?.name || 'SaaSHunt'}, receiving upvotes and referral traffic from our directory visitors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-bright)', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>Ready to Launch?</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Submit your product through the main network console to get listed today.
        </p>
        <a
          href="https://peerlist.io"
          target="_blank"
          rel="noopener"
          className="btn-swiss-primary"
          style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
        >
          Submit Product to Network <Rocket size={16} />
        </a>
      </div>
    </div>
  );
}
