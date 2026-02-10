'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.animate-in');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'max-w-3xl mb-12 md:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {label && (
        <div className="animate-in">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase 
                         text-primary bg-primary/10 rounded-full mb-4">
            {label}
          </span>
        </div>
      )}
      <h2 className="animate-in heading-section text-foreground mb-4">{title}</h2>
      {description && (
        <p className="animate-in text-body">{description}</p>
      )}
      <div className={cn('animate-in mt-6', align === 'center' ? 'gold-line-center' : 'gold-line')} />
    </div>
  );
}
