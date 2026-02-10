'use client';

import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { HeroSection } from '@/sections/HeroSection';
import { ServicesPreview } from '@/sections/ServicesPreview';
import { AboutPreview } from '@/sections/AboutPreview';
import { PricingSection } from '@/sections/PricingSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { GalleryPreview } from '@/sections/GalleryPreview';
import { FAQSection } from '@/sections/FAQSection';
import { CTASection } from '@/sections/CTASection';
import { config } from '@/lib/config';

const Index = () => {
  useSmoothScroll();

  useEffect(() => {
    document.title = config.seo.defaultTitle;
  }, []);

  return (
    <main>
      <HeroSection />
      <ServicesPreview />
      <AboutPreview />
      <GalleryPreview />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
};

export default Index;
