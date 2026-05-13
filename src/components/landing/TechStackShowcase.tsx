'use client';

import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const TOOLS = [
  {
    name: 'Xero',
    tagline: 'Real-time ledger',
    benefit: 'Your business records live in one cloud ledger that is processed and ready for reporting.',
    accent: '#22d3ee',
  },
  {
    name: 'Dext',
    tagline: 'Document capture',
    benefit: 'Supplier invoices and receipts are captured and pushed into the workflow automatically.',
    accent: '#4ade80',
  },
  {
    name: 'Syft',
    tagline: 'Management reporting',
    benefit: 'Dashboards turn the ledger into a clearer view of revenue, expenses, and cash flow.',
    accent: '#a78bfa',
  },
  {
    name: 'Karbon',
    tagline: 'Workflow control',
    benefit: 'Monthly tasks and compliance dates are tracked so work does not rely on memory.',
    accent: '#fb923c',
  },
  {
    name: 'SimplePay',
    tagline: 'Payroll processing',
    benefit: 'Payslips, PAYE calculations, and EMP201 support stay structured and compliant.',
    accent: '#f472b6',
  },
  {
    name: 'Draftworx',
    tagline: 'Financial statements',
    benefit: 'Annual financial statements are prepared from clean records for banks and stakeholders.',
    accent: '#7ba8f5',
  },
];

const WORKFLOW_STEPS = ['Capture', 'Reconcile', 'Track', 'Report', 'Pay', 'Finalise'];

export function TechStackShowcase() {
  return (
    <section id="tech-stack" className="relative py-24 lg:py-40 bg-[#060a14] overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <SectionHeading
            eyebrow="The Engine"
            title="Modern finance tools, built for your business"
            subtitle="Software is not the service. The service is how we set it up, monitor it, and use it to keep your business in control."
            align="left"
          />
        </div>

        {/* Workflow Strip */}
        <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-4 mb-20">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{step}</span>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="w-8 h-px bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group relative p-8 rounded-[32px] bg-[#070c1a]/50 backdrop-blur-2xl border border-white/5 hover:border-white/10 transition-all overflow-hidden"
            >
              {/* Subtle accent glow */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: tool.accent }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xl font-bold text-white tracking-tight">{tool.name}</div>
                  <div 
                    className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]"
                    style={{ color: tool.accent, backgroundColor: tool.accent }}
                  />
                </div>
                
                <div 
                  className="text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: tool.accent }}
                >
                  {tool.tagline}
                </div>
                <p className="text-sm text-white/40 leading-relaxed leading-6">
                  {tool.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-[32px] bg-white/5 border border-white/10 text-center"
        >
          <p className="text-sm text-white/40 max-w-2xl mx-auto italic">
            &ldquo;The value isn&apos;t the cloud ledger; it&apos;s the professional hands that keep it clean, the senior eyes that review the numbers, and the advisor who tells you what they mean.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
