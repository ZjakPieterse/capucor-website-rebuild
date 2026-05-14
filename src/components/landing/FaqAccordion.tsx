"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { faqs } from "@/config/faq";

export function FaqAccordion() {
  return (
    <section id="faq" className="premium-section py-28 lg:py-36">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-center">
            FAQ
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <Accordion
            multiple={false}
            className="premium-glass w-full rounded-2xl border border-white/10 px-6"
          >
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
