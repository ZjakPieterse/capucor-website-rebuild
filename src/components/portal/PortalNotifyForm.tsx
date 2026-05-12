'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConsentCheckbox } from '@/components/ui/ConsentCheckbox';

const NotifySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  website: z.string().max(0).optional(),
});

type NotifyValues = z.infer<typeof NotifySchema>;

export function PortalNotifyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotifyValues>({
    resolver: zodResolver(NotifySchema),
    defaultValues: { name: '', email: '', website: '' },
  });

  async function onSubmit(values: NotifyValues) {
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
          name: values.name,
          email: values.email,
          message: 'Client portal waitlist signup',
          source: 'contact',
          consent_given: true,
          website: values.website ?? '',
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

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center space-y-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-success/15 mx-auto">
          <CheckCircle className="h-5 w-5 text-success" />
        </div>
        <h2 className="text-base font-semibold">You&apos;re on the list</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ll email you the moment the portal is ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left" noValidate>
      <input
        type="text"
        {...register('website')}
        aria-hidden="true"
        tabIndex={-1}
        className="hidden"
        autoComplete="off"
      />

      <div className="space-y-1.5">
        <Label htmlFor="portal-name">Full name</Label>
        <Input
          id="portal-name"
          placeholder="Jane Smith"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="portal-email">Email address</Label>
        <Input
          id="portal-email"
          type="email"
          placeholder="jane@company.co.za"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <ConsentCheckbox
        id="portal-consent"
        checked={consentGiven}
        onCheckedChange={setConsentGiven}
        error={consentError}
      />

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          'Notify me when it launches'
        )}
      </Button>
    </form>
  );
}
