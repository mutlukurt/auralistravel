"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function FAQSection() {
  return (
    <section id="faq" className="container-pad grid gap-10 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:py-24">
      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
        <SectionHeading
          eyebrow="Questions"
          title="Clear Answers Before Your Trip Takes Shape"
          description="The details that usually slow down booking are brought forward early, so you know what is flexible, supported, and included."
        />
      </motion.div>

      <motion.div
        className="grid gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {faqs.map((item, index) => (
          <motion.details
            className="group rounded-[1.5rem] border border-auralis-border bg-white p-5 shadow-sm open:shadow-soft"
            key={item.question}
            variants={fadeUp}
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-extrabold text-auralis-dark">
              {item.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-auralis-orange transition group-open:rotate-180" aria-hidden />
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-auralis-muted">{item.answer}</p>
          </motion.details>
        ))}
      </motion.div>
    </section>
  );
}
