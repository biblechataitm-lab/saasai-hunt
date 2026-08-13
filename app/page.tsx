import React, { Suspense } from 'react';
import { getProducts } from '@/lib/ads';
import { CategoryChips } from '@/components/CategoryChips';
import { ProductListWithPagination } from '@/components/ProductListWithPagination';
import { Sidebar } from '@/components/Sidebar';
import { ProductListSkeleton, SidebarSkeleton } from '@/components/Skeleton';

export const revalidate = 0; // Ensures fresh ad serving and data

async function LaunchesFeed() {
  const { products, nextCursor } = await getProducts({ sort: 'new' });

  return (
    <ProductListWithPagination
      initialProducts={products}
      initialNextCursor={nextCursor}
      fetchOptions={{ sort: 'new' }}
      emptyTitle="No Launches Today"
      emptyDescription="No SaaS products have launched on this directory today yet. Check back soon or submit a product!"
    />
  );
}

export default function HomePage() {
  return (
    <div className="container main-layout">
      <section>
        <CategoryChips />

        <div className="section-header">
          <div>
            <h1 className="section-title">Today's Launches</h1>
            <p className="section-subtitle">
              Discover the latest SaaS tools and software launched today
            </p>
          </div>
        </div>

        <Suspense fallback={<ProductListSkeleton count={4} />}>
          <LaunchesFeed />
        </Suspense>
      </section>

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
