import type { Product, ProductPage, GetProductsOptions, SiteConfig } from './types';
import { request, mockMode } from './client';

/**
 * The directory's content: which products this site lists, and what the site
 * itself is currently configured to be.
 *
 * Separate from getAd() because these are not advertising. Nothing here is
 * billed and nothing here is an impression — a product shown from the catalog
 * costs an advertiser nothing. Paid placement is getAd(). Keeping them apart
 * means it is never ambiguous which one a unit on the page came from.
 */

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mock-1',
    title: 'Prime Agent',
    tagline: 'An open-source, self-improving coding harness',
    description: 'Built around two abstractions: the Recursive Language Model and the Continual Harness.',
    logo: 'https://placehold.co/96x96/1e293b/94a3b8?text=PA',
    link: 'https://example.com/prime-agent',
    category: 'AI',
    tags: ['ai', 'developer-tools'],
    techStack: ['TypeScript', 'Python'],
    coverImages: [],
    upvotes: 128,
    launchedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    maker: { name: 'Ada Reyes', username: 'ada', avatar: 'https://placehold.co/64x64/334155/cbd5e1?text=A' },
  },
  {
    id: 'mock-2',
    title: 'Paritok',
    tagline: 'Compress the tools, files and history your coding agent sends',
    description: 'Save up to 85% on your token bill and run 3x longer sessions.',
    logo: 'https://placehold.co/96x96/1e293b/94a3b8?text=PT',
    link: 'https://example.com/paritok',
    category: 'AI',
    tags: ['ai'],
    techStack: ['Rust'],
    coverImages: [],
    upvotes: 74,
    launchedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    maker: { name: 'Ken Obi', username: 'ken', avatar: 'https://placehold.co/64x64/334155/cbd5e1?text=K' },
  },
  {
    id: 'mock-3',
    title: 'OmniBiz POS',
    tagline: 'POS, inventory, QR ordering and billing in one platform',
    description: 'Manage customer orders, reservations and multiple stores from one place.',
    logo: 'https://placehold.co/96x96/1e293b/94a3b8?text=OB',
    link: 'https://example.com/omnibiz',
    category: 'E-commerce',
    tags: ['saas', 'e-commerce'],
    techStack: ['Next.js'],
    coverImages: [],
    upvotes: 31,
    launchedAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    maker: null,
  },
];

const MOCK_SITE: SiteConfig = {
  key: 'mock-site',
  name: 'Mock Directory',
  domain: 'example.com',
  category: 'tech',
  tags: ['ai', 'saas'],
  status: 'live',
  statusMessage: null,
  slots: [{ key: 'sidebar-1', slotType: 'sidebar', format: 'native' }],
};

/**
 * What this site is and whether it is open.
 *
 * Call it on every request. It is how the operator takes a site into
 * maintenance or off the air without deploying that site's code — a site that
 * does not check this cannot be controlled centrally at all.
 *
 * Returns null only when the backend is unreachable or the key is rejected. A
 * site should treat null as "carry on as normal": going dark because a status
 * check timed out would be worse than the problem it guards against.
 */
export async function getSiteConfig(timeoutMs?: number): Promise<SiteConfig | null> {
  if (mockMode()) return MOCK_SITE;

  const data = await request<{ site: SiteConfig }>('/api/v1/site', {}, timeoutMs, 'getSiteConfig');
  return data?.site ?? null;
}

/**
 * The products this directory lists.
 *
 * The site's own tags are applied by the backend, so the usual call takes no
 * arguments at all — a directory asks for products, not for "products tagged
 * saas". An empty list is a normal answer, not an error.
 */
export async function getProducts(options: GetProductsOptions = {}): Promise<ProductPage> {
  const mock = mockMode();
  if (mock) {
    if (mock === 'empty') return { products: [], nextCursor: null, appliedTags: [] };
    const sorted =
      options.sort === 'top' ? [...MOCK_PRODUCTS].sort((a, b) => b.upvotes - a.upvotes) : MOCK_PRODUCTS;
    return {
      products: sorted.slice(0, options.limit ?? sorted.length),
      nextCursor: null,
      appliedTags: MOCK_SITE.tags,
    };
  }

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

  // A failed request degrades to an empty directory rather than an exception,
  // so a page that renders a list never has to guard against a throw.
  return data ?? { products: [], nextCursor: null, appliedTags: [] };
}

/** One product, for a directory's detail page. Null when it does not exist. */
export async function getProduct(id: string, timeoutMs?: number): Promise<Product | null> {
  if (mockMode()) return MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0];

  const data = await request<{ product: Product }>(
    `/api/v1/catalog/products/${encodeURIComponent(id)}`,
    {},
    timeoutMs,
    'getProduct',
  );
  return data?.product ?? null;
}
