'use client';

import React from 'react';

const CATEGORIES = [
  {
    "label": "All",
    "path": "/"
  },
  {
    "label": "Micro-SaaS",
    "path": "/category/saas"
  },
  {
    "label": "AI Tools",
    "path": "/category/ai"
  },
  {
    "label": "Developer Tools",
    "path": "/category/developer-tools"
  },
  {
    "label": "Productivity",
    "path": "/category/productivity"
  },
  {
    "label": "Marketing",
    "path": "/category/marketing"
  },
  {
    "label": "Commerce",
    "path": "/category/e-commerce"
  }
];

export function CategoryChips({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="category-chips-wrapper">
      <div className="category-chips-scroll category-chips-list">
        {CATEGORIES.map((cat) => {
          const isAll = cat.path === '/';
          const isActive = isAll ? !activeCategory : activeCategory === cat.path.replace('/category/', '');
          return (
            <a
              key={cat.path}
              href={cat.path}
              className={`category-chip ${isActive ? 'active chip-active' : ''}`}
            >
              {cat.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
