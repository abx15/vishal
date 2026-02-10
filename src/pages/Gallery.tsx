'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/sections/CTASection';
import { config } from '@/lib/config';
import { cn } from '@/lib/utils';

import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import heroWedding from '@/assets/hero-wedding.jpg';
import heroFloral from '@/assets/hero-floral.jpg';
import serviceWedding from '@/assets/service-wedding.jpg';
import serviceFlower from '@/assets/service-flower.jpg';
import serviceDj from '@/assets/service-dj.jpg';
import serviceEvent from '@/assets/service-event.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Category = 'all' | 'wedding' | 'flower' | 'dj' | 'decoration';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: Category;
  size: 'normal' | 'tall' | 'wide';
}

const galleryItems: GalleryItem[] = [
  { id: 1, src: heroWedding, alt: 'Grand wedding mandap decoration', category: 'wedding', size: 'wide' },
  { id: 2, src: gallery1, alt: 'Elegant reception hall setup', category: 'wedding', size: 'normal' },
  { id: 3, src: gallery3, alt: 'Bridal bouquet', category: 'flower', size: 'tall' },
  { id: 4, src: heroFloral, alt: 'Floral centerpiece', category: 'flower', size: 'normal' },
  { id: 5, src: gallery2, alt: 'Outdoor ceremony arch', category: 'wedding', size: 'normal' },
  { id: 6, src: serviceDj, alt: 'DJ setup', category: 'dj', size: 'wide' },
  { id: 7, src: gallery4, alt: 'Sangeet night', category: 'dj', size: 'normal' },
  { id: 8, src: serviceFlower, alt: 'Luxury floral arrangement', category: 'flower', size: 'tall' },
  { id: 9, src: serviceWedding, alt: 'Wedding stage', category: 'wedding', size: 'normal' },
  { id: 10, src: serviceEvent, alt: 'Event decoration', category: 'decoration', size: 'wide' },
];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'flower', label: 'Floral' },
  { value: 'dj', label: 'DJ & Events' },
  { value: 'decoration', label: 'Decoration' },
];

const Gallery = () => {
  useSmoothScroll();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    document.title = `Gallery ${config.seo.titleTemplate.replace('%s', '')}`;
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.gallery-item');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container-wide text-center">
          <SectionHeading
            label="Our Portfolio"
            title="Moments We've Created"
            description="Browse through our collection of beautiful celebrations and see how we transform ordinary spaces into extraordinary experiences."
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 sticky top-[72px] bg-background/95 backdrop-blur-lg z-30 border-b border-border">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  'gallery-item relative overflow-hidden rounded-2xl cursor-pointer group',
                  item.size === 'tall' && 'row-span-2',
                  item.size === 'wide' && 'col-span-2'
                )}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center">
                    <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 
                     flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 
                     flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 
                     flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] px-4">
            <img
              src={filteredItems[currentIndex]?.src}
              alt={filteredItems[currentIndex]?.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {currentIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}

      <CTASection />
    </main>
  );
};

export default Gallery;
