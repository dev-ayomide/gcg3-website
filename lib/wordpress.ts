import { WPEvent, WPPage } from '@/types/wp';

const WP_BASE = `${process.env.NEXT_PUBLIC_WP_URL ?? 'https://gcg3official.com'}/wp-json/wp/v2`;

export async function getEvents(): Promise<WPEvent[]> {
  try {
    const res = await fetch(`${WP_BASE}/events?per_page=20&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  } catch {
    return [];
  }
}

export async function getEvent(slug: string): Promise<WPEvent | null> {
  try {
    const res = await fetch(`${WP_BASE}/events?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch event');
    const events: WPEvent[] = await res.json();
    return events[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPage(slug: string): Promise<WPPage | null> {
  try {
    const res = await fetch(`${WP_BASE}/pages?slug=${slug}&_embed`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error('Failed to fetch page');
    const pages: WPPage[] = await res.json();
    return pages[0] ?? null;
  } catch {
    return null;
  }
}

export function getFeaturedImage(event: WPEvent): string | null {
  return event._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;
}

export function getEventPrice(event: WPEvent): string | null {
  if (event.acf?.event_price) return event.acf.event_price;
  const html = event.content?.rendered ?? '';
  // Prefer explicit registration-fee style amounts when available.
  const regFeeMatch =
    html.match(/\$\s*[\d,]+\s*\(registration fee\)/i) ||
    html.match(/register\s*(?:with|for)?\s*\$[\d,]+/i);
  if (regFeeMatch) {
    const amount = regFeeMatch[0].match(/\$[\d,]+/);
    if (amount) return `${amount[0]} (registration fee)`;
  }
  if (html.toLowerCase().includes('free')) return 'Free';
  const match = html.match(/\$[\d,]+/);
  return match ? match[0] : null;
}

export function getEventDate(event: WPEvent): string | null {
  if (event.acf?.event_date) return event.acf.event_date;
  return null;
}

export function getEventLocation(event: WPEvent): string | null {
  if (event.acf?.event_location) return event.acf.event_location;
  return null;
}

export function isEventPast(event: WPEvent): boolean {
  // Only use explicit event date metadata from WP.
  // Do not infer from post publish date for recurring/reused event posts.
  const raw = event.acf?.event_date;
  if (!raw) return false;

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return false;

  const endOfDay = new Date(parsed);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay < new Date();
}

export function isDateTextPast(dateValue: string | null): boolean {
  if (!dateValue) return false;
  const raw = dateValue.trim();
  if (!raw) return false;

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    const endOfDay = new Date(parsed);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay < new Date();
  }

  const ddmmyyyy = raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/);
  if (ddmmyyyy) {
    const dd = Number(ddmmyyyy[1]);
    const mm = Number(ddmmyyyy[2]);
    const yyyy = Number(ddmmyyyy[3].length === 2 ? `20${ddmmyyyy[3]}` : ddmmyyyy[3]);
    const local = new Date(yyyy, mm - 1, dd, 23, 59, 59, 999);
    if (!Number.isNaN(local.getTime())) return local < new Date();
  }

  return false;
}

export async function getEventRegistrationFormHtml(event: WPEvent): Promise<string | null> {
  try {
    const pageUrl = event.acf?.registration_link || event.link;
    if (!pageUrl) return null;

    const res = await fetch(pageUrl, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const formMatch = html.match(/<form[^>]*class="[^"]*elementor-form[^"]*"[\s\S]*?<\/form>/i);
    if (!formMatch) return null;

    const formHtml = formMatch[0];
    const actionMatch = formHtml.match(/\saction=(['"])(.*?)\1/i);
    const action = actionMatch?.[2] || pageUrl;

    const withAction = actionMatch
      ? formHtml.replace(/\saction=(['"])(.*?)\1/i, ` action="${action}"`)
      : formHtml.replace('<form', `<form action="${action}"`);

    return withAction.replace(/<script[\s\S]*?<\/script>/gi, '');
  } catch {
    return null;
  }
}

export type EventPageData = {
  formHtml: string | null;
  dateText: string | null;
  locationText: string | null;
  registrationFeeText: string | null;
  aboutText: string | null;
};

export async function getEventPageData(event: WPEvent): Promise<EventPageData> {
  try {
    const pageUrl = event.acf?.registration_link || event.link;
    if (!pageUrl) {
      return { formHtml: null, dateText: null, locationText: null, registrationFeeText: null, aboutText: null };
    }

    const res = await fetch(pageUrl, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return { formHtml: null, dateText: null, locationText: null, registrationFeeText: null, aboutText: null };
    }

    const html = await res.text();

    const formMatch = html.match(/<form[^>]*class="[^"]*elementor-form[^"]*"[\s\S]*?<\/form>/i);
    const rawForm = formMatch ? formMatch[0] : null;
    const actionMatch = rawForm?.match(/\saction=(['"])(.*?)\1/i);
    const action = actionMatch?.[2] || pageUrl;
    const formHtml = rawForm
      ? (actionMatch
          ? rawForm.replace(/\saction=(['"])(.*?)\1/i, ` action="${action}"`)
          : rawForm.replace('<form', `<form action="${action}"`)
        ).replace(/<script[\s\S]*?<\/script>/gi, '')
      : null;

    const plain = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#0*39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

    const locationLabelMatch = plain.match(/Location:\s*([^|]+?)(?=(?:About the Event|Register|Member's Name|$))/i);
    const locationText = locationLabelMatch?.[1]?.trim() ?? null;
    const registrationFeeMatch =
      plain.match(/\$[\d,]+\s*\(registration fee\)/i) ||
      plain.match(/register\s*(?:with|for)?\s*\$[\d,]+/i);
    const registrationFeeText = registrationFeeMatch
      ? (registrationFeeMatch[0].includes('(registration fee)')
        ? registrationFeeMatch[0].trim()
        : `${registrationFeeMatch[0].match(/\$[\d,]+/)?.[0] ?? ''} (registration fee)`)
      : null;
    const aboutMatch = plain.match(/About the Event:\s*(.+?)(?=(?:Register for the Event|Member's Name|$))/i);
    const aboutText = aboutMatch?.[1]?.trim() ?? null;

    const datePatterns = [
      /\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}(?:\s+\d{1,2}:\d{2}\s*(?:am|pm))?\b/i,
      /\b(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},\s+\d{4}\b/i,
    ];
    let dateText: string | null = null;
    for (const pattern of datePatterns) {
      const m = plain.match(pattern);
      if (m?.[0]) {
        dateText = m[0].trim();
        break;
      }
    }

    return {
      formHtml,
      dateText,
      locationText,
      registrationFeeText,
      aboutText,
    };
  } catch {
    return { formHtml: null, dateText: null, locationText: null, registrationFeeText: null, aboutText: null };
  }
}

export async function getUpcomingEvents(): Promise<WPEvent[]> {
  const events = await getEvents();
  const checks = await Promise.all(
    events.map(async (event) => {
      if (isEventPast(event)) return { event, isPast: true };
      const pageData = await getEventPageData(event);
      const isPast = isDateTextPast(pageData.dateText);
      return { event, isPast };
    }),
  );
  return checks.filter((x) => !x.isPast).map((x) => x.event);
}
