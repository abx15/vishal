'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  animation: gsap.TweenVars,
  options: ScrollRevealOptions = {}
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      start = 'top 85%',
      end = 'bottom 15%',
      scrub = false,
      markers = false,
      toggleActions = 'play none none none',
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 60, ...animation },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub,
            markers,
            toggleActions,
            once,
          },
          ...animation,
        }
      );
    });

    return () => ctx.revert();
  }, [animation, options]);

  return elementRef;
}

// Hook for batch animations
export function useScrollRevealBatch(
  selector: string,
  stagger: number = 0.15,
  options: ScrollRevealOptions = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const {
      start = 'top 85%',
      markers = false,
      toggleActions = 'play none none none',
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start,
            markers,
            toggleActions,
            once,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [selector, stagger, options]);

  return containerRef;
}

// Hook for parallax effect
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
}

// Hook for text split animation
export function useTextSplit<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Split text into characters
    const text = element.textContent || '';
    element.innerHTML = text
      .split('')
      .map((char) => `<span class="split-char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const chars = element.querySelectorAll('.split-char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return elementRef;
}
