'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SectionHeading } from '@/components/SectionHeading';
import { config, getWhatsAppUrl, getPhoneUrl, getEmailUrl } from '@/lib/config';
import { submitContactForm } from '@/lib/api';
import type { ContactFormData } from '@/types';
import { cn } from '@/lib/utils';

const eventTypes = [
  'Wedding',
  'Engagement',
  'Birthday Party',
  'Anniversary',
  'Corporate Event',
  'Other',
];

const budgetRanges = [
  'Under ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹3,00,000',
  '₹3,00,000 - ₹5,00,000',
  'Above ₹5,00,000',
];

const Contact = () => {
  useSmoothScroll();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
    budget: '',
  });

  useEffect(() => {
    document.title = `Contact Us ${config.seo.titleTemplate.replace('%s', '')}`;
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        form.querySelectorAll('.form-field'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          message: '',
          budget: '',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container-wide text-center">
          <SectionHeading
            label="Get in Touch"
            title="Let's Plan Your Celebration"
            description="Have questions or ready to book? We'd love to hear from you. Fill out the form below or reach out directly."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-cream rounded-2xl p-8">
                <h3 className="heading-card mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <a
                    href={getPhoneUrl()}
                    className="flex items-start gap-4 text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0
                                  group-hover:bg-primary group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <p className="text-muted-foreground">{config.contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 text-foreground hover:text-[#25D366] transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0
                                  group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium mb-1">WhatsApp</p>
                      <p className="text-muted-foreground">Quick Response</p>
                    </div>
                  </a>

                  <a
                    href={getEmailUrl()}
                    className="flex items-start gap-4 text-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0
                                  group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <p className="text-muted-foreground">{config.contact.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Address</p>
                      <p className="text-muted-foreground">{config.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Business Hours</p>
                      <p className="text-muted-foreground">Mon - Sat: 10AM - 7PM</p>
                      <p className="text-muted-foreground">Sunday: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="bg-cream rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="heading-card mb-4">Thank You!</h3>
                  <p className="text-body mb-8">
                    We've received your inquiry and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="bg-cream rounded-2xl p-8 md:p-12">
                  <h3 className="heading-card mb-6">Request a Quote</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="form-field">
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="form-field">
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="form-field">
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>

                    {/* Event Type */}
                    <div className="form-field">
                      <label className="block text-sm font-medium mb-2">Event Type *</label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      >
                        <option value="">Select event type</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Event Date */}
                    <div className="form-field">
                      <label className="block text-sm font-medium mb-2">Event Date</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>

                    {/* Budget */}
                    <div className="form-field">
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="form-field md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Tell us about your event *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Describe your event, venue, theme ideas, or any specific requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border resize-none
                                 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'btn-primary mt-8 w-full md:w-auto',
                      isSubmitting && 'opacity-70 cursor-not-allowed'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative">
        <iframe
          src={config.maps.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </section>
    </main>
  );
};

export default Contact;
