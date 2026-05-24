"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, viewport } from "@/lib/motion";

export function CTASection() {
  return (
    <section id="cta" className="container-pad py-14 lg:py-20">
      <motion.div
        className="rounded-[2.5rem] bg-auralis-peach px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="mx-auto max-w-3xl font-heading text-3xl font-extrabold leading-tight text-auralis-dark sm:text-4xl lg:text-5xl">
          Don&apos;t Miss Your Next Dream Escape
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-auralis-muted">
          Discover curated trips, seasonal offers, and handpicked destinations made for
          unforgettable memories.
        </p>
        <motion.a
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-auralis-orange px-8 py-4 text-sm font-extrabold text-white shadow-glow"
          href="#destinations"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
          <ArrowRight className="h-4 w-4" aria-hidden />
        </motion.a>
      </motion.div>
    </section>
  );
}
