"use client";

import { motion } from "framer-motion";
import { Mail, Plane, Send } from "lucide-react";
import { siFacebook, siInstagram, siX } from "simple-icons";
import { footerGroups } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const socials = [
  { name: "Instagram", icon: siInstagram },
  { name: "Facebook", icon: siFacebook },
  { name: "Twitter/X", icon: siX },
];

export function Footer() {
  return (
    <motion.footer
      id="footer"
      className="border-t border-auralis-border bg-white/70 py-12"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
    >
      <div className="container-pad">
        <motion.div
          className="flex flex-col gap-6 border-b border-auralis-border pb-9 lg:flex-row lg:items-center lg:justify-between"
          variants={fadeUp}
        >
          <a className="flex items-center gap-3" href="#home" aria-label="Auralis home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-auralis-orange text-white">
              <Plane className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-heading text-xl font-extrabold text-auralis-dark">Auralis</span>
          </a>
          <form
            className="flex w-full max-w-md items-center gap-2 rounded-full border border-auralis-border bg-white p-2 shadow-sm"
            onSubmit={(event) => event.preventDefault()}
          >
            <Mail className="ml-3 h-5 w-5 shrink-0 text-auralis-muted" aria-hidden />
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent px-2 text-sm font-medium text-auralis-dark outline-none placeholder:text-auralis-muted"
            />
            <button
              className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full bg-auralis-orange text-white transition hover:-translate-y-0.5"
              type="submit"
              aria-label="Subscribe"
            >
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </motion.div>

        <motion.div className="grid gap-9 py-10 sm:grid-cols-2 lg:grid-cols-4" variants={stagger}>
          {footerGroups.map((group) => (
            <motion.div key={group.title} variants={fadeUp}>
              <h3 className="mb-4 font-heading text-base font-extrabold text-auralis-dark">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="text-sm font-medium text-auralis-muted transition hover:text-auralis-orange"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div variants={fadeUp}>
            <h3 className="mb-4 font-heading text-base font-extrabold text-auralis-dark">
              Social Media
            </h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-auralis-border bg-white text-auralis-orange transition hover:-translate-y-1 hover:border-auralis-orange/40 hover:shadow-sm"
                  href="#home"
                  key={social.name}
                  aria-label={social.name}
                >
                  <svg className="h-4 w-4" role="img" viewBox="0 0 24 24" aria-hidden>
                    <path d={social.icon.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.p className="border-t border-auralis-border pt-7 text-sm font-medium text-auralis-muted" variants={fadeUp}>
          © 2026 Auralis Travel. Developed by Mutlu Kurt. Released under the MIT License.
        </motion.p>
      </div>
    </motion.footer>
  );
}
