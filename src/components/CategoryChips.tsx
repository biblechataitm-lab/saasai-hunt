'use client';

import React, { useEffect, useState } from 'react';

const CATEGORIES = [
  { label: 'All', path: '/' },
  { label: 'AI & ML', path: '/category/ai' },
  { label: 'Developer Tools', path: '/category/developer-tools' },
  { label: 'Productivity', path: '/category/productivity' },
  { label: 'Search & Data', path: '/category/search-data' },
  { label: 'Automation', path: '/category/automation' },
  { label: 'Design & Media', path: '/category/design' },
];

export function CategoryChips({ activeCategory }: { activeCategory?: string }) {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <div className="category-chips-wrapper">
      <div className="category-chips-list">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory
            ? cat.path.toLowerCase() === `/category/${activeCategory.toLowerCase()}`
            : currentPath === cat.path || (cat.path === '/' && (currentPath === '' || currentPath === '/'));

          return (
            <a
              key={cat.path}
              href={cat.path}
              className={`category-chip ${isActive ? 'active' : ''}`}
            >
              {cat.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
