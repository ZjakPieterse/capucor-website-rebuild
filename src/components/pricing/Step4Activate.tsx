'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConsentCheckbox } from '@/components/ui/ConsentCheckbox';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import {
  BusinessDetailsSchema,
  SubscriptionRequestSchema,
} from '@/lib/validations';
import { z } from 'zod';
import { formatZAR, cn } from '@/lib/utils';
import { bracketPrice, monthlyTotal } from '@/lib/pricing';
import type { Bracket, BracketValue, Service, Tier } from '@/types';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { motion } from 'motion/react';

const VAT_RATE = 0.15;

const FormSchema = z.object({
  fullName: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Enter a valid email address'),
  business: BusinessDetailsSchema,
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof FormSchema>;

interface Step4ActivateProps {
  services: Service[];
  brackets: Bracket[];
  tiers: Tier[];
  selectedServices: Set<string>;
  selectedBrackets: Record<string, BracketValue>;
  selectedTier: string | null;
  onBack: () => void;
}

const SECTORS = [
  'Professional services',
  'Retail / e-commerce',
  'Hospitality / food',
  'Manufacturing',
  'Construction',
  'Health / wellness',
  'Tech / software',
  'Property',
  'Other',
];

export function Step4Activate({
  services,
  brackets,
  tiers,
  selectedServices,
  selectedBrackets,
  selectedTier,
  onBack,
}: Step4ActivateProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState('');

  const activeServiceSlugs = [...selectedServices];
  const activeServices = services.filter((s) => selectedServices.has(s.slug));
  const tier = tiers.find((t) => t.slug === selectedTier) ?? null;

  const integerBrackets: Record<string, number> = {};
  for (const [slug, value] of Object.entries(selectedBrackets)) {
    if (typeof value === 'number') integerBrackets[slug] = value;
  }

  const monthlyZAR = tier
    ? monthlyTotal(activeServiceSlugs, selectedBrackets, tier.slug, brackets)
    : 0;
  const vatZAR = Math.round(monthlyZAR * VAT_RATE);
  const totalChargeZAR = monthlyZAR + vatZAR;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      business: { legalName: '', cipcNumber: '', vatNumber: '', sector: '' },
      website: '',
    },
  });

  const selectedSector = useWatch({
    control,
    name: 'business.sector',
  });

  async function onSubmit(values: FormValues) {
    if (!consentGiven) {
      setConsentError('Consent is required to activate.');
      return;
    }
    setConsentError('');
    setServerError(null);

    if (!tier) return;

    const payload = {
      services: activeServiceSlugs,
      brackets: integerBrackets,
      tierSlug: tier.slug,
      email: values.email,
      fullName: values.fullName,
      business: values.business,
      consentGiven: true as const,
      website: values.website ?? '',
    };

    const parsed = SubscriptionRequestSchema.safeParse(payload);
    if (!parsed.success) {
      setServerError(parsed.error.issues[0]?.message ?? 'Check your inputs.');
      return;
    }

    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed.');

      if (typeof data.authorizationUrl === 'string') {
        window.location.assign(data.authorizationUrl);
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 max-w-4xl mx-auto" noValidate>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Activate Subscription</h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Finalize your details to move to the secure payment page. We&apos;ll be ready to start within 24 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-10">
          <section className="space-y-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Account Holder</div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs font-bold text-white/60">Full Name</Label>
                <Input
                  id="fullName"
                  className="bg-white/5 border-white/5 focus:border-emerald-500/50 text-white h-12"
                  {...register('fullName')}
                />
                {errors.fullName && <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-white/60">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-white/5 border-white/5 focus:border-emerald-500/50 text-white h-12"
                  {...register('email')}
                />
                {errors.email && <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{errors.email.message}</p>}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Business Details</div>
            <div className="space-y-2">
              <Label htmlFor="legalName" className="text-xs font-bold text-white/60">Registered Name</Label>
              <Input
                id="legalName"
                placeholder="e.g. Acme Solutions (Pty) Ltd"
                className="bg-white/5 border-white/5 focus:border-emerald-500/50 text-white h-12"
                {...register('business.legalName')}
              />
              {errors.business?.legalName && <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{errors.business.legalName.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cipcNumber" className="text-xs font-bold text-white/60">CIPC Number (Optional)</Label>
                <Input id="cipcNumber" placeholder="2020/123456/07" className="bg-white/5 border-white/5 focus:border-emerald-500/50 text-white h-12" {...register('business.cipcNumber')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vatNumber" className="text-xs font-bold text-white/60">VAT Number (Optional)</Label>
                <Input id="vatNumber" placeholder="4xxxxxxxxx" className="bg-white/5 border-white/5 focus:border-emerald-500/50 text-white h-12" {...register('business.vatNumber')} />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold text-white/60">Industry Sector</Label>
              <div className="flex flex-wrap gap-2">
                {SECTORS.map((s) => {
                  const isSelected = selectedSector === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setValue('business.sector', s, { shouldValidate: true })}
                      className={cn(
                        "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                        isSelected 
                          ? "bg-emerald-500 text-[#060a14]" 
                          : "bg-white/5 border border-white/5 text-white/40 hover:border-white/20"
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {errors.business?.sector && <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{errors.business.sector.message}</p>}
            </div>
          </section>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
           <div className="sticky top-24 p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-6">Subscription Summary</div>
              
              <div className="space-y-6 mb-8">
                 {activeServices.map((svc) => {
                    const sel = integerBrackets[svc.slug];
                    const bracket = brackets.find((b) => b.service_slug === svc.slug && b.ordinal === sel);
                    const price = bracket && tier ? bracketPrice(bracket, tier.slug) : 0;
                    return (
                      <div key={svc.slug} className="flex justify-between items-start">
                        <div>
                          <div className="text-xs font-bold text-white mb-1">{svc.name}</div>
                          <div className="text-[10px] text-white/30 uppercase tracking-widest">{bracket?.label}</div>
                        </div>
                        <div className="text-xs font-bold text-white/60 font-mono">{formatZAR(price)}</div>
                      </div>
                    );
                 })}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                 <div className="flex justify-between text-xs font-bold text-white/20 uppercase tracking-widest">
                    <span>Base Monthly</span>
                    <span className="font-mono">{formatZAR(monthlyZAR)}</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-white/20 uppercase tracking-widest">
                    <span>VAT (15%)</span>
                    <span className="font-mono">{formatZAR(vatZAR)}</span>
                 </div>
                 <div className="flex justify-between items-baseline pt-4 border-t border-white/10">
                    <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">Total</span>
                    <div className="text-2xl font-bold text-emerald-400 font-mono">
                      <AnimatedPrice amount={totalChargeZAR} />
                    </div>
                 </div>
              </div>

              <div className="mt-10 space-y-4">
                 <div className="flex items-center gap-3 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    <Shield className="w-4 h-4 text-emerald-500/40" />
                    Secure Checkout by Paystack
                 </div>
                 <div className="flex items-center gap-3 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    <Sparkles className="w-4 h-4 text-emerald-500/40" />
                    Month-to-Month Flexibility
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
        <MagneticButton>
          <button 
            type="button"
            onClick={onBack}
            className="text-white/40 font-bold text-sm hover:text-white transition-colors"
          >
            ← Back to package
          </button>
        </MagneticButton>

        <div className="flex flex-col items-end gap-6">
           <ConsentCheckbox
             checked={consentGiven}
             onCheckedChange={(val) => {
               setConsentGiven(val);
               if (val) setConsentError('');
             }}
             className="text-white/40 text-[10px] font-bold uppercase tracking-widest"
           />
           {consentError && <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">{consentError}</p>}
           
           <MagneticButton>
             <button 
               type="submit" 
               disabled={isSubmitting}
               className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-emerald-500 text-[#060a14] font-bold text-sm hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(74,222,128,0.3)] disabled:opacity-20"
             >
               {isSubmitting ? (
                 <>
                   <Loader2 className="h-4 w-4 animate-spin" />
                   Securing...
                 </>
               ) : (
                 <>
                   Secure Checkout
                   <ArrowRight className="w-4 h-4" />
                 </>
               )}
             </button>
           </MagneticButton>
        </div>
      </div>

      {serverError && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-2xl p-4 text-center font-bold">
          {serverError}
        </p>
      )}
    </form>
  );
}
