'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Calendar, Loader2, X } from 'lucide-react';
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
}

export function GetQuoteModal({ open, onOpenChange, source, config }: GetQuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
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
              ? 'Enquiry received'
              : source === 'enterprise'
              ? 'Get a Custom Quote'
              : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <SuccessState onClose={() => handleClose(false)} />
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
                'Sign Up'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center space-y-4 py-4">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 mx-auto">
        <CheckCircle className="h-6 w-6 text-success" />
      </div>
      <p className="text-sm text-muted-foreground">
        We&rsquo;ll be in touch within one business day.
      </p>
      <div className="flex gap-3 justify-center">
        <Button
          render={
            <a
              href={siteConfig.links.booking}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          variant="outline"
          className="gap-2"
        >
          <Calendar className="h-4 w-4" />
          Book a Call
        </Button>
        <Button variant="outline" onClick={onClose} className="gap-2">
          <X className="h-4 w-4" />
          Close
        </Button>
      </div>
    </div>
  );
}
