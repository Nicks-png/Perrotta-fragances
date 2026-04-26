import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Instagram, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('nav');

  return (
    <footer className="bg-darker text-creme/70">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-creme/10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <p className="font-serif text-xl tracking-widest2 text-creme">PERROTTA</p>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="h-px w-5 bg-gold/50" />
                <p className="text-[0.45rem] tracking-widest3 text-gold/80">FRAGRANCES</p>
                <div className="h-px w-5 bg-gold/50" />
              </div>
            </div>
            <p className="text-xs leading-relaxed text-creme/50 font-light">
              Sofisticação em cada essência. Fragrâncias das maiores maisons do mundo, curadas com elegância.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-creme/40 hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:contato@perrottafragrances.com"
                className="text-creme/40 hover:text-gold transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/70 mb-6">Navegação</p>
            <ul className="space-y-3">
              {[
                { href: '/shop', label: t('shop') },
                { href: '/about', label: t('about') },
                { href: '/account', label: t('account') },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-creme/50 hover:text-creme/90 transition-colors duration-200 tracking-wide"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/70 mb-6">Marcas</p>
            <ul className="space-y-3">
              {['Chanel', 'Dior', 'Valentino', 'Prada', 'Parfums de Marly', 'Carolina Herrera'].map((brand) => (
                <li key={brand}>
                  <Link
                    href={`/shop?brand=${brand}`}
                    className="text-xs text-creme/50 hover:text-creme/90 transition-colors duration-200 tracking-wide"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-[0.6rem] tracking-widest3 uppercase text-gold/70 mb-6">Informações</p>
            <ul className="space-y-3">
              {[
                'Política de Privacidade',
                'Termos de Uso',
                'Trocas e Devoluções',
                'Rastrear Pedido',
                'FAQ',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-creme/50 hover:text-creme/90 transition-colors duration-200 tracking-wide"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.6rem] tracking-wide text-creme/30">
            © {new Date().getFullYear()} Perrotta Fragrances. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[0.6rem] tracking-wide text-creme/30">Pix · Cartão de Crédito · Débito · Boleto</span>
          </div>
          <p className="text-[0.55rem] tracking-widest text-creme/20 uppercase">
            Produtos 100% Originais ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
