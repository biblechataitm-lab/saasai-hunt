import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getProduct, getAd, AdSlot, getSiteConfig } from '@/lib/ads';
import { ExternalLink, ChevronUp, ArrowLeft } from 'lucide-react';
import { SidebarSkeleton } from '@/components/Skeleton';
import { SafeImage } from '@/components/SafeImage';

export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return { title: 'Product Not Found — SaaSHunt' };
  }

  return {
    title: `${product.title} — ${product.tagline} | SaaSHunt`,
    description: product.description || product.tagline,
    openGraph: {
      title: product.title,
      description: product.tagline,
      images: product.coverImages.length > 0 ? product.coverImages : [product.logo],
    },
  };
}

async function ProductSidebar() {
  const config = await getSiteConfig();
  const slotKey = config?.slots?.[0]?.key || 'sidebar-1';
  const ad = await getAd({ slot: slotKey });

  return (
    <aside>
      <div className="sidebar-card">
        <div className="sidebar-card-title">Product Details</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '0.6rem' }}>
            <span className="swiss-label">Directory:</span>{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{config?.name || 'SaaSHunt'}</strong>
          </div>
          <div>
            <span className="swiss-label">Niche:</span>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>
              {config?.tags?.join(', ') || 'SaaS & AI Tools'}
            </span>
          </div>
        </div>
      </div>

      <AdSlot ad={ad} className="sponsor-ad-wrapper" />
    </aside>
  );
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const formattedDate = product.launchedAt
    ? new Date(product.launchedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  // Render Rich Text / Markdown Description safely
  const rawDescription = product.description || product.tagline;
  const richHtmlDescription = await marked.parse(rawDescription);

  // JSON-LD Structured Data Schema for Advanced SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.title,
    description: product.tagline,
    applicationCategory: product.category || 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: product.upvotes || 1,
    },
    author: product.maker
      ? {
          '@type': 'Person',
          name: product.maker.name,
        }
      : undefined,
    url: product.link,
  };

  return (
    <div className="container main-layout">
      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section>
        <Link
          href="/"
          className="btn-swiss-outline"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem' }}
        >
          <ArrowLeft size={14} /> Back to Directory
        </Link>

        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* Main Product Header */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <SafeImage
              src={product.logo || ''}
              alt={product.title}
              fallbackText={product.title.slice(0, 2).toUpperCase()}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '12px',
                objectFit: 'cover',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-subtle)',
              }}
            />

            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                <h1 className="swiss-title" style={{ fontSize: '1.8rem' }}>
                  {product.title}
                </h1>
                {product.category && <span className="category-badge">{product.category}</span>}
              </div>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1rem' }}>
                {product.tagline}
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener"
                  className="btn-swiss-primary"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                >
                  Visit Website <ExternalLink size={16} />
                </a>

                <div className="upvote-badge" style={{ flexDirection: 'row', gap: '6px', minWidth: 'auto', padding: '0.65rem 1.25rem' }}>
                  <ChevronUp size={16} />
                  <span>{product.upvotes ?? 0} Upvotes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rich Text / Markdown Prose Description Section */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.75rem', marginTop: '1.75rem' }}>
            <h3 className="swiss-label" style={{ marginBottom: '1rem', fontSize: '0.75rem' }}>
              About {product.title}
            </h3>
            
            <div
              className="prose-body"
              dangerouslySetInnerHTML={{ __html: richHtmlDescription }}
            />
          </div>

          {/* Metadata Badges & Tech Stack */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {product.maker && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="swiss-label" style={{ width: '100px' }}>Maker:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SafeImage
                    src={product.maker.avatar}
                    alt={product.maker.name}
                    fallbackText={product.maker.name.charAt(0)}
                    className="maker-avatar"
                    style={{ width: '24px', height: '24px' }}
                  />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {product.maker.name} (@{product.maker.username})
                  </span>
                </div>
              </div>
            )}

            {formattedDate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="swiss-label" style={{ width: '100px' }}>Launched:</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{formattedDate}</span>
              </div>
            )}

            {product.tags && product.tags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="swiss-label" style={{ width: '100px' }}>Tags:</span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {product.tags.map((tag) => (
                    <span key={tag} className="chip" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.techStack && product.techStack.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="swiss-label" style={{ width: '100px' }}>Tech Stack:</span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {product.techStack.map((tech) => (
                    <span key={tech} className="chip" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--border-bright)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Suspense fallback={<SidebarSkeleton />}>
        <ProductSidebar />
      </Suspense>
    </div>
  );
}
