'use client';

import React from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'All', path: '/' },
  { name: 'SaaS', path: '/category/saas' },
  { name: 'AI', path: '/category/ai' },
  { name: 'Developer Tools', path: '/category/developer-tools' },
  { name: 'E-commerce', path: '/category/e-commerce' },
  { name: 'Productivity', path: '/category/productivity' },
  { name: 'Marketing', path: '/category/marketing' },
];

export function CategoryChips({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="category-bar">
      {CATEGORIES.map((cat) => {
        const isActive =
          activeCategory === cat.name ||
          (activeCategory === undefined && cat.path === '/');

        return (
          <Link
            key={cat.name}
            href={cat.path}
            className={`chip ${isActive ? 'active' : ''}`}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
