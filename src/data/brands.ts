import { Brand } from '@/types';

export const brands: Brand[] = [
  {
    id: 'chanel',
    name: 'Chanel',
    country: 'França',
    description:
      'Símbolo máximo da elegância francesa desde 1910, Chanel criou algumas das fragrâncias mais icônicas da história da perfumaria.',
  },
  {
    id: 'dior',
    name: 'Dior',
    country: 'França',
    description:
      'Christian Dior elevou a perfumaria a uma forma de arte. Cada fragrância da maison carrega a herança do "New Look" e a obsessão pelo detalhe perfeito.',
  },
  {
    id: 'valentino',
    name: 'Valentino',
    country: 'Itália',
    description:
      'A alma romana e o glamour italiano definem as criações olfativas da Valentino — fragrâncias para quem vive intensamente cada momento.',
  },
  {
    id: 'prada',
    name: 'Prada',
    country: 'Itália',
    description:
      'A abordagem intelectual e vanguardista da Prada encontra sua expressão nas fragrâncias que desafiam convenções e redefinem o conceito de luxo.',
  },
  {
    id: 'hugo-boss',
    name: 'Hugo Boss',
    country: 'Alemanha',
    description:
      'Precisão germânica e elegância contemporânea. Hugo Boss cria fragrâncias para homens e mulheres que não abrem mão do estilo no dia a dia.',
  },
  {
    id: 'dolce-gabbana',
    name: 'Dolce & Gabbana',
    country: 'Itália',
    description:
      'A exuberância mediterrânea e a paixão siciliana transbordam em cada criação olfativa da D&G — vibrantes, sensuais e inesquecíveis.',
  },
  {
    id: 'parfums-de-marly',
    name: 'Parfums de Marly',
    country: 'França',
    description:
      'Inspirada na corte de Luís XV, Parfums de Marly evoca a opulência do Château de Marly com composições que são obras-primas olfativas.',
  },
  {
    id: 'carolina-herrera',
    name: 'Carolina Herrera',
    country: 'Venezuela/EUA',
    description:
      'O elegante world de Carolina Herrera — sofisticado, moderno e com aquele toque de irreverência que tornou a estilista uma lenda da moda.',
  },
];

export const getBrandNames = (): string[] => brands.map((b) => b.name);
