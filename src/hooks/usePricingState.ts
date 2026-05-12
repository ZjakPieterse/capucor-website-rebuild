'use client';

import { useCallback, useState } from 'react';
import type { BracketValue, PricingState } from '@/types';

export function usePricingState() {
  const [state, setState] = useState<PricingState>({
    step: 1,
    selectedServices: new Set(),
    selectedBrackets: {},
    selectedTier: null,
  });

  const setStep = useCallback((step: PricingState['step']) => {
    setState((s) => ({ ...s, step }));
  }, []);

  const toggleService = useCallback((slug: string) => {
    setState((s) => {
      const next = new Set(s.selectedServices);
      if (next.has(slug)) {
        next.delete(slug);
        const brackets = { ...s.selectedBrackets };
        delete brackets[slug];
        // If no services remain, clear the tier too so we don't carry an orphan selection.
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
