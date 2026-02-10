'use client';

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Flower2, Music, PartyPopper, Check, ArrowRight } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/sections/CTASection';
import { config } from '@/lib/config';

import serviceWedding from '@/assets/service-wedding.jpg';
import serviceFlower from '@/assets/service-flower.jpg';
import serviceDj from '@/assets/service-dj.jpg';
import serviceEvent from '@/assets/service-event.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: 'wedding',
    icon: <Heart className="w-8 h-8" />,
    title: 'Wedding Decoration',
    description: 'Create magical moments with our breathtaking mandap designs, stage decorations, and venue styling that reflect your unique love story. From traditional Indian ceremonies to modern fusion celebrations, we bring your wedding vision to life.',
    image: serviceWedding,
    features: [
      'Custom Mandap Design & Setup',
      'Stage & Backdrop Decoration',
      'Venue Styling & Transformation',
      'Theme Weddings & Concepts',
      'Lighting Design',
      'Entry Gate Decoration',
    ],
  },
  {
    id: 'flower',
    icon: <Flower2 className="w-8 h-8" />,
    title: 'Flower Arrangements',
    description: 'From bridal bouquets to grand floral installations, our expert florists craft stunning arrangements using the finest blooms. Each piece is designed to enhance the beauty of your celebration with nature\'s most exquisite creations.',
    image: serviceFlower,
    features: [
      'Bridal & Bridesmaid Bouquets',
      'Table Centerpieces',
      'Floral Walls & Backdrops',
      'Garlands & Varmala',
      'Car Decoration',
      'Fresh Flower Jewelry',
    ],
  },
  {
    id: 'dj',
    icon: <Music className="w-8 h-8" />,
    title: 'DJ & Entertainment',
    description: 'Keep your guests entertained with professional DJ services, premium sound systems, and dynamic lighting that create the perfect party atmosphere. Our experienced DJs know how to read the crowd and keep the energy high.',
    image: serviceDj,
    features: [
      'Professional DJ Services',
      'Premium Sound Systems',
      'Dynamic Lighting Design',
      'LED Screens & Visuals',
      'Live Music Coordination',
      'MC & Anchor Services',
    ],
  },
  {
    id: 'event',
    icon: <PartyPopper className="w-8 h-8" />,
    title: 'Event Decoration',
    description: 'Whether it\'s a birthday, anniversary, corporate event, or any special occasion, we design stunning decorations that make every moment memorable. Our creative team brings fresh ideas to every celebration.',
    image: serviceEvent,
    features: [
      'Birthday Party Themes',
      'Anniversary Celebrations',
      'Corporate Events',
      'Baby Showers & Naming',
      'Engagement Parties',
      'Festival Decorations',
    ],
  },
];

const Services = () => {
  useSmoothScroll();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = `Our Services ${config.seo.titleTemplate.replace('%s', '')}`;
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        hero.querySelectorAll('.animate-in'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 bg-cream">
        <div className="container-wide text-center">
          <span className="animate-in inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase 
                         text-primary bg-primary/10 rounded-full mb-4">
            What We Offer
          </span>
          <h1 className="animate-in heading-display mb-6">Our Services</h1>
          <p className="animate-in text-body max-w-2xl mx-auto">
            From weddings to corporate events, we offer comprehensive decoration and entertainment 
            services to make your celebrations truly extraordinary.
          </p>
          <div className="animate-in gold-line-center mt-8" />
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-wide space-y-24 lg:space-y-32">
          {services.map((service, index) => (
            <ServiceBlock key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
};

interface ServiceBlockProps {
  service: typeof services[0];
  index: number;
}

function ServiceBlock({ service, index }: ServiceBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 !== 0;

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        block.querySelectorAll('.reveal'),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 75%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id={service.id}
      ref={blockRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        isReversed ? 'lg:grid-flow-dense' : ''
      }`}
    >
      {/* Image */}
      <div className={`reveal ${isReversed ? 'lg:col-start-2' : ''}`}>
        <div className="relative overflow-hidden rounded-3xl group">
          <img
            src={service.image}
            alt={service.title}
            className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-background/90 backdrop-blur-sm 
                        flex items-center justify-center text-primary">
            {service.icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
        <h2 className="reveal heading-section mb-4">{service.title}</h2>
        <div className="reveal gold-line mb-6" />
        <p className="reveal text-body mb-8">{service.description}</p>

        <ul className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="reveal btn-primary">
          Inquire Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default Services;
