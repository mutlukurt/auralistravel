"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { experiences } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function ExperienceSection() {
  return (
    <section id="tours" className="container-pad py-16 lg:py-24">
      <motion.div
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="Signature Tours"
            title="Handpicked Experiences With A Local Pulse"
            description="Move beyond generic packages with routes that blend beautiful stays, thoughtful pacing, local tables, and guides who know the details."
          />
        </motion.div>
        <motion.a
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-auralis-border bg-white px-6 py-3 text-sm font-extrabold text-auralis-dark shadow-sm transition hover:border-auralis-orange/40 hover:text-auralis-orange"
          href="#destinations"
          variants={fadeUp}
        >
          Browse all tours
          <ArrowRight className="h-4 w-4" aria-hidden />
        </motion.a>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-7 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {experiences.map((experience) => (
          <motion.article
            className="group overflow-hidden rounded-[1.75rem] border border-auralis-border bg-white shadow-sm transition hover:shadow-soft"
            key={experience.title}
            variants={fadeUp}
            whileHover={{ y: -8 }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={experience.image}
                alt={experience.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 390px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-2 text-xs font-extrabold text-auralis-orange shadow-sm backdrop-blur">
                From {experience.price}
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <span
                    className="rounded-full bg-auralis-peach px-3 py-1 text-xs font-bold text-auralis-orange"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-heading text-xl font-extrabold text-auralis-dark">
                {experience.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-auralis-muted">{experience.description}</p>
              <div className="mt-4 grid gap-2 text-sm font-semibold text-auralis-muted">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-auralis-orange" aria-hidden />
                  {experience.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-auralis-orange" aria-hidden />
                  {experience.duration}
                </span>
              </div>
              <div className="mt-5 rounded-2xl bg-auralis-soft p-4">
                <div className="flex items-start gap-2 text-sm font-bold text-auralis-dark">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-auralis-orange" aria-hidden />
                  {experience.guide}
                </div>
                <div className="mt-4 grid gap-2">
                  {experience.highlights.map((highlight) => (
                    <span className="flex items-center gap-2 text-xs font-semibold text-auralis-muted" key={highlight}>
                      <CheckCircle2 className="h-3.5 w-3.5 text-auralis-orange" aria-hidden />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
