import React from 'react';
import Link from 'next/link';
import { ExternalLink, MessageCircle, Mail } from 'lucide-react';

export function Footer({ siteName = 'saasai-hunt' }: { siteName?: string }) {
  return (
    <footer className="saas-footer">
      <div className="saas-footer-content">
        <div className="saas-footer-top">
          <div className="saas-footer-brand-area">
            <div className="saas-footer-brand"><span>{siteName}</span></div>
            <p className="saas-footer-tagline">The curated SaaS product directory. Discover, compare, and vote on the best software-as-a-service platforms.</p>
            <div className="saas-footer-socials">
              <a href="#" aria-label="Website"><ExternalLink size={16} /></a>
              <a href="#" aria-label="Community"><MessageCircle size={16} /></a>
              <a href="#" aria-label="Email"><Mail size={16} /></a>
            </div>
          </div>
          <div className="saas-footer-links-grid">
            <div>
              <h4 className="saas-footer-heading">Explore</h4>
              <ul>
                <li><Link href="/">Today's Launches</Link></li>
                <li><Link href="/trends">Trending</Link></li>
                <li><Link href="/collections/this-week">Weekly Top</Link></li>
                <li><Link href="/collections/this-month">Monthly Top</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="saas-footer-heading">Categories</h4>
              <ul>
                <li><Link href="/category/ai-saas">AI SaaS</Link></li>
                <li><Link href="/category/no-code">No-Code</Link></li>
                <li><Link href="/category/productivity">Productivity</Link></li>
                <li><Link href="/category/analytics">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="saas-footer-heading">Directory</h4>
              <ul>
                <li><Link href="/submit">Submit Product</Link></li>
                <li><Link href="/sponsor">Sponsor</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="saas-footer-bottom">
          <span>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</span>
          <span>Powered by the Publisher Ad Network</span>
        </div>
      </div>
    </footer>
  );
}
