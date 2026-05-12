'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ConsentCheckbox } from '@/components/ui/ConsentCheckbox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { siteConfig } from '@/config/site';

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  business: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
});

type ContactValues = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: '', email: '', business: '', message: '', website: '' },
  });

  async function onSubmit(values: ContactValues) {
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
        body: JSON.stringify({ ...values, source: 'contact', consent_given: true }),
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
    <section
      id="contact"
      className="py-24 lg:py-32 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <ScrollReveal>
            <SectionHeading
              align="left"
              eyebrow="Get in touch"
              title="Let's get your books in order."
              subtitle="Send us a message and we'll get back to you as soon as possible. Let's talk about how to make your finance function work better."
            />
            <a
              href={siteConfig.links.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              <Calendar className="h-4 w-4" />
              Or book a Discovery Call directly
            </a>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal delay={0.1}>
            {submitted ? (
              <SuccessState />
            ) : (
              <div className="rounded-xl border border-border bg-card p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {/* Honeypot — hidden from users */}
                  <input
                    type="text"
                    {...register('website')}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="hidden"
                    autoComplete="off"
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Full name *</Label>
                      <Input
                        id="contact-name"
                        placeholder="Jane Smith"
                        aria-invalid={!!errors.name}
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Email address *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="jane@company.co.za"
                        aria-invalid={!!errors.email}
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-business">Business name</Label>
                    <Input
                      id="contact-business"
                      placeholder="Acme (Pty) Ltd"
                      {...register('business')}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us a bit about your business and what you need…"
                      rows={4}
                      {...register('message')}
                    />
                  </div>

                  <ConsentCheckbox
                    id="contact-consent"
                    checked={consentGiven}
                    onCheckedChange={setConsentGiven}
                    error={consentError}
                  />

                  {serverError && (
                    <p className="text-sm text-destructive">{serverError}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      'Send message'
                    )}
                  </Button>
                </form>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function SuccessState() {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 mx-auto">
        <CheckCircle className="h-6 w-6 text-success" />
      </div>
      <h3 className="text-lg font-semibold">Enquiry received</h3>
      <p className="text-sm text-muted-foreground">
        We&rsquo;ll be in touch within one business day.
      </p>
      <Button
        nativeButton={false}
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
        Book a 15-minute fit call
      </Button>
    </div>
  );
}
