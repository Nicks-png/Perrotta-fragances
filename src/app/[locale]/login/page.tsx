'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/navigation';
import { useAuthStore } from '@/store/authStore';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = await login(email, password);
    if (ok) {
      router.push('/account');
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden md:flex flex-col items-center justify-center bg-darker px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #C9A96E 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center">
          <p className="font-serif text-5xl text-creme tracking-widest2 mb-2">PERROTTA</p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 bg-gold/40" />
            <span className="text-[0.5rem] tracking-widest3 text-gold/60">FRAGRANCES</span>
            <div className="h-px w-10 bg-gold/40" />
          </div>
          <p className="font-serif text-xl text-creme/40 italic">
            "Sofisticação em cada essência."
          </p>
          <div className="mt-12 flex flex-col gap-3 text-left">
            {['Acesso à coleção completa', 'Histórico de pedidos', 'Ofertas exclusivas para membros'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="text-gold text-xs">✦</span>
                <span className="text-xs text-creme/50 tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col items-center justify-center px-8 md:px-16 py-20 bg-creme">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="md:hidden text-center mb-10">
            <p className="font-serif text-2xl tracking-widest2 text-darker">PERROTTA</p>
          </div>

          <p className="text-[0.6rem] tracking-widest uppercase text-caramel mb-2">{t('login_subtitle')}</p>
          <h1 className="font-serif text-3xl text-darker mb-8">{t('login_title')}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={t('email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              label={t('password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}

            <div className="flex justify-end">
              <a href="#" className="text-[0.6rem] tracking-widest uppercase text-dark/40 hover:text-dark/70 transition-colors">
                {t('forgot_password')}
              </a>
            </div>

            <Button type="submit" className="w-full" loading={isLoading}>
              {t('login_submit')}
            </Button>
          </form>

          <div className="thin-divider my-6" />

          {/* Demo hint */}
          <div className="bg-nude/40 border border-nude p-3 mb-5 text-center rounded-xl">
            <p className="text-[0.6rem] text-dark/50 leading-relaxed">{t('demo_hint')}</p>
          </div>

          <p className="text-center text-xs text-dark/40">
            {t('no_account')}{' '}
            <Link
              href="/register"
              className="text-caramel hover:text-dark transition-colors border-b border-caramel/30 pb-0.5"
            >
              {t('register_link')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
