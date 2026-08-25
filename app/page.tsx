import React, { Suspense } from 'react';
import { getProducts } from '@/lib/ads';
import { HeroSection } from '@/components/HeroSection';
import { LandingSections } from '@/components/LandingSections';
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
      emptyDescription="No products have launched on this directory today yet. Be the first to launch one!"
    />
  );
}

export default function HomePage() {
  return (
    <div className="container">
      <HeroSection />
      <div className="main-layout">
        <section>
          <CategoryChips />

          <div className="section-header">
            <div>
              <h2 className="section-title">Today's Launches</h2>
              <p className="section-subtitle">
                Discover the newest B2B SaaS tools and enterprise software
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
      <LandingSections />
    </div>
  );
}


