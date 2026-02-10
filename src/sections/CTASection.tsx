'use client';

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/config';

import heroWedding from '@/assets/hero-wedding.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bg, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroWedding})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/80" />

      {/* Content */}
      <div className="relative container-wide text-center">
        <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase 
                       text-primary bg-primary/20 backdrop-blur-sm rounded-full mb-6 border border-primary/30">
          Ready to Begin?
        </span>
        
        <h2 className="heading-section text-white mb-6 max-w-3xl mx-auto">
          Let's Create Something Beautiful Together
        </h2>
        
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          Your dream celebration is just a conversation away. Get in touch with us today 
          and let our experts help you plan the perfect event.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary">
            Request a Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
          
          <a href={getPhoneUrl()} className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
