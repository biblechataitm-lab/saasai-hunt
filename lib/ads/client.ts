/**
 * Shared request plumbing for every call this package makes.
 *
 * Extracted so the four public functions cannot drift on the things that
 * matter: never throwing, never caching, always timing out, and never running
 * in a browser with the API key in hand.
 */

export const DEFAULT_TIMEOUT_MS = 8000;

export class BrowserCallError extends Error {}

/** Values the site's environment must supply, resolved once per call. */
export function readEnv(caller: string): { base: string; key: string } | null {
  if (typeof window !== 'undefined') {
    throw new BrowserCallError(
      `[ads] ${caller}() is server-only — it reads a secret API key. Call it from a Server Component.`,
    );
  }

  const base = process.env.PEERLIST_ADS_URL?.replace(/\/$/, '');
  const key = process.env.PEERLIST_ADS_KEY;

  if (!base || !key) {
    console.warn(`[ads] PEERLIST_ADS_URL or PEERLIST_ADS_KEY is not set; ${caller}() returned nothing.`);
    return null;
  }

  return { base, key };
}

/** Mock mode: '1' returns fixtures, 'empty' exercises the no-content path. */
export function mockMode(): '1' | 'empty' | null {
  const mock = process.env.PEERLIST_ADS_MOCK;
  if (!mock || mock === '0') return null;
  return mock === 'empty' ? 'empty' : '1';
}

/**
 * One GET against the ad network.
 *
 * Returns null on every failure — network, timeout, non-2xx, unparseable body.
 * A publishing site must render whether or not this backend is reachable, so no
 * caller of this function ever has to write a try/catch of its own.
 */
export async function request<T>(
  path: string,
  params: Record<string, string | undefined>,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  caller = 'request',
): Promise<T | null> {
  const env = readEnv(caller);
  if (!env) return null;

  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') search.set(k, v);
  }
  const query = search.toString();

  try {
    const res = await fetch(`${env.base}${path}${query ? `?${query}` : ''}`, {
      headers: { Authorization: `Bearer ${env.key}` },
      // Per-visitor and per-moment by definition. Caching would freeze one
      // response for every reader of the site.
      cache: 'no-store',
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) {
      // These two are configuration mistakes rather than transient failures,
      // and they look identical to "no content" from the page's side — so they
      // are the only ones worth saying out loud.
      if (res.status === 401) {
        console.warn('[ads] API key rejected. Check PEERLIST_ADS_KEY, or the site may be disabled.');
      } else if (res.status === 404) {
        console.warn(`[ads] ${path} returned 404 — check the slot or product id.`);
      }
      return null;
    }

    return (await res.json()) as T;
  } catch {
    // Includes the timeout. Silent: an unreachable backend is not the
    // publishing site's problem and must not fill its logs on every render.
    return null;
  }
}
