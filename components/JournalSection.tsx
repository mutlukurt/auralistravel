"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { journalArticles } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

export function JournalSection() {
  return (
    <section id="journal" className="container-pad py-16 lg:py-24">
      <motion.div
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="Travel Journal"
            title="Better Ideas Before You Book"
            description="Read practical route notes, local planning advice, and seasonal inspiration shaped for travelers who want fewer surprises."
          />
        </motion.div>
        <motion.a
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-auralis-dark px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5"
          href="#footer"
          variants={fadeUp}
        >
          Read the journal
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </motion.a>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-7 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {journalArticles.map((article) => (
          <motion.article
            className="group overflow-hidden rounded-[1.75rem] border border-auralis-border bg-white shadow-sm transition hover:shadow-soft"
            key={article.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.image}
                alt={article.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 390px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs font-extrabold uppercase tracking-[0.14em]">
                <span className="text-auralis-orange">{article.category}</span>
                <span className="text-auralis-muted">{article.readTime}</span>
              </div>
              <h3 className="font-heading text-xl font-extrabold leading-snug text-auralis-dark">
                {article.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
