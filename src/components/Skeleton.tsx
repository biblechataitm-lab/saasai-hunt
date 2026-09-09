import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="product-card">
      <div className="skeleton product-logo" />
      <div className="product-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div className="skeleton" style={{ width: '180px', height: '20px' }} />
          <div className="skeleton" style={{ width: '50px', height: '36px' }} />
        </div>
        <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
        <div className="skeleton" style={{ width: '70%', height: '16px', marginBottom: '12px' }} />
        <div className="skeleton" style={{ width: '40%', height: '14px' }} />
      </div>
    </div>
  );
}

export function ProductListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="sidebar-card">
      <div className="skeleton" style={{ width: '120px', height: '14px', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
      <div className="skeleton" style={{ width: '85%', height: '16px' }} />
    </div>
  );
}
