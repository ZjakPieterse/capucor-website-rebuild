'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Calendar, Loader2, X, Mail, Phone, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ConsentCheckbox } from '@/components/ui/ConsentCheckbox';
import { siteConfig } from '@/config/site';
import { formatZAR } from '@/lib/utils';
import type { BracketValue } from '@/types';

const QuoteSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  business: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
});

type QuoteValues = z.infer<typeof QuoteSchema>;

export interface QuoteSummaryLine {
  serviceName: string;
  bracketLabel: string;
  price: number | null;
}

export interface QuoteSummary {
  lines: QuoteSummaryLine[];
  tierName: string | null;
  total: number;
  isEnterprise: boolean;
}

interface GetQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: 'signup' | 'enterprise';
  config: {
    services: string[];
    brackets: Record<string, BracketValue>;
    tier: string | null;
    hasEnterprise: boolean;
  };
  summary?: QuoteSummary;
}

export function GetQuoteModal({ open, onOpenChange, source, config, summary }: GetQuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteValues>({
    resolver: zodResolver(QuoteSchema),
  });

  function handleClose(nextOpen: boolean) {
    if (!nextOpen) {
      reset();
      setSubmitted(false);
      setSubmittedName('');
      setServerError(null);
      setConsentGiven(false);
      setConsentError('');
    }
    onOpenChange(nextOpen);
  }

  async function onSubmit(values: QuoteValues) {
    if (!consentGiven) {
      setConsentError('You must consent before submitting.');
      return;
    }
    setConsentError('');
    setServerError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          source,
          consent_given: true,
          config: {
            services: config.services,
            brackets: config.brackets,
            tier: config.tier,
            hasEnterprise: config.hasEnterprise,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Submission failed. Please try again.');
      setSubmittedName(values.name.split(' ')[0] ?? '');
      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {submitted
              ? `Welcome to Capucor${submittedName ? `, ${submittedName}` : ''}.`
              : source === 'enterprise'
              ? 'Get a Custom Quote'
              : 'Complete your subscription'}
          </DialogTitle>
          {!submitted && (
            <p className="text-sm text-muted-foreground mt-1">
              {source === 'enterprise'
                ? "Tell us about your business and we'll send you a quote within one business day."
                : "We'll be in touch within one business day to get everything set up."}
            </p>
          )}
        </DialogHeader>

        {submitted ? (
          <SuccessState summary={summary} onClose={() => handleClose(false)} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2" noValidate>
            {/* Honeypot */}
            <input
              type="text"
              {...register('website')}
              aria-hidden="true"
              tabIndex={-1}
              className="hidden"
              autoComplete="off"
            />

            {summary && summary.lines.length > 0 && (
              <SummaryCard summary={summary} />
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="quote-name">Full name *</Label>
                <Input
                  id="quote-name"
                  placeholder="Jane Smith"
                  aria-invalid={!!errors.name}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quote-email">Email *</Label>
                <Input
                  id="quote-email"
                  type="email"
                  placeholder="jane@co.za"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quote-business">Business name</Label>
              <Input id="quote-business" placeholder="Acme (Pty) Ltd" {...register('business')} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quote-phone">Phone</Label>
              <Input id="quote-phone" type="tel" placeholder="+27 11 000 0000" {...register('phone')} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quote-message">Message</Label>
              <Textarea
                id="quote-message"
                placeholder="Any additional context or questions…"
                rows={3}
                {...register('message')}
              />
            </div>

            <ConsentCheckbox
              id="quote-consent"
              checked={consentGiven}
              onCheckedChange={setConsentGiven}
              error={consentError}
            />

            {serverError && (
              <p className="text-sm text-destructive">{serverError}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : source === 'enterprise' ? (
                'Get a Custom Quote'
              ) : (
                'Complete Subscription'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SummaryCard({ summary }: { summary: QuoteSummary }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-4 space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          Your subscription
        </p>
        {!summary.isEnterprise && summary.total > 0 && (
          <p className="text-lg font-bold font-mono tabular-nums">
            {formatZAR(summary.total)}
            <span className="text-xs font-normal text-muted-foreground ml-1">/mo</span>
          </p>
        )}
        {summary.isEnterprise && summary.total > 0 && (
          <p className="text-sm font-semibold font-mono tabular-nums">
            From {formatZAR(summary.total)}
          </p>
        )}
        {summary.isEnterprise && summary.total === 0 && (
          <p className="text-sm font-semibold">Custom quote</p>
        )}
      </div>
      <div className="space-y-1.5 pt-2 border-t border-primary/15">
        {summary.lines.map((line) => (
          <div
            key={line.serviceName}
            className="flex items-baseline justify-between gap-3 text-xs"
          >
            <span className="text-muted-foreground">
              {line.serviceName}
              {line.bracketLabel ? ` · ${line.bracketLabel}` : ''}
            </span>
            <span className="font-mono tabular-nums text-foreground">
              {line.price !== null ? formatZAR(line.price) : 'Custom'}
            </span>
          </div>
        ))}
        {summary.tierName && (
          <p className="text-[11px] text-muted-foreground pt-1">
            {summary.tierName} plan · excl. VAT
          </p>
        )}
      </div>
    </div>
  );
}

const NEXT_STEPS = [
  { icon: Mail, label: 'Email confirmation', detail: 'within 1 hour' },
  { icon: Phone, label: 'Onboarding call', detail: 'within 1 business day' },
  { icon: Sparkles, label: 'Your finance team takes over', detail: 'from week 1' },
];

function SuccessState({
  summary,
  onClose,
}: {
  summary?: QuoteSummary;
  onClose: () => void;
}) {
  return (
    <div className="space-y-5 mt-2">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15">
          <CheckCircle className="h-6 w-6 text-success" />
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
          Your quote is logged. We&apos;ll be in touch within one business day.
        </p>
      </div>

      {summary && summary.lines.length > 0 && <SummaryCard summary={summary} />}

      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          What happens next
        </p>
        <ol className="space-y-2.5">
          {NEXT_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.label} className="flex items-center gap-3 text-sm">
                <div className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                  {i + 1}
                </div>
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium">{step.label}</span>
                  <span className="text-muted-foreground"> · {step.detail}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          render={
            <a
              href={siteConfig.links.booking}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          variant="outline"
          className="flex-1 gap-2"
        >
          <Calendar className="h-4 w-4" />
          Book a call instead
        </Button>
        <Button variant="outline" onClick={onClose} className="gap-2">
          <X className="h-4 w-4" />
          Close
        </Button>
      </div>
    </div>
  );
}
