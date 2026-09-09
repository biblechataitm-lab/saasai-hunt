'use client';

import React from 'react';

const STATS = [
  { value: '1,500+', label: 'SaaS Products' },
  { value: '30K+', label: 'Monthly Visitors' },
  { value: '100+', label: 'Daily Submissions' },
  { value: '96%', label: 'Satisfaction Rate' },
];

export function StatsSection() {
  return (
    <section className="saas-stats">
      <div className="saas-stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="saas-stat-card">
            <div className="saas-stat-value">{s.value}</div>
            <div className="saas-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
