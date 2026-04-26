import Hero from '@/components/home/Hero';
import BrandsMarquee from '@/components/home/BrandsMarquee';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutTeaser from '@/components/home/AboutTeaser';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandsMarquee />
      <FeaturedProducts />
      <AboutTeaser />
      <Testimonials />
    </>
  );
}
