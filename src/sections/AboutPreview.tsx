'use client';

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 500, label: 'Weddings Celebrated', suffix: '+' },
  { value: 15, label: 'Years Experience', suffix: '+' },
  { value: 50, label: 'Expert Team Members', suffix: '+' },
  { value: 4.9, label: 'Client Rating', suffix: '' },
];

const galleryImages = [gallery1, gallery2, gallery3, gallery4];

function StatItem({ value, label, suffix, delay }: { value: number; label: string; suffix: string; delay: number }) {
  const isFloat = value % 1 !== 0;
  const { count, ref } = useAnimatedCounter(isFloat ? value * 10 : value, { delay });
  
  return (
    <div ref={ref} className="text-center">
      <div className="heading-section text-primary mb-2">
        {isFloat ? (count / 10).toFixed(1) : count}
        {suffix}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageGrid = imageGridRef.current;
    if (!section || !imageGrid) return;

    const images = imageGrid.querySelectorAll('.gallery-img');

    const ctx = gsap.context(() => {
      // Parallax effect on images
      images.forEach((img, i) => {
        gsap.to(img, {
          yPercent: i % 2 === 0 ? -15 : 15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-cream overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Grid */}
          <div ref={imageGridRef} className="relative grid grid-cols-2 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className={`gallery-img overflow-hidden rounded-2xl ${
                  index % 2 === 0 ? 'translate-y-8' : '-translate-y-8'
                }`}
              >
                <img
                  src={img}
                  alt={`Gallery preview ${index + 1}`}
                  className="w-full h-48 sm:h-64 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 
                          bg-background rounded-2xl p-4 shadow-lg flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary fill-primary" />
              </div>
              <div>
                <p className="font-serif text-lg font-medium">Trusted by</p>
                <p className="text-sm text-muted-foreground">500+ Happy Couples</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase 
                           text-primary bg-primary/10 rounded-full mb-4">
              About Us
            </span>
            
            <h2 className="heading-section mb-6">
              We Create Memories That Last a Lifetime
            </h2>
            
            <p className="text-body mb-6">
              For over 15 years, Vishal Flore has been transforming celebrations into extraordinary experiences. 
              Our passion for perfection and eye for detail has made us one of the most trusted names 
              in wedding and event decoration across India.
            </p>
            
            <p className="text-body mb-8">
              From intimate ceremonies to grand celebrations, our team of expert designers, florists, 
              and event planners work together to bring your vision to life with creativity and elegance.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 p-6 bg-background rounded-2xl">
              {stats.map((stat, index) => (
                <StatItem key={stat.label} {...stat} delay={index * 0.1} />
              ))}
            </div>

            <Link to="/about" className="btn-primary">
              Our Story
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
