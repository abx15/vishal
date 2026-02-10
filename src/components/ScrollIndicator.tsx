'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className={`scroll-indicator ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs tracking-widest uppercase text-foreground/60">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </div>
    </motion.div>
  );
}
