import type { Product, ProductPage, GetProductsOptions, SiteConfig } from './types';
import { request } from './client';

const DEFAULT_SITE: SiteConfig = {
  key: 'mock-site',
  name: 'SaaSAI Hunt',
  domain: 'example.com',
  category: 'tech',
  tags: ['ai', 'saas'],
  status: 'live',
  statusMessage: null,
  slots: [{ key: 'sidebar-1', slotType: 'sidebar', format: 'native' }],
};

export async function getSiteConfig(timeoutMs?: number): Promise<SiteConfig | null> {
  const data = await request<{ site: SiteConfig }>('/api/v1/site', {}, timeoutMs, 'getSiteConfig');
  return data?.site ?? DEFAULT_SITE;
}

export async function getProducts(options: GetProductsOptions = {}): Promise<ProductPage> {
  const data = await request<ProductPage>(
    '/api/v1/catalog/products',
    {
      tags: options.tags?.join(','),
      category: options.category,
      q: options.q,
      since: options.since,
      sort: options.sort,
      limit: options.limit ? String(options.limit) : undefined,
      cursor: options.cursor,
    },
    options.timeoutMs,
    'getProducts',
  );

  // If specific tag filter yielded 0 products from live database, fetch all available live products
  if (!data || !data.products || data.products.length === 0) {
    const liveAll = await request<ProductPage>(
      '/api/v1/catalog/products',
      {
        q: options.q,
        since: options.since,
        sort: options.sort,
        limit: options.limit ? String(options.limit) : undefined,
      },
      options.timeoutMs,
      'getProducts',
    );
    if (liveAll && liveAll.products && liveAll.products.length > 0) {
      return liveAll;
    }
    return {
      products: [],
      nextCursor: null,
      appliedTags: [],
    };
  }

  return data;
}

export async function getProduct(id: string, timeoutMs?: number): Promise<Product | null> {
  const data = await request<{ product: Product }>(
    `/api/v1/catalog/products/${encodeURIComponent(id)}`,
    {},
    timeoutMs,
    'getProduct',
  );
  return data?.product ?? null;
}
