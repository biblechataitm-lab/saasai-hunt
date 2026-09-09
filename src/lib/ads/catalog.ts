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
    "id": "sah-1",
    "title": "Resend",
    "tagline": "Email for developers with clean modern APIs, high deliverability, and React Email components",
    "link": "https://resend.com",
    "category": "Developer Tools",
    "upvotes": 510,
    "tags": [
      "email",
      "developer-tools",
      "react"
    ],
    "techStack": [
      "Next.js",
      "React Email",
      "AWS SES"
    ],
    "maker": {
      "name": "Zeno Rocha",
      "avatar": "https://placehold.co/64x64/e63946/ffffff?text=RS"
    }
  },
  {
    "id": "sah-2",
    "title": "Dub.co",
    "tagline": "The modern open-source link management engine with custom domains and conversion analytics",
    "link": "https://dub.co",
    "category": "Automation",
    "upvotes": 460,
    "tags": [
      "links",
      "analytics",
      "marketing"
    ],
    "techStack": [
      "Next.js",
      "Upstash",
      "Tailwind"
    ],
    "maker": {
      "name": "Steven Tey",
      "avatar": "https://placehold.co/64x64/3b82f6/ffffff?text=DB"
    }
  },
  {
    "id": "sah-3",
    "title": "Cal.com",
    "tagline": "Open-source scheduling infrastructure giving developers complete control over booking flows",
    "link": "https://cal.com",
    "category": "Automation",
    "upvotes": 430,
    "tags": [
      "calendar",
      "scheduling",
      "open-source"
    ],
    "techStack": [
      "TypeScript",
      "Prisma"
    ],
    "maker": {
      "name": "Peer Richelsen",
      "avatar": "https://placehold.co/64x64/10b981/ffffff?text=CC"
    }
  },
  {
    "id": "sah-4",
    "title": "Attio CRM",
    "tagline": "The next-generation customizable CRM built on a real-time collaborative database engine",
    "link": "https://attio.com",
    "category": "Productivity",
    "upvotes": 390,
    "tags": [
      "crm",
      "sales",
      "data"
    ],
    "techStack": [
      "React",
      "Rust",
      "Postgres"
    ],
    "maker": {
      "name": "Nicolas Sharpe",
      "avatar": "https://placehold.co/64x64/a78bfa/ffffff?text=AT"
    }
  },
  {
    "id": "sah-5",
    "title": "PostHog",
    "tagline": "Product analytics, session replay, feature flags, and survey tools built for engineering teams",
    "link": "https://posthog.com",
    "category": "Search & Data",
    "upvotes": 370,
    "tags": [
      "analytics",
      "product",
      "session-replay"
    ],
    "techStack": [
      "Python",
      "ClickHouse"
    ],
    "maker": {
      "name": "James Hawkins",
      "avatar": "https://placehold.co/64x64/ec4899/ffffff?text=PH"
    }
  },
  {
    "id": "sah-6",
    "title": "Raycast",
    "tagline": "Extensible productivity launcher for Mac with custom scripting and developer integrations",
    "link": "https://raycast.com",
    "category": "Productivity",
    "upvotes": 340,
    "tags": [
      "launcher",
      "productivity",
      "macos"
    ],
    "techStack": [
      "Swift",
      "TypeScript"
    ],
    "maker": {
      "name": "Thomas Paul Mann",
      "avatar": "https://placehold.co/64x64/f59e0b/ffffff?text=RC"
    }
  }
];

const MOCK_SITE: SiteConfig = {
  key: 'mock-site',
  name: 'SaaSAI Hunt',
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
  return data?.site ?? MOCK_SITE;
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
  if (!data || !data.products || data.products.length === 0) {
    let filtered = [...MOCK_PRODUCTS];
    if (options.category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
    }
    if (options.q) {
      const q = options.q.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q));
    }
    const sorted =
      options.sort === 'top' ? filtered.sort((a, b) => b.upvotes - a.upvotes) : filtered;
    return {
      products: sorted.slice(0, options.limit ?? sorted.length),
      nextCursor: null,
      appliedTags: MOCK_SITE.tags,
    };
  }

  return data;
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
  return data?.product ?? MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0];
}
