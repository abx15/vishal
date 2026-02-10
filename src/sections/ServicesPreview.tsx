'use client';

import { Heart, Flower2, Music, PartyPopper } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import { SectionHeading } from '@/components/SectionHeading';
import type { Service } from '@/types';

import serviceWedding from '@/assets/service-wedding.jpg';
import serviceFlower from '@/assets/service-flower.jpg';
import serviceDj from '@/assets/service-dj.jpg';
import serviceEvent from '@/assets/service-event.jpg';

const services: Service[] = [
  {
    id: 'wedding',
    title: 'Wedding Decoration',
    description: 'Create magical moments with our breathtaking mandap designs, stage decorations, and venue styling that reflect your unique love story.',
    image: serviceWedding,
    icon: <Heart className="w-6 h-6" />,
    features: ['Mandap Design', 'Stage Decoration', 'Venue Styling', 'Theme Weddings'],
  },
  {
    id: 'flower',
    title: 'Flower Arrangements',
    description: 'From bridal bouquets to grand floral installations, our expert florists craft stunning arrangements using the finest blooms.',
    image: serviceFlower,
    icon: <Flower2 className="w-6 h-6" />,
    features: ['Bridal Bouquets', 'Centerpieces', 'Floral Walls', 'Garlands'],
  },
  {
    id: 'dj',
    title: 'DJ & Entertainment',
    description: 'Keep your guests entertained with professional DJ services, sound systems, and lighting that create the perfect party atmosphere.',
    image: serviceDj,
    icon: <Music className="w-6 h-6" />,
    features: ['Professional DJs', 'Sound Systems', 'Lighting Design', 'Live Music'],
  },
  {
    id: 'event',
    title: 'Event Decoration',
    description: 'Whether it\'s a birthday, anniversary, or corporate event, we design stunning decorations that make every occasion special.',
    image: serviceEvent,
    icon: <PartyPopper className="w-6 h-6" />,
    features: ['Birthday Parties', 'Anniversaries', 'Corporate Events', 'Theme Decor'],
  },
];

export function ServicesPreview() {
  return (
    <section id="services" className="section-padding floral-pattern">
      <div className="container-wide">
        <SectionHeading
          label="Our Services"
          title="Crafting Unforgettable Celebrations"
          description="From intimate gatherings to grand celebrations, we bring your vision to life with meticulous attention to detail and creative excellence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
