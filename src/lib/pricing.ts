import type { Bracket, BracketValue } from '@/types';

export function bracketPrice(
  bracket: Pick<Bracket, 'basic_price' | 'pro_price' | 'premium_price'>,
  tierSlug: string
): number {
  if (tierSlug === 'pro')     return bracket.pro_price;
  if (tierSlug === 'premium') return bracket.premium_price;
  return bracket.basic_price;
}

export function monthlyTotal(
  selectedSlugs: string[],
  bracketSelections: Record<string, BracketValue>,
  tierSlug: string,
  allBrackets: Pick<Bracket, 'service_slug' | 'ordinal' | 'basic_price' | 'pro_price' | 'premium_price'>[]
): number {
  return selectedSlugs.reduce((sum, slug) => {
    const sel = bracketSelections[slug];
    if (sel === 'enterprise' || sel === undefined) return sum;
    const b = allBrackets.find((x) => x.service_slug === slug && x.ordinal === sel);
    return b ? sum + bracketPrice(b, tierSlug) : sum;
  }, 0);
}

export function hasEnterpriseService(
  selectedSlugs: string[],
  brackets: Record<string, BracketValue>
): boolean {
  return selectedSlugs.some((slug) => brackets[slug] === 'enterprise');
}

// hasEnterpriseService → true  → primary CTA = "Get a Custom Quote", source = 'enterprise'
// hasEnterpriseService → false → primary CTA = "Sign Up",             source = 'signup'
// monthlyTotal always excludes enterprise lines; a non-zero total is shown alongside
// "Custom" in mixed state (e.g. "From R 1,528/month + custom pricing").
