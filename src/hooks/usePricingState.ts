'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { BracketValue, PricingState } from '@/types';

const STORAGE_KEY = 'capucor:pricing-config:v1';

export function usePricingState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<PricingState>(() =>
    hydrateFromParams(searchParams)
  );
  const hydratedFromStorageRef = useRef(false);

  // Sync URL whenever state changes
  useEffect(() => {
    const params = serializeToParams(state);
    router.replace(`/pricing?${params}`, { scroll: false });
  }, [state, router]);

  // On mount: if URL was empty, restore state from localStorage.
  // setState here is intentional — restoring browser-only persisted state.
  useEffect(() => {
    if (hydratedFromStorageRef.current) return;
    hydratedFromStorageRef.current = true;
    const urlHasServices = !!searchParams.get('services');
    if (urlHasServices) return;
    const stored = readStorage();
    if (stored && stored.selectedServices.size > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(stored);
    }
    // searchParams read once on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist state to localStorage after initial hydration
  useEffect(() => {
    if (!hydratedFromStorageRef.current) return;
    writeStorage(state);
  }, [state]);

  const setStep = useCallback((step: PricingState['step']) => {
    setState((s) => ({ ...s, step }));
  }, []);

  const toggleService = useCallback((slug: string) => {
    setState((s) => {
      const next = new Set(s.selectedServices);
      if (next.has(slug)) {
        next.delete(slug);
        // Remove bracket when service is deselected
        const brackets = { ...s.selectedBrackets };
        delete brackets[slug];
        return { ...s, selectedServices: next, selectedBrackets: brackets };
      } else {
        next.add(slug);
        return { ...s, selectedServices: next };
      }
    });
  }, []);

  const setBracket = useCallback((slug: string, value: BracketValue) => {
    setState((s) => ({
      ...s,
      selectedBrackets: { ...s.selectedBrackets, [slug]: value },
    }));
  }, []);

  const setTier = useCallback((tierSlug: string) => {
    setState((s) => ({ ...s, selectedTier: tierSlug }));
  }, []);

  const canProceedStep1 = state.selectedServices.size > 0;
  const canProceedStep2 =
    state.selectedServices.size > 0 &&
    [...state.selectedServices].every((slug) => slug in state.selectedBrackets);

  return {
    state,
    setStep,
    toggleService,
    setBracket,
    setTier,
    canProceedStep1,
    canProceedStep2,
  };
}

function hydrateFromParams(params: URLSearchParams): PricingState {
  const servicesParam = params.get('services') ?? '';
  const bracketsParam = params.get('brackets') ?? '';
  const tierParam = params.get('tier') ?? null;

  const selectedServices = new Set(
    servicesParam ? servicesParam.split(',').filter(Boolean) : []
  );

  const selectedBrackets: Record<string, BracketValue> = {};
  if (bracketsParam) {
    for (const entry of bracketsParam.split(',')) {
      const [slug, raw] = entry.split(':');
      if (!slug || !raw) continue;
      selectedBrackets[slug] = raw === 'enterprise' ? 'enterprise' : parseInt(raw, 10);
    }
  }

  const step: PricingState['step'] =
    selectedServices.size > 0 && Object.keys(selectedBrackets).length > 0
      ? 3
      : selectedServices.size > 0
      ? 2
      : 1;

  return {
    step: tierParam && step === 3 ? 3 : (step as PricingState['step']),
    selectedServices,
    selectedBrackets,
    selectedTier: tierParam,
  };
}

function readStorage(): PricingState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return null;
    const obj = parsed as Record<string, unknown>;

    const services = Array.isArray(obj.services)
      ? obj.services.filter((s): s is string => typeof s === 'string')
      : [];
    const brackets: Record<string, BracketValue> = {};
    if (obj.brackets && typeof obj.brackets === 'object') {
      for (const [k, v] of Object.entries(obj.brackets as Record<string, unknown>)) {
        if (v === 'enterprise' || typeof v === 'number') {
          brackets[k] = v as BracketValue;
        }
      }
    }
    const tier = typeof obj.tier === 'string' ? obj.tier : null;
    const step =
      obj.step === 1 || obj.step === 2 || obj.step === 3
        ? (obj.step as PricingState['step'])
        : 1;

    return {
      step,
      selectedServices: new Set(services),
      selectedBrackets: brackets,
      selectedTier: tier,
    };
  } catch {
    return null;
  }
}

function writeStorage(state: PricingState): void {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      step: state.step,
      services: [...state.selectedServices],
      brackets: state.selectedBrackets,
      tier: state.selectedTier,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage unavailable (privacy mode, quota) — silent fail
  }
}

function serializeToParams(state: PricingState): string {
  const p = new URLSearchParams();

  if (state.selectedServices.size > 0) {
    p.set('services', [...state.selectedServices].join(','));
  }

  const brackets = Object.entries(state.selectedBrackets);
  if (brackets.length > 0) {
    p.set(
      'brackets',
      brackets.map(([slug, val]) => `${slug}:${val}`).join(',')
    );
  }

  if (state.selectedTier) {
    p.set('tier', state.selectedTier);
  }

  return p.toString();
}
