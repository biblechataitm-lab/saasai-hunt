import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { LandingSections } from '@/components/LandingSections';

export const revalidate = 0;

export default function HomePage() {
  return (
    <div className="container">
      <HeroSection />
      <LandingSections />
    </div>
  );
}
