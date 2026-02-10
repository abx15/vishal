'use client';

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { ScrollIndicator } from '@/components/ScrollIndicator';
import { getWhatsAppUrl } from '@/lib/config';

import heroWedding from '@/assets/hero-wedding.jpg';
import heroFloral from '@/assets/hero-floral.jpg';
import heroDj from '@/assets/hero-dj.jpg';

const slides = [
  {
    id: 1,
    image: heroWedding,
    subtitle: 'Premium Wedding Services',
    title: 'Where Dreams\nBecome Reality',
    description: 'Transform your special day into an unforgettable celebration with our exquisite decorations and impeccable service.',
  },
  {
    id: 2,
    image: heroFloral,
    subtitle: 'Floral Artistry',
    title: 'Blooms That\nTell Your Story',
    description: 'From intimate bouquets to grand installations, our floral designs create magical moments.',
  },
  {
    id: 3,
    image: heroDj,
    subtitle: 'Entertainment & DJ Services',
    title: 'Music That\nMoves Your Soul',
    description: 'Professional DJ services that keep your guests dancing all night long.',
  },
];

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const animateContent = () => {
    const tl = gsap.timeline();
    
    // Reset elements
    gsap.set([subtitleRef.current, titleRef.current, descRef.current, ctaRef.current], {
      opacity: 0,
      y: 40,
    });

    // Animate in sequence
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    .to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.3');
  };

  useEffect(() => {
    // Initial animation
    setTimeout(animateContent, 300);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
        }}
        loop
        onSlideChange={() => animateContent()}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
            
            {/* Content */}
            <div className="relative h-full container-wide flex items-center">
              <div className="max-w-2xl text-white pt-20">
                <span
                  ref={subtitleRef}
                  className="inline-block px-4 py-2 text-sm font-medium tracking-widest uppercase 
                           bg-primary/20 backdrop-blur-sm rounded-full mb-6 border border-primary/30"
                >
                  {slide.subtitle}
                </span>
                
                <h1
                  ref={titleRef}
                  className="heading-display text-white mb-6 whitespace-pre-line"
                >
                  {slide.title}
                </h1>
                
                <p
                  ref={descRef}
                  className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl"
                >
                  {slide.description}
                </p>
                
                <div ref={ctaRef} className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="btn-primary"
                  >
                    Get a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat Now
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2" />

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
