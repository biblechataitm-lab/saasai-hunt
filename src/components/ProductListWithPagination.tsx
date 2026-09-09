'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import type { Product, GetProductsOptions } from '@/lib/ads';
import { fetchMoreProductsAction } from '@/lib/actions';
import { PackageX, Loader2 } from 'lucide-react';

interface ProductListProps {
  initialProducts: Product[];
  initialNextCursor: string | null;
  fetchOptions?: GetProductsOptions;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ProductListWithPagination({
  initialProducts,
  initialNextCursor,
  fetchOptions = {},
  emptyTitle = 'No products found',
  emptyDescription = 'There are currently no products listed matching this criteria. Check back soon!',
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (!nextCursor || isLoading) return;
    setIsLoading(true);
    try {
      const page = await fetchMoreProductsAction({
        ...fetchOptions,
        cursor: nextCursor,
      });
      setProducts((prev) => [...prev, ...page.products]);
      setNextCursor(page.nextCursor);
    } catch {
      // Degrade silently
    } finally {
      setIsLoading(false);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <PackageX size={44} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <h3 className="empty-state-title">{emptyTitle}</h3>
        <p className="empty-state-desc">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {nextCursor && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="btn-swiss-outline"
            style={{ width: '100%', maxWidth: '240px', justifyContent: 'center', padding: '0.75rem' }}
          >
            {isLoading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Loader2 className="animate-spin" size={16} /> Loading...
              </span>
            ) : (
              'Load More Products'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
