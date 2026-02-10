// Environment Configuration
// This file centralizes all configuration values
// Replace with actual values when connecting to backend

export const config = {
  // Site Information
  siteName: 'Vishal Flore',
  siteTagline: 'Wedding, Flower, DJ & Event Decoration Services',
  siteDescription: 'Premium wedding and event decoration services. Transform your special moments into unforgettable memories with our expert floral designs, DJ services, and elegant decorations.',

  // Contact Information
  contact: {
    phone: '+91 98860 12345',
    whatsapp: '919886012345', // Without spaces for WhatsApp API
    email: 'events@vishalflore.in',
    address: 'Bhadohi',
  },

  // Social Links
  social: {
    instagram: 'https://instagram.com/vishalfloreweddings',
    facebook: 'https://facebook.com/vishalfloreweddings',
    youtube: 'https://youtube.com/@vishalfloreweddings',
    pinterest: 'https://pinterest.com/vishalfloreweddings',
  },

  // API Configuration (for future backend)
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    endpoints: {
      contact: '/contact',
      booking: '/booking',
      gallery: '/gallery',
      services: '/services',
    },
  },

  // Google Maps
  maps: {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635959481927!5m2!1sen!2sin',
  },

  // SEO Defaults
  seo: {
    titleTemplate: '%s | Vishal Flore Weddings',
    defaultTitle: 'Vishal Flore Weddings | Luxury Floral Decors & Wedding Planning',
    defaultDescription: 'Transform your special moments into unforgettable memories with Vishal Flore Weddings. Expert wedding decorations, floral designs, DJ services & event planning in Mumbai.',
    keywords: ['wedding decoration mumbai', 'luxury flower decoration', 'wedding florist india', 'event planner mumbai', 'premium wedding decor', 'floral artistry'],
  },
};

// WhatsApp Message Templates
export const whatsappMessages = {
  general: 'Hi! I would like to know more about your services.',
  booking: (eventType: string) =>
    `Hi! I'm interested in booking your ${eventType} services. Please share more details.`,
  inquiry: (service: string) =>
    `Hi! I have a question about your ${service} services.`,
};

// Generate WhatsApp URL
export const getWhatsAppUrl = (message: string = whatsappMessages.general): string => {
  return `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(message)}`;
};

// Generate Phone URL
export const getPhoneUrl = (): string => {
  return `tel:${config.contact.phone.replace(/\s/g, '')}`;
};

// Generate Email URL
export const getEmailUrl = (subject?: string): string => {
  const baseUrl = `mailto:${config.contact.email}`;
  return subject ? `${baseUrl}?subject=${encodeURIComponent(subject)}` : baseUrl;
};
