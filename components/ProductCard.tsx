'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, ChevronUp, Clock } from 'lucide-react';
import type { Product } from '@/lib/ads';
import { SafeImage } from '@/components/SafeImage';

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if the user clicked an interactive anchor/button
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    router.push(`/product/${encodeURIComponent(product.id)}`);
  };

  const formattedDate = product.launchedAt
    ? new Date(product.launchedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div
      onClick={handleCardClick}
      className="product-card"
      style={{ cursor: 'pointer' }}
    >
      {/* Logo with safe image fallback */}
      <SafeImage
        src={product.logo || ''}
        alt={product.title}
        fallbackText={product.title.slice(0, 2).toUpperCase()}
        className="product-logo"
      />

      {/* Content */}
      <div className="product-content">
        <div className="product-header-row">
          <div className="product-title-group">
            <a
              href={product.link}
              target="_blank"
              rel="noopener"
              className="product-title"
              onClick={(e) => e.stopPropagation()}
            >
              {product.title}
              <ExternalLink className="external-link-icon" size={14} />
            </a>
            {product.category && (
              <span className="category-badge">{product.category}</span>
            )}
          </div>

          <div className="upvote-badge">
            <ChevronUp className="upvote-icon" size={14} />
            <span>{product.upvotes ?? 0}</span>
          </div>
        </div>

        <p className="product-tagline">{product.tagline}</p>

        <div className="product-footer-meta">
          {product.maker && (
            <div className="meta-item">
              <SafeImage
                src={product.maker.avatar}
                alt={product.maker.name}
                fallbackText={product.maker.name.charAt(0)}
                className="maker-avatar"
              />
              <span>{product.maker.name}</span>
            </div>
          )}

          {formattedDate && (
            <div className="meta-item">
              <Clock size={12} />
              <span>{formattedDate}</span>
            </div>
          )}

          {product.techStack && product.techStack.length > 0 && (
            <div className="meta-item">
              <span>{product.techStack.slice(0, 3).join(' • ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
