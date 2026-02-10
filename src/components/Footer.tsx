'use client';

import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { config, getWhatsAppUrl, getPhoneUrl, getEmailUrl } from '@/lib/config';

const footerLinks = {
  services: [
    { label: 'Wedding Decoration', href: '/services#wedding' },
    { label: 'Flower Arrangements', href: '/services#flower' },
    { label: 'DJ & Entertainment', href: '/services#dj' },
    { label: 'Event Decoration', href: '/services#event' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'Book Now', href: '/contact' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: config.social.instagram, label: 'Instagram' },
  { icon: Facebook, href: config.social.facebook, label: 'Facebook' },
  { icon: Youtube, href: config.social.youtube, label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/90">
      {/* Main Footer */}
      <div className="container-wide section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-2xl font-bold">V</span>
              </div>
              <span className="font-serif text-2xl tracking-wide">{config.siteName}</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Transform your special moments into unforgettable memories with our premium 
              wedding and event decoration services.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center 
                           hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={getPhoneUrl()}
                  className="flex items-start gap-3 text-white/60 text-sm hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{config.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={getEmailUrl()}
                  className="flex items-start gap-3 text-white/60 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{config.contact.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{config.contact.address}</span>
                </div>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-6 w-full text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {config.siteName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
