import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Capucor Business Solutions collects, uses, and protects your personal information under POPIA.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 inline-block"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-3">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: {new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      {/* [EDITABLE] — replace all placeholder sections below with legally reviewed copy before launch */}

      <section className="prose prose-slate prose-invert max-w-none space-y-10">
        <div>
          <h2 className="text-xl font-semibold mb-3">Who we are</h2>
          <p className="text-muted-foreground leading-relaxed">
            {/* [EDITABLE] */}
            Capucor Business Solutions is an outsourced accounting firm registered in South Africa. We are the responsible party for the personal information collected through this website and in the provision of our services. Contact us at{' '}
            <a href={`mailto:${siteConfig.url.replace('https://', 'hello@')}`} className="text-primary underline underline-offset-2">
              hello@capucor.co.za
            </a>{' '}
            for any privacy-related enquiries.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">What we collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            {/* [EDITABLE] */}
            When you submit a form on this website, we collect:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Your name and email address</li>
            <li>Your business name (optional)</li>
            <li>Your phone number (optional)</li>
            <li>Your message (optional)</li>
            <li>The calculator configuration you chose (for quote enquiries)</li>
            <li>Your consent to being contacted (POPIA requirement)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">How we use it</h2>
          <p className="text-muted-foreground leading-relaxed">
            {/* [EDITABLE] */}
            We use the information you provide solely to respond to your enquiry and, where you have consented, to contact you about our services. We do not use it for unrelated marketing and do not sell or share it with third parties.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Retention period</h2>
          <p className="text-muted-foreground leading-relaxed">
            {/* [EDITABLE] */}
            Enquiry data is retained for [X years] after the date of submission, or for as long as required to fulfil the purpose for which it was collected. Clients who engage our services are subject to a separate engagement-level data processing agreement.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Your rights under POPIA</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            {/* [EDITABLE] */}
            Under the Protection of Personal Information Act 4 of 2013 (POPIA), you have the right to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Be notified when your personal information is collected</li>
            <li>Access your personal information held by us</li>
            <li>Request correction of inaccurate information</li>
            <li>Object to the processing of your information</li>
            <li>Request deletion of your information (subject to legal retention requirements)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            {/* [EDITABLE] */}
            To exercise any of these rights, email us at{' '}
            <a href="mailto:privacy@capucor.co.za" className="text-primary underline underline-offset-2">
              privacy@capucor.co.za
            </a>
            . We will respond within 30 days.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Data security</h2>
          <p className="text-muted-foreground leading-relaxed">
            {/* [EDITABLE] */}
            Your data is stored in Supabase (hosted on AWS), which applies bank-grade encryption at rest and in transit. Access is restricted to authorised Capucor staff only.
          </p>
        </div>

        <div className="rounded-lg border border-warning/40 bg-warning/5 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note for owner:</strong> This page contains placeholder text marked{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">[EDITABLE]</code>. Please have this reviewed and completed by a legal professional before your site goes live. See{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">CONTENT_TODO.md</code> for the full list of placeholders.
          </p>
        </div>
      </section>
    </article>
  );
}
