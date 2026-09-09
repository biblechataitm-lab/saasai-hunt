import React from 'react';
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
                <li><a href="/">Today's Launches</a></li>
                <li><a href="/trends">Trending</a></li>
                <li><a href="/collections/this-week">Weekly Top</a></li>
                <li><a href="/collections/this-month">Monthly Top</a></li>
              </ul>
            </div>
            <div>
              <h4 className="saas-footer-heading">Categories</h4>
              <ul>
                <li><a href="/category/ai-saas">AI SaaS</a></li>
                <li><a href="/category/no-code">No-Code</a></li>
                <li><a href="/category/productivity">Productivity</a></li>
                <li><a href="/category/analytics">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="saas-footer-heading">Directory</h4>
              <ul>
                <li><a href="/submit">Submit Product</a></li>
                <li><a href="/sponsor">Sponsor</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/terms">Terms</a></li>
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
