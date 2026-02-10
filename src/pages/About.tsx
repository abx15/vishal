'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Award, Users, Calendar, Star } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SectionHeading } from '@/components/SectionHeading';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { CTASection } from '@/sections/CTASection';
import { config } from '@/lib/config';

import aboutHero from '@/assets/about-hero.jpg';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const timeline = [
  {
    year: '2009',
    title: 'The Beginning',
    description: 'Started as a small flower shop with a dream to create beautiful celebrations.',
  },
  {
    year: '2012',
    title: 'Wedding Services',
    description: 'Expanded into wedding decoration, bringing joy to hundreds of couples.',
  },
  {
    year: '2016',
    title: 'Full Event Services',
    description: 'Added DJ, lighting, and complete event management to our offerings.',
  },
  {
    year: '2020',
    title: 'Award Recognition',
    description: 'Recognized as one of the top wedding decorators in the region.',
  },
  {
    year: '2024',
    title: 'Premium Excellence',
    description: 'Celebrating 15+ years of creating unforgettable memories for our clients.',
  },
];

const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Passion',
    description: 'We pour our heart into every celebration, treating each event as our own.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Excellence',
    description: 'We strive for perfection in every detail, from the smallest flower to the grandest stage.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Client Focus',
    description: 'Your vision is our mission. We listen, understand, and deliver beyond expectations.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Innovation',
    description: 'We stay ahead of trends, bringing fresh ideas and creative solutions to every project.',
  },
];

const stats = [
  { value: 500, suffix: '+', label: 'Weddings' },
  { value: 15, suffix: '+', label: 'Years' },
  { value: 50, suffix: '+', label: 'Team Members' },
  { value: 98, suffix: '%', label: 'Happy Clients' },
];

function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useAnimatedCounter(value, { delay });
  
  return (
    <div ref={ref} className="text-center p-6">
      <div className="heading-section text-white mb-2">
        {count}{suffix}
      </div>
      <p className="text-white/70 text-sm">{label}</p>
    </div>
  );
}

const About = () => {
  useSmoothScroll();
  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `About Us ${config.seo.titleTemplate.replace('%s', '')}`;
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        hero.querySelectorAll('.animate-in'),
        { opacity: 0, y: 50 },
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

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const items = timeline.querySelectorAll('.timeline-item');

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${aboutHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
        
        <div className="relative container-wide py-32">
          <div className="max-w-2xl text-white">
            <span className="animate-in inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase 
                           bg-primary/20 rounded-full mb-6 border border-primary/30">
              Our Story
            </span>
            <h1 className="animate-in heading-display mb-6">
              Creating Magic Since 2009
            </h1>
            <p className="animate-in text-lg text-white/80 leading-relaxed">
              From a small flower shop to one of the most trusted names in wedding and event decoration, 
              our journey has been driven by passion, creativity, and an unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {stats.map((stat, index) => (
              <StatCounter key={stat.label} {...stat} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="Who We Are"
                title="A Legacy of Beautiful Celebrations"
                align="left"
              />
              <p className="text-body mb-6">
                Vishal Flore began as a humble flower shop in 2009, founded with a simple belief: 
                every celebration deserves to be beautiful. Over the years, we've grown from arranging 
                bridal bouquets to designing elaborate wedding stages that take your breath away.
              </p>
              <p className="text-body mb-6">
                Today, we are a full-service event decoration company with a team of 50+ passionate 
                professionals including florists, designers, decorators, and entertainment specialists. 
                Together, we've had the privilege of being part of over 500 weddings and countless 
                special events.
              </p>
              <p className="text-body">
                What sets us apart is our attention to detail and personal approach. We don't just 
                decorate venues – we create experiences that reflect your unique story and style.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src={gallery1}
                alt="Our work"
                className="rounded-2xl object-cover h-64 w-full"
              />
              <img
                src={gallery2}
                alt="Our work"
                className="rounded-2xl object-cover h-64 w-full translate-y-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <SectionHeading
            label="Our Values"
            title="What Drives Us"
            description="Our core values guide everything we do, from the first consultation to the final setup."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-background rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6
                              group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                  {value.icon}
                </div>
                <h3 className="heading-card mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            label="Our Journey"
            title="A Timeline of Growth"
            description="From humble beginnings to becoming a leading name in event decoration."
          />

          <div ref={timelineRef} className="relative max-w-3xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-item relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="heading-card mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default About;
