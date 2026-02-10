'use client';

import { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { PageTransition } from '@/components/PageTransition';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <PageTransition>
        {children}
      </PageTransition>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
