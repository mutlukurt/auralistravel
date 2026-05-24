"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, Plane, X } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "./AuthModal";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Features", id: "features" },
  { label: "Guides", id: "guides" },
  { label: "Tours", id: "tours" },
  { label: "Destinations", id: "destinations" },
  { label: "Journal", id: "journal" },
  { label: "FAQ", id: "faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0.72)", "rgba(255,255,255,0.9)"],
  );

  const navigateToSection = (id: string) => {
    setOpen(false);
    window.history.replaceState(null, "", `#${id}`);

    window.setTimeout(() => {
      const section = document.getElementById(id);

      if (!section) return;

      const headerOffset = 88;
      const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }, 80);
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/60 backdrop-blur-xl"
        style={{ background }}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="container-pad flex h-20 items-center justify-between">
        <button
          className="focus-ring flex items-center gap-3 rounded-full"
          type="button"
          aria-label="Auralis home"
          onClick={() => navigateToSection("home")}
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-auralis-orange text-white shadow-glow">
            <Plane className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-heading text-xl font-extrabold tracking-normal text-auralis-dark">
            Auralis
          </span>
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <button
              className="text-sm font-semibold text-auralis-dark/80 transition hover:text-auralis-orange"
              type="button"
              key={link.label}
              onClick={() => navigateToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            className="focus-ring rounded-full border border-auralis-border bg-white px-6 py-3 text-sm font-bold text-auralis-dark transition hover:-translate-y-0.5 hover:border-auralis-orange/40"
            type="button"
            onClick={() => setAuthMode("signup")}
          >
            Sign Up
          </button>
          <button
            className="focus-ring rounded-full bg-auralis-orange px-7 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5"
            type="button"
            onClick={() => setAuthMode("login")}
          >
            Login
          </button>
        </div>

        <button
          className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-auralis-border bg-white text-auralis-dark lg:hidden"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="container-pad pb-5 lg:hidden"
            initial={{ opacity: 0, y: -16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -16, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-3xl border border-auralis-border bg-white p-4 shadow-soft">
              <div className="grid gap-1">
                {navLinks.map((link) => (
                  <button
                    className="rounded-2xl px-4 py-3 text-left text-sm font-bold text-auralis-dark transition hover:bg-auralis-peach"
                    type="button"
                    key={link.label}
                    onClick={() => navigateToSection(link.id)}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  className="rounded-2xl border border-auralis-border px-4 py-3 text-center text-sm font-bold"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setAuthMode("signup");
                  }}
                >
                  Sign Up
                </button>
                <button
                  className="rounded-2xl bg-auralis-orange px-4 py-3 text-center text-sm font-bold text-white"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setAuthMode("login");
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </motion.header>
      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onModeChange={setAuthMode} />
    </>
  );
}
