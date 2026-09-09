import React from 'react';
import Link from 'next/link';
import { getAd, AdSlot, getSiteConfig } from '@/lib/ads';
import { Compass, Calendar, ArrowRight } from 'lucide-react';

export async function Sidebar() {
  const config = await getSiteConfig();
  const slotKeys = config?.slots?.map((s) => s.key) ?? ['sidebar-1'];
  
  // Fetch ad for the primary sidebar slot
  const primarySlot = slotKeys[0] || 'sidebar-1';
  const ad = await getAd({ slot: primarySlot });

  return (
    <aside>
      {/* About Directory Card */}
      <div className="sidebar-card">
        <div className="sidebar-card-title">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={14} /> About {config?.name || 'SaaSHunt'}
          </span>
        </div>
        <p className="sidebar-card-body">
          {config?.name || 'SaaSHunt'} is a curated product launch directory listing top-tier SaaS tools, developer software, and AI applications for makers and small teams.
        </p>
      </div>

      {/* Featured Collections Card */}
      <div className="sidebar-card">
        <div className="sidebar-card-title">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} /> Collections
          </span>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <Link href="/collections/this-week" className="collection-link">
            <span>This Week's Top SaaS</span>
            <ArrowRight size={14} />
          </Link>
          <Link href="/collections/this-month" className="collection-link">
            <span>This Month's Top SaaS</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Sponsor Ad Unit (Renders NOTHING if ad is null) */}
      <AdSlot ad={ad} className="sponsor-ad-wrapper" />
    </aside>
  );
}
