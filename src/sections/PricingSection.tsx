'use client';

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  featured: boolean;
  features: string[];
  cta: string;
}

const tiers: PricingTier[] = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Perfect for intimate celebrations',
    price: '₹49,999',
    priceNote: 'Starting price',
    featured: false,
    features: [
      'Basic venue decoration',
      'Standard floral arrangements',
      'Entry & stage setup',
      'Basic lighting package',
      'Up to 100 guests',
      'Day-of coordination',
    ],
    cta: 'Get Started',
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Our most popular package',
    price: '₹1,49,999',
    priceNote: 'Starting price',
    featured: true,
    features: [
      'Premium venue decoration',
      'Designer floral installations',
      'Mandap & stage design',
      'Professional DJ & sound',
      'LED & mood lighting',
      'Up to 500 guests',
      'Full event coordination',
      'Photography-ready setups',
    ],
    cta: 'Book Now',
  },
  {
    id: 'royal',
    name: 'Royal',
    tagline: 'For grand, unforgettable affairs',
    price: '₹3,49,999',
    priceNote: 'Starting price',
    featured: false,
    features: [
      'Luxury bespoke decoration',
      'Exotic imported flowers',
      'Custom mandap architecture',
      'Celebrity DJ & live music',
      'Cinematic lighting design',
      'Unlimited guest capacity',
      'Multi-day event coordination',
      'Dedicated event manager',
      'Drone & video coverage setup',
    ],
    cta: 'Contact Us',
  },
];

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.pricing-card');

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="section-padding bg-accent/30">
      <div className="container-wide">
        <SectionHeading
          label="Pricing"
          title="Packages for Every Celebration"
          description="Choose a package that suits your vision and budget. Every package is fully customizable to make your event truly yours."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`pricing-card relative rounded-2xl overflow-hidden transition-all duration-500 
                ${tier.featured
                  ? 'bg-card border-2 border-primary shadow-[var(--shadow-gold)] scale-[1.02] md:scale-105'
                  : 'bg-card border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] hover:-translate-y-2'
                }`}
            >
              {/* Featured Badge */}
              {tier.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-medium tracking-wider uppercase 
                                  px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8 lg:p-10">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="heading-card text-foreground mb-1">{tier.name}</h3>
                  <p className="text-small">{tier.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-border">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-serif font-semibold text-foreground">
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-small mt-1">{tier.priceNote}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 shrink-0 ${tier.featured ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={getWhatsAppUrl(whatsappMessages.booking(`${tier.name} Package`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-medium text-sm transition-all duration-300
                    ${tier.featured
                      ? 'bg-primary text-primary-foreground hover:shadow-[var(--shadow-gold)] hover:scale-105'
                      : 'border-2 border-foreground/15 text-foreground hover:border-primary hover:text-primary'
                    }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Custom quote note */}
        <p className="text-center text-small mt-10 max-w-lg mx-auto">
          Need something unique? We offer fully{' '}
          <Link to="/contact" className="text-primary hover:underline font-medium">
            custom packages
          </Link>{' '}
          tailored to your specific requirements and budget.
        </p>
      </div>
    </section>
  );
}
