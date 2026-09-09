'use client';

import React from 'react';
import Hero20 from '@/components/ui/hero-20';

export function HeroSection() {
  return (
    <div className="w-full mb-12">
      <Hero20
        brandName="SaaSHunt"
        headingLine1="The B2B Index for"
        headingLine2="Autonomous SaaS & ARR."
        description="Discover and evaluate 2,900+ enterprise SaaS platforms, AI RevOps co-pilots, SOC-2 billing engines, and product analytics."
        primaryCtaLabel="Explore 2,900+ B2B Tools"
        primaryCtaHref="/category/ai"
        secondaryCtaLabel="Launch Your SaaS"
        secondaryCtaHref="/submit"
        shopLabel="Launch SaaS"
        shopHref="/submit"
        trustLabel="TRUSTED BY 84,000+ ENTERPRISE OPERATORS"
        trustItems={[
          { label: 'SOC-2 Type II Certified' },
          { label: 'Enterprise SLA Guaranteed' },
          { label: '99.99% Uptime' },
        ]}
      />
    </div>
  );
}
