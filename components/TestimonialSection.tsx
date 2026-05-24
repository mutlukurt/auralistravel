"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function TestimonialSection() {
  return (
    <section id="testimonials" className="container-pad grid items-center gap-12 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:py-24">
      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
        <motion.div variants={fadeUp}>
          <SectionHeading eyebrow="What They Say" title="What Our Travelers Say About Us" />
        </motion.div>
        <motion.article
          className="relative mt-8 rounded-[1.75rem] border border-auralis-border bg-white p-7 shadow-soft"
          variants={fadeUp}
        >
          <Quote className="absolute right-8 top-6 h-12 w-12 text-auralis-orange/20" aria-hidden />
          <div className="flex items-center gap-4">
            <Image
              src="/images/avatar-traveler.webp"
              alt="Portrait of traveler Mara Ellison"
              width={58}
              height={58}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <h3 className="font-heading text-lg font-extrabold text-auralis-dark">Mara Ellison</h3>
              <p className="text-sm font-medium text-auralis-muted">Travel Journalist</p>
            </div>
          </div>
          <p className="mt-6 text-base leading-8 text-auralis-muted">
            “Auralis made our island trip feel effortless. Every stay, route, and local experience
            felt handpicked, but the booking flow stayed beautifully simple.”
          </p>
          <div className="mt-5 flex gap-1 text-yellow-400" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star className="h-5 w-5 fill-current" key={index} aria-hidden />
            ))}
          </div>
        </motion.article>
      </motion.div>

      <motion.div
        className="relative mx-auto aspect-[760/468] w-full max-w-[760px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/testimonial-mosaic-optimized.webp"
          alt="Mosaic travel photograph of a woman in a boat on calm turquoise water"
          fill
          sizes="(max-width: 768px) 94vw, 760px"
          className="object-contain drop-shadow-[0_24px_42px_rgba(17,24,39,0.16)]"
        />
      </motion.div>
    </section>
  );
}
