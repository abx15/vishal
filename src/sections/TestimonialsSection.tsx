'use client';

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';

import 'swiper/css';
import 'swiper/css/pagination';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya & Arjun Sharma',
    role: 'Wedding Ceremony',
    content:
      'Vishal Flore transformed our wedding into a fairy tale. The mandap was breathtaking, and every floral detail was perfect. Our guests are still talking about it months later!',
    rating: 5,
    location: 'Mumbai',
  },
  {
    id: '2',
    name: 'Neha Kapoor',
    role: 'Engagement Party',
    content:
      'From the first consultation to the final petal, the team was exceptional. The flower arrangements were stunning, and the lighting created the most magical ambiance.',
    rating: 5,
    location: 'Pune',
  },
  {
    id: '3',
    name: 'Rahul & Meera Patel',
    role: 'Destination Wedding',
    content:
      'We chose the Royal package for our destination wedding and it exceeded every expectation. The DJ kept the energy alive all night and the decoration was world-class.',
    rating: 5,
    location: 'Udaipur',
  },
  {
    id: '4',
    name: 'Ananya Desai',
    role: 'Corporate Gala',
    content:
      'Professional, creative, and reliable. Vishal Flore handled our corporate event with the same elegance they bring to weddings. Truly impressive work.',
    rating: 4,
    location: 'Mumbai',
  },
  {
    id: '5',
    name: 'Vikram & Sneha Joshi',
    role: 'Reception Celebration',
    content:
      'The attention to detail was incredible. Every corner of the venue was thoughtfully decorated. The team understood our vision perfectly and delivered beyond our dreams.',
    rating: 5,
    location: 'Delhi',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-primary text-primary'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.testimonial-carousel', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding floral-pattern overflow-hidden">
      <div className="container-wide">
        <div className="testimonial-heading">
          <SectionHeading
            label="Testimonials"
            title="Words From Our Clients"
            description="Every celebration we create is a story of trust, creativity, and joy. Here's what our clients have to say."
          />
        </div>

        <div className="testimonial-carousel">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 28 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.testimonial-pagination',
            }}
            loop
            className="!pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="h-full bg-card border border-border rounded-2xl p-8 lg:p-10 flex flex-col transition-all duration-500 hover:shadow-[var(--shadow-medium)] hover:-translate-y-1">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-primary/30 mb-5 shrink-0" />

                  {/* Review */}
                  <p className="text-foreground/80 leading-relaxed mb-8 flex-1 text-[0.95rem]">
                    "{t.content}"
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-6 border-t border-border">
                    <StarRating rating={t.rating} />
                    <h4 className="font-serif font-medium text-foreground mt-3 text-lg">
                      {t.name}
                    </h4>
                    <p className="text-small">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots */}
          <div className="testimonial-pagination flex justify-center gap-2 mt-2" />
        </div>
      </div>
    </section>
  );
}
