'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoFull, LogoIcon } from '@/components/brand/Logo';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, openCart } = useCartStore();
  const { user, logout } = useAuthStore();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const toggleLocale = () => {
    const next = locale === 'pt' ? 'en' : 'pt';
    router.push(pathname, { locale: next });
  };

  const itemCount = totalItems();
  const inverted = isHome && !scrolled;

  const headerBg = inverted
    ? 'bg-transparent border-transparent'
    : 'bg-creme/95 backdrop-blur-sm border-nude/60 shadow-sm shadow-dark/5';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
          headerBg
        )}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Left nav — desktop */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              <Link href="/shop" className="nav-link">{t('shop')}</Link>
              <Link href="/shop?brands=true" className="nav-link">{t('brands')}</Link>
            </nav>

            {/* Logo — center */}
            <Link href="/" className="flex items-center gap-2.5 select-none group">
              <LogoIcon
                size={36}
                className="transition-colors duration-300 text-darker"
              />
              <div className="flex flex-col">
                <span className="font-serif text-base md:text-lg tracking-widest2 font-light leading-none transition-colors duration-300 text-darker">
                  PERROTTA
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-px w-4 transition-colors duration-300 bg-caramel/50" />
                  <span className="text-[0.42rem] tracking-widest3 font-sans transition-colors duration-300 text-caramel">
                    FRAGRANCES
                  </span>
                  <div className="h-px w-4 transition-colors duration-300 bg-caramel/50" />
                </div>
              </div>
            </Link>

            {/* Right nav */}
            <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
              <Link href="/about" className="hidden md:block nav-link">{t('about')}</Link>

              {/* Language toggle */}
              <button
                onClick={toggleLocale}
                className={cn(
                  'hidden md:flex text-[0.6rem] tracking-widest uppercase font-sans transition-colors duration-200 px-2 py-1 rounded-full border',
                  inverted
                    ? 'text-creme/70 hover:text-creme border-creme/20 hover:border-creme/40'
                    : 'text-dark/50 hover:text-dark border-nude hover:border-dark/30'
                )}
              >
                {locale === 'pt' ? 'EN' : 'PT'}
              </button>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  'transition-colors duration-200',
                  inverted ? 'text-creme/70 hover:text-creme' : 'text-dark/60 hover:text-dark'
                )}
                aria-label={t('search')}
              >
                <Search size={17} strokeWidth={1.5} />
              </button>

              {/* Account */}
              {user ? (
                <div className="hidden md:flex items-center gap-1 group relative">
                  <Link
                    href="/account"
                    className={cn(
                      'transition-colors duration-200',
                      inverted ? 'text-creme/70 hover:text-creme' : 'text-dark/60 hover:text-dark'
                    )}
                  >
                    <User size={17} strokeWidth={1.5} />
                  </Link>
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      className={cn(
                        'text-[0.55rem] tracking-widest uppercase transition-colors duration-200 ml-1',
                        inverted ? 'text-gold/80 hover:text-gold' : 'text-gold hover:text-caramel'
                      )}
                    >
                      Admin
                    </Link>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    'hidden md:block text-[0.6rem] tracking-widest uppercase font-sans transition-colors duration-200',
                    inverted ? 'text-creme/70 hover:text-creme' : 'text-dark/50 hover:text-dark'
                  )}
                >
                  {t('login')}
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={openCart}
                className={cn(
                  'relative transition-colors duration-200',
                  inverted ? 'text-creme/80 hover:text-creme' : 'text-dark/70 hover:text-dark'
                )}
                aria-label={t('cart')}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-darker text-[0.5rem] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  'md:hidden transition-colors duration-200',
                  inverted ? 'text-creme/80 hover:text-creme' : 'text-dark/70 hover:text-dark'
                )}
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-creme flex flex-col pt-20"
          >
            <div className="flex justify-center py-6 border-b border-nude">
              <LogoFull />
            </div>
            <nav className="flex flex-col px-8 py-8 gap-8">
              {[
                { href: '/shop', label: t('shop') },
                { href: '/about', label: t('about') },
                { href: user ? '/account' : '/login', label: user ? t('account') : t('login') },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-serif text-3xl text-dark/80 hover:text-dark hover:translate-x-2 transition-all duration-300"
                >
                  {label}
                </Link>
              ))}
              {user?.isAdmin && (
                <Link
                  href="/admin"
                  className="font-serif text-3xl text-gold/80 hover:text-gold hover:translate-x-2 transition-all duration-300"
                >
                  Admin
                </Link>
              )}
              {user && (
                <button
                  onClick={logout}
                  className="text-left font-serif text-3xl text-dark/40 hover:text-dark/70 hover:translate-x-2 transition-all duration-300"
                >
                  {t('logout')}
                </button>
              )}
            </nav>
            <div className="px-8 mt-auto pb-8 flex items-center justify-between border-t border-nude pt-6">
              <button
                onClick={toggleLocale}
                className="text-xs tracking-widest uppercase text-dark/50 border border-nude rounded-full px-3 py-1"
              >
                {locale === 'pt' ? 'English' : 'Português'}
              </button>
              <span className="text-xs text-dark/30 tracking-widest">PERROTTA ✦</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-darker/60 backdrop-blur-sm flex items-start justify-center pt-28 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-xl bg-creme rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-4 px-6 py-4 border-b border-nude">
                <Search size={16} className="text-caramel shrink-0" strokeWidth={1.5} />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchOpen(false);
                    }
                    if (e.key === 'Escape') setSearchOpen(false);
                  }}
                  placeholder="Buscar fragrâncias, marcas..."
                  className="flex-1 bg-transparent text-sm text-dark placeholder-dark/40 focus:outline-none"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={16} className="text-dark/50" strokeWidth={1.5} />
                </button>
              </div>
              <div className="px-6 py-3">
                <p className="text-[0.6rem] tracking-widest uppercase text-dark/40">
                  Marcas populares: Chanel · Dior · Parfums de Marly · Carolina Herrera
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
