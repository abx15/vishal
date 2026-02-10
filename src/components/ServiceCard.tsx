'use client';

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardProps {
  service: Service;
  index: number;
  className?: string;
}

export function ServiceCard({ service, index, className }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const ctx = gsap.context(() => {
      // Card reveal animation
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Image hover parallax
      card.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.1, duration: 0.6, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.6, ease: 'power2.out' });
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn('group card-luxury opacity-0', className)}
    >
      <Link to={`/services#${service.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div className="img-overlay" />
          
          {/* Icon Badge */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm 
                        flex items-center justify-center text-primary
                        group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            {service.icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="heading-card text-foreground mb-3 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-body mb-6 line-clamp-2">
            {service.description}
          </p>
          
          {/* CTA */}
          <div className="flex items-center gap-2 text-primary font-medium text-sm 
                        group-hover:gap-4 transition-all duration-300">
            <span>Explore Service</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  );
}
