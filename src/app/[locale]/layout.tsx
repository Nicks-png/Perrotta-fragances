import { Cormorant_Garamond, Inter, Italiana } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import '@/app/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italiana',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: {
    default: 'Perrotta Fragrances — Sofisticação em cada essência',
    template: '%s | Perrotta Fragrances',
  },
  description:
    'Fragrâncias das maiores maisons do mundo, curadas com elegância. Chanel, Dior, Valentino, Prada e muito mais.',
  keywords: ['perfume', 'fragrâncias', 'Chanel', 'Dior', 'luxo', 'perfumaria'],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable} ${italiana.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
