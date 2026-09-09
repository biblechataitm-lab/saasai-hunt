import type { Ad, GetAdOptions } from './types';
import { VISITOR_COOKIE } from './types';
import { request, mockMode, readEnv } from './client';

/**
 * Requests one ad, server-side.
 *
 * Three rules this function exists to enforce, so no individual site has to
 * remember them:
 *
 * 1. **It never throws.** Every failure — network, timeout, bad key, malformed
 *    response — returns null. An article must render instantly whether or not
 *    the ad network is reachable.
 * 2. **It is never cached.** A cached response would hand every visitor the
 *    same ad and the same impression token, breaking rotation and undercounting
 *    delivery. This is the single easiest thing to get wrong.
 * 3. **The API key never reaches the browser.** Calling this from client code
 *    throws immediately rather than leaking the key into a bundle.
 */
export async function getAd(options: GetAdOptions): Promise<Ad | null> {
  const mock = mockMode();
  if (mock) {
    if (mock === 'empty') return null;
    const base = process.env.PEERLIST_ADS_URL?.replace(/\/$/, '') ?? 'https://example.com';
    return {
      title: 'Acme Analytics',
      description: 'Ship dashboards in an afternoon.',
      imageUrl: null,
      clickUrl: 'https://example.com',
      sponsoredLabel: 'Promoted',
      token: 'mock-token',
      eventsUrl: `${base}/api/v1/events`,
    };
  }

  // Resolved before the request so the events URL can be built from the same
  // base the ad came from.
  const env = readEnv('getAd');
  if (!env) return null;

  const visitorId = options.visitorId === undefined ? await readVisitorCookie() : options.visitorId;

  const data = await request<{ ad: Omit<Ad, 'token' | 'eventsUrl'> | null; token?: string }>(
    '/api/v1/serve',
    {
      slot: options.slot,
      v: visitorId ?? undefined,
      url: options.url,
    },
    options.timeoutMs,
    'getAd',
  );

  // A null ad is the normal "nothing is buying this slot" answer, not a fault.
  if (!data?.ad || !data.token) return null;

  return { ...data.ad, token: data.token, eventsUrl: `${env.base}/api/v1/events` };
}

/**
 * Reads the visitor id from the site's own first-party cookie.
 *
 * A cookie rather than localStorage, because this runs on the server and
 * localStorage does not exist there. It is set by <AdSlot> on the client, so
 * the very first page view of a session has no id and simply goes uncapped.
 *
 * Imported lazily inside a try/catch so the package still works outside a
 * Next.js request scope — a cron job or a test calling getAd() directly gets
 * null instead of a crash.
 */
async function readVisitorCookie(): Promise<string | null> {
  try {
    const { cookies } = await import('next/headers');
    const store = await cookies();
    return store.get(VISITOR_COOKIE)?.value ?? null;
  } catch {
    return null;
  }
}
