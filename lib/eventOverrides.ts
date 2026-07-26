// Local overrides for WP event posts.
//
// Events come from WordPress (cms.gcg3official.com), but the WP post for the
// talent show still carries the old audition flyer, price and copy, and has no
// ACF date/location set — so lib/wordpress.ts falls back to scraping the WP page.
// Anything listed here wins over both, which lets us run the Grand Finale off the
// existing event/registration flow without waiting on a CMS edit.

export type EventOverride = {
  title: string;
  /** Flyer — a /public path or an absolute URL. */
  image: string;
  /** Machine-readable date; drives the upcoming/ended switch. */
  eventDate: string;
  /** Human-readable date shown on the card and detail page. */
  dateText: string;
  location: string;
  price: string;
  aboutHtml: string;
};

export const EVENT_OVERRIDES: Record<string, EventOverride> = {
  'gcg3-christian-musical-talent-show': {
    title: 'GCG3 Christian Musical Talent Show — Grand Finale',
    image: '/gcg3-grand-finale-flyer.png',
    eventDate: '2026-08-23T13:00:00',
    dateText: 'August 23, 2026 1:00 PM',
    location: '1795 Finch Avenue West, Toronto, ON M3N 1M6, Canada',
    price: 'Free',
    aboutHtml: `
      <p>The Grand Finale of the GCG3 Christian Musical Talent Show — a live celebration of
      young voices with God-given gifts. Ages 9&ndash;15 take the stage for singing,
      instruments, dance, spoken word and more.</p>
      <p><strong>Amazing prizes to be won:</strong> Grand Prize $3,000 &middot;
      2nd Runner Up $1,000 &middot; 3rd Runner Up $500.</p>
      <p><strong>Tickets are free, but registration is required.</strong>
      Secure your spot to be part of this unforgettable experience.</p>
      <p><em>&ldquo;Each of you should use whatever gift you have received to serve others,
      as faithful stewards of God&rsquo;s grace in its various forms.&rdquo;</em> &mdash; 1 Peter 4:10</p>
    `,
  },
};

export function getEventOverride(slug: string): EventOverride | null {
  return EVENT_OVERRIDES[slug] ?? null;
}
