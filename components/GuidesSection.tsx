"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import { guideHighlights, guideProfiles } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function GuidesSection() {
  return (
    <section id="guides" className="container-pad py-16 lg:py-24">
      <motion.div
        className="rounded-[2.2rem] border border-auralis-border bg-white p-5 shadow-soft sm:p-8 lg:p-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]" variants={fadeUp}>
          <SectionHeading
            eyebrow="Expert Guides"
            title="Real Local Guidance, Not Generic Tour Scripts"
            description="Every guide profile is matched by region, language, pace, and traveler style. The goal is a trip that feels supported, informed, and personal."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {guideHighlights.map((item) => (
              <div className="rounded-2xl bg-auralis-soft p-4 text-center" key={item.label}>
                <item.icon className="mx-auto h-5 w-5 text-auralis-orange" aria-hidden />
                <div className="mt-2 font-heading text-2xl font-extrabold text-auralis-dark">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-auralis-muted">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-9 grid gap-5 lg:grid-cols-3" variants={stagger}>
          {guideProfiles.map((guide) => (
            <motion.article
              className="rounded-[1.5rem] border border-auralis-border bg-auralis-soft p-5"
              key={guide.name}
              variants={fadeUp}
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-auralis-orange shadow-sm">
                  <guide.icon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-extrabold text-auralis-dark">{guide.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-auralis-muted">
                    <MapPin className="h-4 w-4 text-auralis-orange" aria-hidden />
                    {guide.region}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-auralis-muted">{guide.description}</p>
              <div className="mt-5 grid gap-2 text-sm font-semibold text-auralis-dark">
                <span className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-auralis-orange" aria-hidden />
                  {guide.specialty}
                </span>
                <span className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-auralis-orange" aria-hidden />
                  {guide.languages}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
