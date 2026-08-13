import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/ads';
import { ProductListWithPagination } from '@/components/ProductListWithPagination';
import { Sidebar } from '@/components/Sidebar';
import { ProductListSkeleton, SidebarSkeleton } from '@/components/Skeleton';
import { Search } from 'lucide-react';

export const revalidate = 0;

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}" — SaaSHunt` : 'Search SaaS Products — SaaSHunt',
    description: `Search directory listings for ${q || 'SaaS tools'}.`,
  };
}

async function SearchFeed({ query }: { query?: string }) {
  if (!query) {
    return (
      <div className="empty-state">
        <Search size={44} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <h3 className="empty-state-title">Enter a search query</h3>
        <p className="empty-state-desc">Use the search bar above to search by name, tagline, or description.</p>
      </div>
    );
  }

  const page = await getProducts({ q: query });

  return (
    <ProductListWithPagination
      initialProducts={page.products}
      initialNextCursor={page.nextCursor}
      fetchOptions={{ q: query }}
      emptyTitle={`No results for "${query}"`}
      emptyDescription="Try checking for typos or searching with different keywords."
    />
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return (
    <div className="container main-layout">
      <section>
        <div className="section-header">
          <div>
            <h1 className="section-title">
              {q ? `Search: "${q}"` : 'Search Directory'}
            </h1>
            <p className="section-subtitle">
              {q ? `Showing results matching "${q}"` : 'Type keywords in the search bar above'}
            </p>
          </div>
        </div>

        <Suspense fallback={<ProductListSkeleton count={3} />}>
          <SearchFeed query={q} />
        </Suspense>
      </section>

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
