'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { faqs } from '@/config/faq';

export function FaqAccordion() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-widest text-primary text-center">
            FAQ
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <Accordion multiple={false} className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={i}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
