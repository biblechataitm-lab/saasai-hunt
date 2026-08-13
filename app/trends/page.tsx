import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/ads';
import { CategoryChips } from '@/components/CategoryChips';
import { ProductListWithPagination } from '@/components/ProductListWithPagination';
import { Sidebar } from '@/components/Sidebar';
import { ProductListSkeleton, SidebarSkeleton } from '@/components/Skeleton';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Trending SaaS Products & Tools — SaaSHunt',
  description: 'Most upvoted and trending SaaS products ranked by community votes.',
};

async function TrendingFeed() {
  const page = await getProducts({ sort: 'top' });

  return (
    <ProductListWithPagination
      initialProducts={page.products}
      initialNextCursor={page.nextCursor}
      fetchOptions={{ sort: 'top' }}
      emptyTitle="No Trending Products Yet"
      emptyDescription="Trending products will appear as community votes accumulate."
    />
  );
}

export default function TrendingPage() {
  return (
    <div className="container main-layout">
      <section>
        <CategoryChips />

        <div className="section-header">
          <div>
            <h1 className="section-title">Trending Leaderboard</h1>
            <p className="section-subtitle">
              The highest upvoted SaaS products and maker tools overall
            </p>
          </div>
        </div>

        <Suspense fallback={<ProductListSkeleton count={4} />}>
          <TrendingFeed />
        </Suspense>
      </section>

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
