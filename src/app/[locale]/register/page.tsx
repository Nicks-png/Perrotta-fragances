'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/navigation';
import { useAuthStore } from '@/store/authStore';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    await register(name, email, password);
    router.push('/account');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden md:flex flex-col items-center justify-center bg-darker px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #C9A96E 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center">
          <p className="font-serif text-5xl text-creme tracking-widest2 mb-2">PERROTTA</p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 bg-gold/40" />
            <span className="text-[0.5rem] tracking-widest3 text-gold/60">FRAGRANCES</span>
            <div className="h-px w-10 bg-gold/40" />
          </div>
          <p className="font-serif text-xl text-creme/40 italic leading-relaxed">
            "Junte-se ao universo<br />das grandes fragrâncias."
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col items-center justify-center px-8 md:px-16 py-20 bg-creme">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm"
        >
          <div className="md:hidden text-center mb-10">
            <p className="font-serif text-2xl tracking-widest2 text-darker">PERROTTA</p>
          </div>

          <p className="text-[0.6rem] tracking-widest uppercase text-caramel mb-2">{t('register_subtitle')}</p>
          <h1 className="font-serif text-3xl text-darker mb-8">{t('register_title')}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label={t('name')} value={name} onChange={(e) => setName(e.target.value)} />
            <Input label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input
              label={t('confirm_password')}
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={error || undefined}
            />
            <Button type="submit" className="w-full" loading={isLoading}>
              {t('register_submit')}
            </Button>
          </form>

          <div className="thin-divider my-6" />

          <p className="text-center text-[0.55rem] text-dark/30 mb-4">{t('terms')}</p>

          <p className="text-center text-xs text-dark/40">
            {t('has_account')}{' '}
            <Link href="/login" className="text-caramel hover:text-dark transition-colors border-b border-caramel/30 pb-0.5">
              {t('login_link')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
