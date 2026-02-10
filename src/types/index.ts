// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features?: string[];
}

// Gallery Types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'wedding' | 'flower' | 'dj' | 'decoration';
  width?: number;
  height?: number;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
  budget?: string;
}

// API Response Types (for future backend integration)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  rating: number;
}

// Timeline Item Types
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

// Stats Types
export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}
