import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata: Metadata = {
  title: 'GCG3 — God\'s Children Got Great Gifts',
  description: 'A platform where young children can fully express their individual talents. Faith · Talent · Community.',
  openGraph: {
    title: 'GCG3 — God\'s Children Got Great Gifts',
    description: 'Helping children discover, develop, and celebrate the talents God placed in them.',
    siteName: 'GCG3',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
