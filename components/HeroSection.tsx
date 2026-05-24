"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { assurances, heroFields, partners } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { ImageCollage } from "./ImageCollage";
import { SearchBar } from "./SearchBar";

export function HeroSection() {
  return (
    <section id="home" className="container-pad grid min-h-screen items-center gap-12 pb-16 pt-32 lg:grid-cols-[0.95fr_1.05fr] lg:pb-24 lg:pt-36">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div
          className="mb-5 flex items-center gap-2 text-sm font-bold text-auralis-orange"
          variants={fadeUp}
        >
          <Plane className="h-4 w-4" aria-hidden />
          <span>Explore the World</span>
          <span className="h-px w-12 bg-auralis-orange" aria-hidden />
        </motion.div>
        <motion.h1
          className="font-heading text-5xl font-extrabold leading-[1.05] tracking-normal text-auralis-dark sm:text-6xl lg:text-7xl"
          variants={fadeUp}
        >
          Discover Beautiful Places Made For You
        </motion.h1>
        <motion.p className="mt-6 max-w-xl text-lg leading-9 text-auralis-muted" variants={fadeUp}>
          Find curated destinations, peaceful escapes, and unforgettable trips planned around the
          way you love to travel.
        </motion.p>
        <motion.div className="mt-9 max-w-2xl" variants={fadeUp}>
          <SearchBar fields={heroFields} />
        </motion.div>
        <motion.div className="mt-7 grid gap-3 sm:grid-cols-3" variants={fadeUp}>
          {assurances.map((item) => (
            <div
              className="flex items-center gap-2 rounded-2xl border border-auralis-border bg-white/80 px-3 py-2 text-xs font-bold text-auralis-dark shadow-sm"
              key={item.label}
            >
              <item.icon className="h-4 w-4 shrink-0 text-auralis-orange" aria-hidden />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
        <motion.div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2" variants={fadeUp}>
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-auralis-muted">
            Trusted by
          </span>
          {partners.map((partner) => (
            <span className="font-heading text-sm font-extrabold text-auralis-dark/55" key={partner}>
              {partner}
            </span>
          ))}
        </motion.div>
      </motion.div>
      <ImageCollage />
    </section>
  );
}
