import type { Metadata } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { siteConfig } from '@/config/site';
import type { Service, Tier, Testimonial } from '@/types';

import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProofStrip } from '@/components/landing/SocialProofStrip';
import { ProblemCards } from '@/components/landing/ProblemCards';
import { ServicePillars } from '@/components/landing/ServicePillars';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { TechStackShowcase } from '@/components/landing/TechStackShowcase';
import { WhyCapucor } from '@/components/landing/WhyCapucor';
import { Testimonials } from '@/components/landing/Testimonials';
import { PackagesTeaser } from '@/components/landing/PackagesTeaser';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { ContactForm } from '@/components/landing/ContactForm';

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
  testimonials: Testimonial[];
}> {
  try {
    const supabase = await createSupabaseServerClient();

    const [servicesRes, tiersRes, testimonialsRes] = await Promise.all([
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
        .from('testimonials')
        .select('*')
        .eq('active', true)
        .order('display_order')
        .returns<Testimonial[]>(),
    ]);

    return {
      services: servicesRes.data ?? [],
      tiers: tiersRes.data ?? [],
      testimonials: testimonialsRes.data ?? [],
    };
  } catch {
    return { services: [], tiers: [], testimonials: [] };
  }
}

export default async function HomePage() {
  const { services, tiers, testimonials } = await getLandingData();

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

      <HeroSection />
      <SocialProofStrip />
      <ProblemCards />
      <ServicePillars />
      <HowItWorks />
      <TechStackShowcase />
      <WhyCapucor />
      <Testimonials testimonials={testimonials} />
      <PackagesTeaser services={services} tiers={tiers} />
      <FaqAccordion />
      <ContactForm />
    </>
  );
}
