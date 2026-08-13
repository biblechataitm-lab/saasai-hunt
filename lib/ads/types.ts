/**
 * The shapes a publishing site receives.
 *
 * Deliberately not the raw API responses: `eventsUrl` is folded into `Ad`
 * server-side so the client component needs no environment of its own, and
 * every type here is an explicit allow-list rather than a passthrough, so a
 * field added to the backend is never published by accident.
 */

export interface Ad {
  title: string;
  description: string;
  imageUrl: string | null;
  /** Redirect through the ad network, which is what counts the click. */
  clickUrl: string;
  /** Required disclosure. Render it — never hide it. */
  sponsoredLabel: string;

  /** Proves this impression was really served. Needed to report a view. */
  token: string;
  /** Absolute URL of the events endpoint. */
  eventsUrl: string;
}

export interface GetAdOptions {
  /** Slot key, as created for this site on the rate card. */
  slot: string;
  /**
   * Anonymous visitor id. Read from the first-party cookie automatically when
   * omitted; pass explicitly only if the site manages identity itself.
   */
  visitorId?: string | null;
  /** Page URL, used for contextual signals and reporting. */
  url?: string;
  /** Milliseconds before the request is abandoned. Default 2000. */
  timeoutMs?: number;
}

/** A product listed on the directory. */
export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string | null;
  logo: string;
  /** The product's own site. Directories link out to this. */
  link: string;
  category: string;
  tags: string[];
  techStack: string[];
  coverImages: string[];
  upvotes: number;
  launchedAt: string;
  maker: { name: string; username: string; avatar: string } | null;
}

export interface GetProductsOptions {
  /**
   * Overrides the tags configured for this site. Leave unset for the normal
   * case — the backend already knows what this directory lists.
   */
  tags?: string[];
  /** Single headline category, as shown on the listing badge. */
  category?: string;
  /** Free-text search across title, tagline and description. */
  q?: string;
  /** Time window for "Collection" style links. */
  since?: 'today' | 'week' | 'month' | 'year';
  /** 'new' is the launches feed; 'top' is trending. Default 'new'. */
  sort?: 'new' | 'top';
  /** 1–100. Default 24. */
  limit?: number;
  /** From a previous response's nextCursor. */
  cursor?: string;
  timeoutMs?: number;
}

export interface ProductPage {
  products: Product[];
  /** Null when there is no further page. */
  nextCursor: string | null;
  /** The tags actually applied — empty means the site lists everything. */
  appliedTags: string[];
}

/**
 * Operational state, set centrally in the admin console.
 *
 * Every site in the network is a separate deployment, so this is how one
 * operator takes a site down without touching its repo.
 */
export type SiteStatus = 'live' | 'maintenance' | 'disabled';

export interface SiteConfig {
  key: string;
  name: string;
  domain: string;
  category: string | null;
  tags: string[];
  status: SiteStatus;
  /** Copy to show while in maintenance. */
  statusMessage: string | null;
  /** Ad slots configured for this site, so slot keys are not hardcoded. */
  slots: { key: string; slotType: string; format: string }[];
}

/** Cookie the visitor id lives in, on the publishing site's own domain. */
export const VISITOR_COOKIE = 'plads_vid';
