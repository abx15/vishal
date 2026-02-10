'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '@/components/SectionHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'services' | 'pricing' | 'booking';
}

const faqs: FAQItem[] = [
  {
    question: 'What types of events do you handle?',
    answer:
      'We specialize in weddings, engagements, receptions, birthday parties, anniversaries, corporate events, and all types of festive celebrations. From intimate gatherings to grand affairs, we tailor our services to match your vision.',
    category: 'services',
  },
  {
    question: 'Do you provide DJ and entertainment services?',
    answer:
      'Yes! We offer professional DJ services with state-of-the-art sound systems, LED & mood lighting, and can arrange live music acts. Our DJs curate playlists that keep your guests entertained throughout the event.',
    category: 'services',
  },
  {
    question: 'Can I customize the floral arrangements?',
    answer:
      'Absolutely. Every floral installation is custom-designed to match your theme, color palette, and preferences. We source the finest blooms—including exotic imported flowers for our Royal package—and our florists work closely with you to bring your vision to life.',
    category: 'services',
  },
  {
    question: 'What is included in the Essential package?',
    answer:
      'The Essential package starts at ₹49,999 and includes basic venue decoration, standard floral arrangements, entry & stage setup, basic lighting, support for up to 100 guests, and day-of coordination. It\'s perfect for intimate celebrations.',
    category: 'pricing',
  },
  {
    question: 'Can I mix features from different packages?',
    answer:
      'Yes, all our packages are fully customizable. You can start with any tier and add or upgrade individual features. We\'ll work with you to create a bespoke package that fits your vision and budget perfectly.',
    category: 'pricing',
  },
  {
    question: 'Are there any hidden charges?',
    answer:
      'No. We believe in transparent pricing. The quoted price covers everything discussed during consultation. Any additional requests or last-minute changes will be communicated and approved by you before incurring costs.',
    category: 'pricing',
  },
  {
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking at least 2–3 months in advance for weddings and large events, and 3–4 weeks for smaller celebrations. Peak wedding season (October–February) fills up quickly, so early booking is advised.',
    category: 'booking',
  },
  {
    question: 'What is the booking and payment process?',
    answer:
      'Simply reach out via WhatsApp, phone, or our contact form. After an initial consultation, we\'ll share a detailed proposal. A 30% advance confirms your booking, with the balance due one week before the event.',
    category: 'booking',
  },
  {
    question: 'Do you handle destination weddings?',
    answer:
      'Yes, we have extensive experience with destination weddings across India. Our team manages logistics, vendor coordination, and décor at the destination. The Royal package is especially popular for destination celebrations.',
    category: 'booking',
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.faq-item');

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
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
    <section id="faq" ref={sectionRef} className="section-padding bg-accent/30">
      <div className="container-wide max-w-4xl mx-auto">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about our services, pricing, and how to get started with your dream celebration."
        />

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="faq-item bg-card border border-border rounded-xl px-6 overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]"
            >
              <AccordionTrigger className="text-left text-[0.95rem] font-medium text-foreground hover:text-primary hover:no-underline py-5 gap-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 leading-relaxed text-sm pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
