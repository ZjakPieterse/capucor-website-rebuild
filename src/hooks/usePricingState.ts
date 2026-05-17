'use client';

import { useCallback, useEffect, useState } from 'react';
import type { BracketValue, CalculatorStep, PricingState } from '@/types';

const STORAGE_KEY = 'capucor.pricing.draft.v1';

const DEFAULT_STATE: PricingState = {
  step: 1,
  selectedServices: new Set(),
  selectedBrackets: {},
  selectedTier: null,
};

function hydrateFromStorage(): PricingState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;

    const p = parsed as Record<string, unknown>;
    const stepRaw = typeof p.step === 'number' ? p.step : 1;
    const step: CalculatorStep = (stepRaw >= 1 && stepRaw <= 4 ? stepRaw : 1) as CalculatorStep;
    const services = Array.isArray(p.selectedServices) ? p.selectedServices.filter((v): v is string => typeof v === 'string') : [];
    const brackets =
      p.selectedBrackets && typeof p.selectedBrackets === 'object'
        ? (p.selectedBrackets as Record<string, BracketValue>)
        : {};
    const tier = typeof p.selectedTier === 'string' ? p.selectedTier : null;

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

function persistToStorage(state: PricingState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        step: state.step,
        selectedServices: [...state.selectedServices],
        selectedBrackets: state.selectedBrackets,
        selectedTier: state.selectedTier,
      })
    );
  } catch {
    /* quota exceeded, private mode, etc. — silent */
  }
}

export function clearPricingDraft() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function usePricingState() {
  const [state, setState] = useState<PricingState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // One-time localStorage hydration after mount. Cannot use lazy useState init
  // because the component server-renders with default state; hydrating in init
  // would mismatch. Effect is the right place for this kind of external sync.
  useEffect(() => {
    const restored = hydrateFromStorage();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (restored) setState(restored);
    setHydrated(true);
  }, []);

  // Persist after hydration so we don't overwrite saved state with defaults.
  useEffect(() => {
    if (!hydrated) return;
    persistToStorage(state);
  }, [state, hydrated]);

  const setStep = useCallback((step: CalculatorStep) => {
    setState((s) => ({ ...s, step }));
  }, []);

  // Going Back clears selections made in later steps so each step is a fresh
  // choice when re-entered from below. Step 1 selections (services) are kept.
  const setStepBack = useCallback((step: CalculatorStep) => {
    setState((s) => {
      const next: PricingState = { ...s, step };
      if (step <= 1) next.selectedBrackets = {};
      if (step <= 2) next.selectedTier = null;
      return next;
    });
  }, []);

  const toggleService = useCallback((slug: string) => {
    setState((s) => {
      const next = new Set(s.selectedServices);
      if (next.has(slug)) {
        next.delete(slug);
        const brackets = { ...s.selectedBrackets };
        delete brackets[slug];
        const selectedTier = next.size === 0 ? null : s.selectedTier;
        return { ...s, selectedServices: next, selectedBrackets: brackets, selectedTier };
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
  const canProceedStep3 = state.selectedTier !== null;

  return {
    state,
    setStep,
    setStepBack,
    toggleService,
    setBracket,
    setTier,
    canProceedStep1,
    canProceedStep2,
    canProceedStep3,
  };
}
