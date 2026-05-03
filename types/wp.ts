export interface WPEvent {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [{
      source_url: string;
      alt_text: string;
    }];
  };
  acf?: {
    event_date?: string;
    event_location?: string;
    event_price?: string;
    registration_link?: string;
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}
