'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseAnimatedCounterOptions {
  duration?: number;
  delay?: number;
  start?: string;
}

export function useAnimatedCounter(
  endValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const { duration = 2, delay = 0, start = 'top 80%' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          gsap.to(
            { value: 0 },
            {
              value: endValue,
              duration,
              delay,
              ease: 'power2.out',
              onUpdate: function () {
                setCount(Math.round(this.targets()[0].value));
              },
            }
          );
        },
      });
    });

    return () => ctx.revert();
  }, [endValue, duration, delay, start]);

  return { count, ref: elementRef };
}
