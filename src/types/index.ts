export type BracketValue = number | 'enterprise';

export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  bracket_unit_label: string;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface Bracket {
  id: string;
  service_slug: string;
  ordinal: number;
  label: string;
  is_enterprise: boolean;
  display_order: number;
  active: boolean;
  basic_price: number;
  pro_price: number;
  premium_price: number;
}

export interface Tier {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  multiplier: number;
  display_order: number;
  active: boolean;
}

export interface TierInclusion {
  id: string;
  tier_slug: string;
  service_slug: string;
  inclusion: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  business: string | null;
  quote: string;
  avatar_url: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface PricingData {
  services: Service[];
  brackets: Bracket[];
  tiers: Tier[];
  inclusions: TierInclusion[];
}

export interface PricingState {
  step: 1 | 2 | 3;
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  selectedTier: string | null;
}

export interface LeadPayload {
  source: 'signup' | 'quote' | 'enterprise' | 'contact' | 'call';
  name: string;
  email: string;
  business?: string;
  phone?: string;
  message?: string;
  config?: Record<string, unknown>;
  consent_given: true;
  website?: string;
}
