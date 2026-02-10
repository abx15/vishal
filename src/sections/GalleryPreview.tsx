'use client';

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';

import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import heroWedding from '@/assets/hero-wedding.jpg';
import heroFloral from '@/assets/hero-floral.jpg';
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
  { id: 8, src: serviceEvent, alt: 'Event decoration', category: 'decoration', size: 'normal' },
];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'flower', label: 'Floral' },
  { value: 'dj', label: 'DJ & Events' },
  { value: 'decoration', label: 'Decoration' },
];

export function GalleryPreview() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.gallery-preview-item');

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

  return (
    <section id="gallery" ref={sectionRef} className="section-padding bg-cream">
      <div className="container-wide">
        <SectionHeading
          label="Our Portfolio"
          title="Moments We've Created"
          description="Browse through our collection of beautiful celebrations and stunning transformations."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeCategory === cat.value
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px] lg:auto-rows-[220px]"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                'gallery-preview-item relative overflow-hidden rounded-2xl group',
                item.size === 'tall' && 'row-span-2',
                item.size === 'wide' && 'col-span-2'
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground 
                     font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
