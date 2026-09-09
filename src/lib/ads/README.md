# @peerlist/ads

The client for publishing sites in the network. It covers everything a directory
site needs from the backend: what the site is, what products it lists, and which
ads to show.

```ts
getSiteConfig()        // who this site is + whether it is open
getProducts(options)   // the products to list
getProduct(id)         // one product
getAd({ slot })        // one ad for a slot
<AdSlot ad={ad} />     // renders it, reports the view, handles the click
```

Every data function is server-only, never throws, and degrades to null or an
empty list on any failure — network, timeout, rejected key, malformed response.
A page that uses them renders identically whether or not the backend is up.

Ships as TypeScript source with no build step and no dependencies of its own —
it imports nothing outside `next` and `react`.

**For a separate repo (the normal case), copy it in.** Each site in the network
is its own deployment, so there is no shared `node_modules` to link against:

```bash
# from the site's root, with the backend repo checked out alongside
cp -r ../peerlist/packages/ads/src lib/ads
```

Six files: `client.ts`, `types.ts`, `getAd.ts`, `catalog.ts`, `AdSlot.tsx`,
`index.ts`. Then import from `@/lib/ads` instead of `@peerlist/ads`. No build
step, no registry, no auth, and nothing to configure — copied source is compiled
by the site like any other file.

**Inside this monorepo**, it resolves through the workspace already configured in
the root `package.json` — add `"@peerlist/ads": "*"` to the site's dependencies
and import it by name.

> A plain git dependency (`"@peerlist/ads": "github:owner/repo"`) does **not**
> work here: npm installs a repository's root, and this package lives in
> `packages/ads`. You would get the whole backend app as a dependency. Publish to
> a private registry if you want a real install, or copy the source.

Only the workspace route needs a config change — a package resolved from
`node_modules` ships as TypeScript, so Next has to be told to compile it:

```js
// next.config.js — workspace install only, not needed if you copied the source
module.exports = { transpilePackages: ['@peerlist/ads'] };
```

## Setup

```bash
# .env.local
PEERLIST_ADS_URL=https://peerlist.io
PEERLIST_ADS_KEY=psk_live_...      # from /sadmin/sites → Connect a site
```

`PEERLIST_ADS_KEY` is a **server-side secret**. Never prefix it with
`NEXT_PUBLIC_`. Every data function throws if called in the browser, rather than
letting the key end up in a client bundle.

## Use

### Status — call this every request

```tsx
// app/layout.tsx
import { getSiteConfig } from '@peerlist/ads';

export default async function RootLayout({ children }) {
  const config = await getSiteConfig();

  if (config?.status === 'disabled') notFound();
  if (config?.status === 'maintenance') return <Maintenance message={config.statusMessage} />;

  return <html><body>{children}</body></html>;
}
```

Each site is a separate deployment, so this is the only way an operator can take
a site down or rename it without deploying that site's code.

If it returns null the backend was unreachable — carry on as normal. Going dark
because a status check timed out is worse than the problem it guards against.

### Products

```tsx
// app/page.tsx — Server Component
import { getProducts } from '@peerlist/ads';

const { products, nextCursor } = await getProducts();          // this site's tags
const trending = await getProducts({ sort: 'top', limit: 10 });
const thisWeek = await getProducts({ since: 'week' });
const byCategory = await getProducts({ category: 'AI' });
const results = await getProducts({ q: 'analytics' });
const nextPage = await getProducts({ cursor: nextCursor! });
```

The site's own tags are applied by the backend, so the normal call takes no
arguments — a directory asks for products, not for "products tagged saas".

### One product

```tsx
const product = await getProduct(params.id);
if (!product) notFound();
```

### Ads

```tsx
import { getAd, AdSlot } from '@peerlist/ads';

const ad = await getAd({ slot: 'sidebar-1' });
return <AdSlot ad={ad} className="sponsor-card" />;
```

For custom markup, use the hook and keep the tracking:

```tsx
'use client';
import { useAdTracking, type Ad } from '@peerlist/ads';

export function MyAd({ ad }: { ad: Ad | null }) {
  const ref = useAdTracking(ad);
  if (!ad) return null;

  return (
    <aside ref={ref}>
      <span>{ad.sponsoredLabel}</span>
      <a href={ad.clickUrl} rel="noopener sponsored">{ad.title}</a>
    </aside>
  );
}
```

Two things you must keep: display `ad.sponsoredLabel`, and link to `ad.clickUrl`
rather than any other URL — that redirect is what counts the click.

## Behaviour worth knowing

**Null and empty are answers, not errors.** `getAd()` returning null means no
campaign is buying that slot; `getProducts()` returning `[]` means nothing
matches this site's tags yet. Render a sensible empty state for a list, and
*nothing at all* for a missing ad — no box, no placeholder, no reserved space.
Never retry them, never log them as failures.

**Nothing throws.** Network failure, timeout (2s default), rejected key,
malformed response — all degrade. If the backend is down the page still renders
instantly, just without backend content.

**Nothing is cached.** The request is `no-store`. Do not "optimise" that: a
cached response gives every visitor the same ad and the same impression token,
which breaks rotation and undercounts delivery.

**A view is reported only when the unit is 50% visible for a continuous
second**, once per impression, via `sendBeacon`. Scrolling straight past reports
nothing — that is deliberate, since rendered and seen are different claims.

**Visitor identity is a first-party cookie** (`plads_vid`) on your own domain,
set by `AdSlot`. It has to be a cookie rather than localStorage because
`getAd()` runs on the server and reads it from the request. Consequences: the
first page view of a new visitor is uncapped, and frequency capping is per-site
— cross-site capping is not possible without third-party cookies.

## Mock mode

Build and style the site before any campaign exists:

```bash
PEERLIST_ADS_MOCK=1        # fixtures: 3 products, a site config, an ad
PEERLIST_ADS_MOCK=empty    # nothing — check every empty state renders cleanly
```

No network call is made in either mode, so the site can be built and styled
before it has a key or any real data.

Delete the variable to go live.

## Checklist before shipping a site

- `grep -r "psk_live" .next/static` returns nothing.
- Every page renders correctly with `PEERLIST_ADS_MOCK=empty`.
- `getSiteConfig()` is called in the root layout and `maintenance` / `disabled`
  are both handled.
- With mock off and `PEERLIST_ADS_URL` pointed at a dead port, the page still
  renders — just without an ad.
- The sponsored label is visible on every unit.
- Scrolling quickly past the ad fires no event; resting on it fires exactly one.
