import type { Metadata } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { siteConfig } from '@/config/site';
import type { Service, Tier } from '@/types';

import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProofStrip } from '@/components/landing/SocialProofStrip';
import { ProblemCards } from '@/components/landing/ProblemCards';
import { WhyCapucor } from '@/components/landing/WhyCapucor';
import { ServicePillars } from '@/components/landing/ServicePillars';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CalculatorPreview } from '@/components/landing/CalculatorPreview';
import { PackagesTeaser } from '@/components/landing/PackagesTeaser';
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
}> {
  try {
    const supabase = await createSupabaseServerClient();

    const [servicesRes, tiersRes] = await Promise.all([
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
    ]);

    return {
      services: servicesRes.data ?? [],
      tiers: tiersRes.data ?? [],
    };
  } catch {
    return { services: [], tiers: [] };
  }
}

export default async function HomePage() {
  const { services, tiers } = await getLandingData();

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
            priceRange: 'R725 – custom/month',
            sameAs: [
              siteConfig.links.facebook,
              siteConfig.links.instagram,
              siteConfig.links.linkedin,
            ],
          }),
        }}
      />

      {/* 1. Hero */}
      <HeroSection />
      {/* 2. Trust strip */}
      <SocialProofStrip />
      {/* 3. Problem */}
      <ProblemCards />
      {/* 4. Outcomes */}
      <WhyCapucor />
      {/* 5. Services */}
      <ServicePillars />
      {/* 6. How the monthly finance system works */}
      <HowItWorks />
      {/* 7. Calculator preview */}
      <CalculatorPreview />
      {/* 8. Packages */}
      <PackagesTeaser services={services} tiers={tiers} />
      {/* 9. Tech stack */}
      <TechStackShowcase />
      {/* 10. Client outcomes */}
      <OutcomeStories />
      {/* 11. FAQ */}
      <FaqAccordion />
      {/* 12. Final CTA */}
      <FinalCTA />
    </>
  );
}
