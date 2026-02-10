// API Utilities
// This file contains placeholder API functions
// Replace with actual API calls when backend is ready

import { config } from './config';
import type { ApiResponse, ContactFormData } from '@/types';

// Base fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

// Contact Form Submission
export async function submitContactForm(
  formData: ContactFormData
): Promise<ApiResponse<{ id: string }>> {
  // Placeholder: Log form data and return mock response
  console.log('Contact Form Submitted:', formData);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock success response
  return {
    success: true,
    data: { id: `contact-${Date.now()}` },
    message: 'Thank you for your inquiry! We will get back to you soon.',
  };
}

// Get Gallery Images
export async function getGalleryImages() {
  // In production, this would fetch from an API or CMS
  return { success: true, data: [] };
}

// Get Services
export async function getServices() {
  // In production, this would fetch from an API or CMS
  return { success: true, data: [] };
}

// Newsletter Subscription
export async function subscribeNewsletter(
  email: string
): Promise<ApiResponse<{ subscribed: boolean }>> {
  console.log('Newsletter Subscription:', email);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    data: { subscribed: true },
    message: 'Thank you for subscribing!',
  };
}
