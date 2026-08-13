import React from 'react';
import Link from 'next/link';

export function Footer({ siteName = 'SaaSHunt' }: { siteName?: string }) {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="header-brand">
              <span>{siteName}</span>
              <span className="header-brand-dot" />
            </Link>
            <p className="footer-brand-desc">
              The premier product launch directory for modern SaaS tools, AI applications, and maker software. Built on the Peerlist publishing network.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Directory</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Today's Launches</Link>
              </li>
              <li>
                <Link href="/trends">Trending Products</Link>
              </li>
              <li>
                <Link href="/collections/this-week">This Week</Link>
              </li>
              <li>
                <Link href="/collections/this-month">This Month</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Makers & Ads</h4>
            <ul className="footer-links">
              <li>
                <Link href="/submit">Submit Product</Link>
              </li>
              <li>
                <Link href="/sponsor">Advertise / Sponsor</Link>
              </li>
              <li>
                <Link href="/about">About Directory</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</span>
          <span>Powered by Peerlist Publishing Network</span>
        </div>
      </div>
    </footer>
  );
}
