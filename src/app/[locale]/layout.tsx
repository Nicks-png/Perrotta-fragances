import { Cormorant_Garamond, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
  if (!locales.includes(locale as typeof locales[number])) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
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
