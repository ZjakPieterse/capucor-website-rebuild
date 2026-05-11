'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/config/faq';

export function FaqAccordion() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions."
            subtitle="Something not covered here? Book a call and we'll walk you through it."
          />
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
