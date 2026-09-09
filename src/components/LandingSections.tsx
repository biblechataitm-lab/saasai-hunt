'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, DollarSign, Building2, Sparkles, BarChart3, Zap } from 'lucide-react';

export function LandingSections() {
  return (
    <div className="landing-additional-sections">
      {/* 1. Feature Highlights Bento Grid */}
      <section className="landing-feature-grid-section">
        <div className="section-title-wrap">
          <div className="section-pill-tag">
            <Sparkles size={12} className="text-red-500" />
            <span>Enterprise B2B Architecture</span>
          </div>
          <h2 className="landing-section-heading">Engineered for Enterprise SaaS Founders & Buyers</h2>
          <p className="landing-section-sub">
            Discover verified revenue intelligence engines, automated customer retention platforms, SOC-2 compliant billing operations, and product analytics.
          </p>
        </div>

        <div className="landing-bento-grid">
          {/* Bento Card 1: Revenue & RevOps */}
          <div className="bento-feature-card span-2">
            <div className="bento-card-top">
              <div className="bento-icon-box red">
                <TrendingUp size={20} />
              </div>
              <span className="bento-badge">Autonomous ARR Engine</span>
            </div>
            <h3 className="bento-card-title">RevOps Autonomous AI & Pipeline Intelligence</h3>
            <p className="bento-card-desc">
              Real-time deal risk scoring, automated meeting action items, bidirectional Salesforce/HubSpot CRM synchronization, and multi-touch attribution.
            </p>
            <div className="bento-metric-row">
              <div className="metric-pill">
                <span className="pill-val">3.4x</span>
                <span className="pill-lbl">Pipeline Velocity</span>
              </div>
              <div className="metric-pill">
                <span className="pill-val">2,900+</span>
                <span className="pill-lbl">B2B Tools</span>
              </div>
              <div className="metric-pill">
                <span className="pill-val">84k+</span>
                <span className="pill-lbl">Founders</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Low-Code Ops */}
          <div className="bento-feature-card">
            <div className="bento-card-top">
              <div className="bento-icon-box stone">
                <Layers size={20} />
              </div>
              <span className="bento-badge">10x Speed</span>
            </div>
            <h3 className="bento-card-title">Internal Tooling & Custom Ops</h3>
            <p className="bento-card-desc">
              Connect directly to Postgres, Stripe, and GraphQL to build internal admin portals in minutes.
            </p>
            <div className="bento-check-list">
              <span className="check-item"><CheckCircle2 size={13} /> Role-Based Access (RBAC)</span>
              <span className="check-item"><CheckCircle2 size={13} /> Audit Logs Included</span>
            </div>
          </div>

          {/* Bento Card 3: OpenTelemetry Analytics */}
          <div className="bento-feature-card">
            <div className="bento-card-top">
              <div className="bento-icon-box amber">
                <BarChart3 size={20} />
              </div>
              <span className="bento-badge">Cookieless</span>
            </div>
            <h3 className="bento-card-title">Product Analytics & Retention</h3>
            <p className="bento-card-desc">
              High-throughput event tracking, feature flag management, and automated user onboarding funnels.
            </p>
          </div>

          {/* Bento Card 4: Enterprise Billing & Multi-Tenant */}
          <div className="bento-feature-card span-2">
            <div className="bento-card-top">
              <div className="bento-icon-box purple">
                <Building2 size={20} />
              </div>
              <span className="bento-badge">SOC-2 Type II</span>
            </div>
            <h3 className="bento-card-title">Usage-Based Metering & Multi-Tenant Billing</h3>
            <p className="bento-card-desc">
              Automated invoice reconciliation, multi-currency proration, seat tier upgrades, and enterprise contract management.
            </p>
            <div className="bento-tag-row">
              <span className="tag-chip">Usage Metering</span>
              <span className="tag-chip">SAML / SSO</span>
              <span className="tag-chip">Custom Invoicing</span>
              <span className="tag-chip">GDPR Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curation Process Section */}
      <section className="landing-process-section">
        <div className="section-title-wrap">
          <div className="section-pill-tag">
            <ShieldCheck size={12} className="text-red-500" />
            <span>B2B Verification Standard</span>
          </div>
          <h2 className="landing-section-heading">How SaaSHunt Evaluates Software</h2>
          <p className="landing-section-sub">
            Every SaaS platform is evaluated for compliance certifications, integration depth, and buyer ROI.
          </p>
        </div>

        <div className="process-steps-grid">
          <div className="process-step-card">
            <div className="step-number">01</div>
            <h4 className="step-title">Enterprise Security Audit</h4>
            <p className="step-desc">
              We check SOC-2 compliance, SAML 2.0 SSO support, data residency policies, and SLA commitments.
            </p>
          </div>
          <div className="process-step-card">
            <div className="step-number">02</div>
            <h4 className="step-title">Integration & API Verification</h4>
            <p className="step-desc">
              We test connector reliability with CRM systems, payment gateways, and data warehouses.
            </p>
          </div>
          <div className="process-step-card">
            <div className="step-number">03</div>
            <h4 className="step-title">Featured Enterprise Showcase</h4>
            <p className="step-desc">
              Approved platforms gain priority directory visibility and exposure to 84,000+ business operators.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Launch CTA Banner */}
      <section className="landing-launch-cta">
        <div className="launch-cta-content">
          <span className="launch-cta-tag">✦ LAUNCH ON SAASHUNT</span>
          <h3 className="launch-cta-heading">Launch Your B2B SaaS to 84,000+ Enterprise Buyers</h3>
          <p className="launch-cta-desc">
            Acquire high-LTV customers, get listed in enterprise buying guides, and accelerate your monthly recurring revenue.
          </p>
          <div className="launch-cta-buttons">
            <Link href="/submit" className="launch-cta-primary">
              Launch Your SaaS <ArrowRight size={15} />
            </Link>
            <Link href="/category/ai" className="launch-cta-secondary">
              Explore B2B Index
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
