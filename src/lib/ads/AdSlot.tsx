'use client';

import React, { useEffect, useRef } from 'react';
import type { Ad } from './types';
import { VISITOR_COOKIE } from './types';

/**
 * Client-side half of the integration: viewability reporting and visitor
 * identity. Everything here exists because "the ad rendered" and "a person saw
 * the ad" are different claims, and only the second is worth reporting.
 */

/** 50% of the unit visible… */
const VIEWABLE_RATIO = 0.5;
/** …continuously for this long, before it counts as seen. */
const VIEWABLE_DWELL_MS = 1000;
/** Visitor id lifetime. Long enough to cap repeats, short enough to expire. */
const VISITOR_COOKIE_DAYS = 180;

function ensureVisitorCookie(): void {
  if (document.cookie.includes(`${VISITOR_COOKIE}=`)) return;

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  // First-party, on the publishing site's own domain, because the server has to
  // read it back on the next request. SameSite=Lax keeps it off cross-site
  // requests; it is an anonymous counter, not a login.
  const maxAge = VISITOR_COOKIE_DAYS * 24 * 60 * 60;
  document.cookie = `${VISITOR_COOKIE}=${id}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Attaches viewability tracking to any element.
 *
 * Use this when the site wants its own markup; use <AdSlot> for the default.
 * Returns a ref to spread onto the element wrapping the ad.
 */
export function useAdTracking(ad: Ad | null) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reported = useRef(false);

  useEffect(() => {
    ensureVisitorCookie();
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!ad || !element || reported.current) return;
    // Server-rendered environments and very old browsers simply do not report.
    if (typeof IntersectionObserver === 'undefined') return;

    let dwellTimer: ReturnType<typeof setTimeout> | null = null;

    const report = () => {
      if (reported.current) return;
      reported.current = true;

      const body = JSON.stringify({
        events: [{ token: ad.token, type: 'view', ts: Date.now() }],
      });

      // sendBeacon survives the page being navigated away from, which is
      // exactly when this tends to fire. fetch+keepalive is the fallback.
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(ad.eventsUrl, new Blob([body], { type: 'application/json' }));
          return;
        }
      } catch {
        // fall through
      }
      void fetch(ad.eventsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= VIEWABLE_RATIO) {
          // Start the clock rather than reporting now: an ad scrolled straight
          // past was rendered, not seen.
          dwellTimer ??= setTimeout(() => {
            report();
            observer.disconnect();
          }, VIEWABLE_DWELL_MS);
        } else if (dwellTimer) {
          // Left the viewport before qualifying — the dwell restarts.
          clearTimeout(dwellTimer);
          dwellTimer = null;
        }
      },
      { threshold: [VIEWABLE_RATIO] },
    );

    observer.observe(element);

    return () => {
      if (dwellTimer) clearTimeout(dwellTimer);
      observer.disconnect();
    };
  }, [ad]);

  return ref;
}

/**
 * Default renderer.
 *
 * Styling is intentionally minimal and inherits the surrounding page, because a
 * unit that looks pasted on performs worse than one that reads as part of the
 * site. Pass `className` to style it, or drop to `useAdTracking` for full
 * control of the markup.
 */
export function AdSlot({
  ad,
  className,
  style,
}: {
  ad: Ad | null;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useAdTracking(ad);

  // No ad is the normal case when nothing is buying this slot. Render nothing
  // at all — not an empty box, not a placeholder, not reserved space.
  if (!ad) return null;

  return (
    <div ref={ref} className={className} style={style}>
      <a
        href={ad.clickUrl}
        target="_blank"
        rel="noopener sponsored"
        style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', textDecoration: 'none', color: 'inherit' }}
      >
        {ad.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ad.imageUrl}
            alt=""
            width={44}
            height={44}
            style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
          />
        )}
        <span style={{ minWidth: 0 }}>
          {/* Disclosure. Legally required and never decorative — do not hide,
              shrink below ~11px, or drop the contrast on this. */}
          <span style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.7 }}>
            {ad.sponsoredLabel}
          </span>
          <span style={{ display: 'block', fontWeight: 600, marginTop: 2 }}>{ad.title}</span>
          <span style={{ display: 'block', fontSize: '0.9em', opacity: 0.8, marginTop: 2 }}>{ad.description}</span>
        </span>
      </a>
    </div>
  );
}
