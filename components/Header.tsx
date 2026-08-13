'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Search, Sparkles, PlusCircle } from 'lucide-react';

export function Header({ siteName = 'SaaSHunt' }: { siteName?: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'all' }
      );
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header ref={headerRef} className="header-wrapper">
      <div className="container header-container">
        <Link href="/" className="header-brand">
          <span>{siteName}</span>
          <span className="header-brand-dot" />
        </Link>

        <form onSubmit={handleSearchSubmit} className="header-search">
          <Search className="header-search-icon" size={16} />
          <input
            type="text"
            placeholder="Search SaaS products, AI tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <nav className="header-nav">
          <Link
            href="/trends"
            className={`header-nav-link ${pathname === '/trends' ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> Trends
            </span>
          </Link>
          <Link
            href="/sponsor"
            className={`header-nav-link ${pathname === '/sponsor' ? 'active' : ''}`}
          >
            Sponsor
          </Link>
          <Link href="/submit" className="btn-swiss-primary">
            <PlusCircle size={14} /> Launch Product
          </Link>
        </nav>
      </div>
    </header>
  );
}
