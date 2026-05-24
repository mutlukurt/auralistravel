"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { itineraryHighlights, planningSteps } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

const dayPlan = [
  "Arrival, boutique check-in, sunset table",
  "Private guide route through hidden coves",
  "Open morning, tasting menu, late checkout",
];

export function PlanningSection() {
  return (
    <section id="planning" className="container-pad grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="Planning Flow"
            title="From First Idea To Finished Itinerary"
            description="Auralis turns scattered inspiration into a clear travel plan you can scan, adjust, and book without losing the feeling that made you want to go."
          />
        </motion.div>
        <motion.div className="mt-9 grid gap-4" variants={stagger}>
          {planningSteps.map((step, index) => (
            <motion.article
              className="flex gap-4 rounded-[1.5rem] border border-auralis-border bg-white p-5 shadow-sm"
              key={step.title}
              variants={fadeUp}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-auralis-peach text-auralis-orange">
                <step.icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-auralis-orange">
                  Step {index + 1}
                </span>
                <h3 className="mt-1 font-heading text-lg font-extrabold text-auralis-dark">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-auralis-muted">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="relative rounded-[2.2rem] border border-auralis-orange/15 bg-auralis-peach/70 p-5 shadow-soft sm:p-7"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-white/70 blur-2xl" aria-hidden />
        <div className="relative rounded-[1.7rem] border border-white bg-white/92 p-5 text-auralis-dark shadow-sm backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4 border-b border-auralis-border pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-auralis-orange">
                Sample route
              </p>
              <h3 className="mt-2 font-heading text-2xl font-extrabold">Aegean Long Weekend</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-auralis-muted">
                A balanced preview with boutique stays, a private guide day, relaxed meal holds,
                and enough open time to keep the trip from feeling over-planned.
              </p>
            </div>
            <div className="rounded-2xl bg-auralis-peach px-4 py-3 text-sm font-extrabold text-auralis-orange">
              3 nights
            </div>
          </div>

          <div className="grid gap-4 py-6 sm:grid-cols-3">
            {itineraryHighlights.map((item) => (
              <div className="rounded-2xl border border-auralis-orange/15 bg-auralis-peach/35 p-4 text-center" key={item.label}>
                <item.icon className="mx-auto h-5 w-5 text-auralis-orange" aria-hidden />
                <div className="mt-2 font-heading text-2xl font-extrabold">{item.value}</div>
                <div className="text-xs font-bold text-auralis-muted">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {dayPlan.map((item) => (
              <div
                className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-auralis-dark shadow-sm"
                key={item}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-auralis-orange" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
