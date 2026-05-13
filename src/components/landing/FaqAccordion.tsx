'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'motion/react';
import { faqs } from '@/config/faq';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FaqAccordion() {
  return (
    <section id="faq" className="relative py-24 lg:py-40 bg-[#060a14] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <SectionHeading
            eyebrow="Common Questions"
            title="Everything you need to know"
            subtitle="Clear answers about how we work, what you get, and how we handle your business data."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="border border-white/10 rounded-[24px] bg-[#070c1a]/50 backdrop-blur-xl px-6 lg:px-8 transition-all hover:border-white/20 data-[state=open]:border-emerald-500/30"
              >
                <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline text-white/90 hover:text-white transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/50 text-base leading-relaxed pb-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
