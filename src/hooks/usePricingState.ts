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

  // Every visit to /pricing starts blank: the first persist overwrites any
  // prior draft with DEFAULT_STATE. Continue/Back within the page don't
  // unmount this hook, so in-session step state still flows; only fresh
  // navigation or refresh resets it.
  useEffect(() => {
    persistToStorage(state);
  }, [state]);

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
