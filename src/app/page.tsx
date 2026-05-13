import type { Metadata } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { siteConfig } from '@/config/site';
import type { Service, Tier, Bracket } from '@/types';

import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProofStrip } from '@/components/landing/SocialProofStrip';
import { FinancialNoise } from '@/components/landing/FinancialNoise';
import { ServicePillars } from '@/components/landing/ServicePillars';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { PricingStudio } from '@/components/pricing/PricingStudio';
import { TechStackShowcase } from '@/components/landing/TechStackShowcase';
import { OutcomeStories } from '@/components/landing/OutcomeStories';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { FinalCTA } from '@/components/landing/FinalCTA';

export function generateMetadata(): Metadata {
  return {
    title: 'Capucor Business Solutions — Outsourced Finance for SMEs',
    description: siteConfig.description,
    alternates: { canonical: siteConfig.url },
    openGraph: {
      type: 'website',
      locale: 'en_ZA',
      url: siteConfig.url,
      title: 'Capucor Business Solutions — Outsourced Finance for SMEs',
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [{ url: `${siteConfig.url}/api/og`, width: 1200, height: 630 }],
    },
  };
}

async function getLandingData(): Promise<{
  services: Service[];
  tiers: Tier[];
  brackets: Bracket[];
}> {
  try {
    const supabase = await createSupabaseServerClient();

    const [servicesRes, tiersRes, bracketsRes] = await Promise.all([
      supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('display_order')
        .returns<Service[]>(),
      supabase
        .from('tiers')
        .select('*')
        .eq('active', true)
        .order('display_order')
        .returns<Tier[]>(),
      supabase
        .from('brackets')
        .select('*')
        .eq('active', true)
        .order('display_order')
        .returns<Bracket[]>(),
    ]);

    return {
      services: servicesRes.data ?? [],
      tiers: tiersRes.data ?? [],
      brackets: bracketsRes.data ?? [],
    };
  } catch {
    return { services: [], tiers: [], brackets: [] };
  }
}

export default async function HomePage() {
  const { services, brackets, tiers } = await getLandingData();

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AccountingService',
            name: 'Capucor Business Solutions',
            url: siteConfig.url,
            description: siteConfig.description,
            areaServed: 'ZA',
            sameAs: [
              siteConfig.links.facebook,
              siteConfig.links.instagram,
              siteConfig.links.linkedin,
            ],
          }),
        }}
      />

      {/* A. The Hero: "The First Five Seconds" */}
      <HeroSection />

      {/* Social Proof Interlude */}
      <SocialProofStrip />

      {/* B. The Conflict: "The Financial Noise" */}
      <FinancialNoise />

      {/* C. The Solution: "The Capucor Flow" */}
      <ServicePillars />

      {/* Narrative Bridge: How it Works */}
      <HowItWorks />

      {/* D. The Grand Finale: "The Pricing Studio" */}
      <PricingStudio 
        brackets={brackets} 
        tiers={tiers} 
      />

      {/* Trust & Proof */}
      <TechStackShowcase />
      <OutcomeStories />
      <FaqAccordion />
      <FinalCTA />
    </>
  );
}
