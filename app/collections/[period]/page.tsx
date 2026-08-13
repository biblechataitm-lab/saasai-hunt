import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/ads';
import { ProductListWithPagination } from '@/components/ProductListWithPagination';
import { Sidebar } from '@/components/Sidebar';
import { ProductListSkeleton, SidebarSkeleton } from '@/components/Skeleton';

export const revalidate = 0;

interface CollectionsPageProps {
  params: Promise<{ period: string }>;
}

export async function generateMetadata({ params }: CollectionsPageProps): Promise<Metadata> {
  const { period } = await params;
  const periodLabel = period === 'this-week' ? 'This Week' : period === 'this-month' ? 'This Month' : 'Featured';
  return {
    title: `Top SaaS Products ${periodLabel} — SaaSHunt`,
    description: `Curated collection of SaaS products and tools launched ${periodLabel.toLowerCase()}.`,
  };
}

async function CollectionsFeed({ since }: { since: 'week' | 'month' }) {
  const page = await getProducts({ since });

  return (
    <ProductListWithPagination
      initialProducts={page.products}
      initialNextCursor={page.nextCursor}
      fetchOptions={{ since }}
      emptyTitle="No Products in Collection"
      emptyDescription="No launches recorded for this period yet."
    />
  );
}

export default async function CollectionsPage({ params }: CollectionsPageProps) {
  const { period } = await params;

  let since: 'week' | 'month' | null = null;
  let title = '';
  let subtitle = '';

  if (period === 'this-week') {
    since = 'week';
    title = "This Week's Top SaaS";
    subtitle = 'The most popular software launches from the past 7 days';
  } else if (period === 'this-month') {
    since = 'month';
    title = "This Month's Top SaaS";
    subtitle = 'Top software launches from the past 30 days';
  } else {
    notFound();
  }

  return (
    <div className="container main-layout">
      <section>
        <div className="section-header">
          <div>
            <h1 className="section-title">{title}</h1>
            <p className="section-subtitle">{subtitle}</p>
          </div>
        </div>

        <Suspense fallback={<ProductListSkeleton count={4} />}>
          <CollectionsFeed since={since} />
        </Suspense>
      </section>

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
