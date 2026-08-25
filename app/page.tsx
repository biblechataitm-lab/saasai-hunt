import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { LandingSections } from '@/components/LandingSections';

export const revalidate = 0;

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <div className="container">
        <LandingSections />
      </div>
    </div>
  );
}
