import type { Metadata } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import { PricingErrorBoundary, PricingUnavailable } from '@/components/pricing/PricingErrorBoundary';
import { siteConfig } from '@/config/site';
import type { PricingData } from '@/types';

export const metadata: Metadata = {
  title: 'Pricing Calculator',
  description:
    'Build your exact subscription. Transparent, fixed monthly pricing for accounting, bookkeeping, and payroll.',
  alternates: { canonical: `${siteConfig.url}/pricing` },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: `${siteConfig.url}/pricing`,
    title: 'Pricing Calculator — Capucor Business Solutions',
    description:
      'Build your exact subscription. Transparent, fixed monthly pricing for accounting, bookkeeping, and payroll.',
    images: [{ url: `${siteConfig.url}/api/og?page=pricing`, width: 1200, height: 630 }],
  },
};

async function getPricingData(): Promise<PricingData | null> {
  try {
    const supabase = await createSupabaseServerClient();

    const [servicesRes, bracketsRes, tiersRes, inclusionsRes] = await Promise.all([
      supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('display_order'),
      supabase
        .from('brackets')
        .select('*')
        .eq('active', true)
        .order('display_order'),
      supabase
        .from('tiers')
        .select('*')
        .eq('active', true)
        .order('display_order'),
      supabase
        .from('tier_inclusions')
        .select('*')
        .order('display_order'),
    ]);

    if (
      servicesRes.error ||
      bracketsRes.error ||
      tiersRes.error ||
      inclusionsRes.error
    ) {
      throw new Error('Supabase query error');
    }

    return {
      services: (servicesRes.data ?? []) as PricingData['services'],
      brackets: (bracketsRes.data ?? []) as PricingData['brackets'],
      tiers: (tiersRes.data ?? []) as PricingData['tiers'],
      inclusions: (inclusionsRes.data ?? []) as PricingData['inclusions'],
    };
  } catch {
    return null;
  }
}

export default async function PricingPage() {
  const pricingData = await getPricingData();

  if (!pricingData) {
    return <PricingUnavailable />;
  }

  return (
    <PricingErrorBoundary>
      <PricingCalculator data={pricingData} />
    </PricingErrorBoundary>
  );
}
