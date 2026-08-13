import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/ads';
import { CategoryChips } from '@/components/CategoryChips';
import { ProductListWithPagination } from '@/components/ProductListWithPagination';
import { Sidebar } from '@/components/Sidebar';
import { ProductListSkeleton, SidebarSkeleton } from '@/components/Skeleton';

export const revalidate = 0;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${capitalized} SaaS Tools & Products — SaaSHunt`,
    description: `Discover top ${capitalized} products and tools launched on SaaSHunt.`,
  };
}

async function CategoryFeed({ category }: { category: string }) {
  const page = await getProducts({ category, sort: 'new' });

  return (
    <ProductListWithPagination
      initialProducts={page.products}
      initialNextCursor={page.nextCursor}
      fetchOptions={{ category, sort: 'new' }}
      emptyTitle={`No ${category} Products Found`}
      emptyDescription={`No products in the "${category}" category have been listed yet.`}
    />
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container main-layout">
      <section>
        <CategoryChips activeCategory={capitalized} />

        <div className="section-header">
          <div>
            <h1 className="section-title">{capitalized} Products</h1>
            <p className="section-subtitle">
              Browse top {capitalized} tools and products for small teams
            </p>
          </div>
        </div>

        <Suspense fallback={<ProductListSkeleton count={3} />}>
          <CategoryFeed category={category} />
        </Suspense>
      </section>

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
