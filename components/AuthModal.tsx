"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, LockKeyhole, Mail, Plane, UserRound, X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

type AuthMode = "login" | "signup";

interface AuthModalProps {
  mode: AuthMode | null;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}

const benefits = [
  "Save preferred destinations and dates",
  "Receive curated guide recommendations",
  "Track every itinerary request in one place",
];

export function AuthModal({ mode, onClose, onModeChange }: AuthModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const isSignup = mode === "signup";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {mode ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-auralis-dark/35 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
        >
          <motion.div
            className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28 }}
          >
            <button
              className="focus-ring absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-auralis-dark shadow-sm"
              type="button"
              aria-label="Close auth modal"
              onClick={onClose}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <div className="bg-auralis-peach p-7 sm:p-9">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-auralis-orange text-white shadow-glow">
                <Plane className="h-6 w-6" aria-hidden />
              </span>
              <h2 id="auth-title" className="mt-6 font-heading text-3xl font-extrabold text-auralis-dark">
                {isSignup ? "Create your Auralis account" : "Welcome back to Auralis"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-auralis-muted">
                {isSignup
                  ? "Build a traveler profile once, then keep trip ideas, guide notes, and booking requests neatly organized."
                  : "Log in to continue planning with your saved destinations, preferred dates, and guide conversations."}
              </p>
              <div className="mt-7 grid gap-3">
                {benefits.map((benefit) => (
                  <span className="flex items-center gap-3 text-sm font-bold text-auralis-dark" key={benefit}>
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-auralis-orange" aria-hidden />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <form className="p-7 sm:p-9" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-auralis-soft p-1">
                <button
                  className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                    !isSignup ? "bg-white text-auralis-orange shadow-sm" : "text-auralis-muted"
                  }`}
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onModeChange("login");
                  }}
                >
                  Login
                </button>
                <button
                  className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                    isSignup ? "bg-white text-auralis-orange shadow-sm" : "text-auralis-muted"
                  }`}
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onModeChange("signup");
                  }}
                >
                  Sign Up
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                {isSignup ? (
                  <label className="grid gap-2 text-sm font-bold text-auralis-dark">
                    Full name
                    <span className="flex items-center gap-3 rounded-2xl border border-auralis-border px-4 py-3">
                      <UserRound className="h-5 w-5 text-auralis-orange" aria-hidden />
                      <input className="min-w-0 flex-1 outline-none" placeholder="Mara Ellison" required />
                    </span>
                  </label>
                ) : null}
                <label className="grid gap-2 text-sm font-bold text-auralis-dark">
                  Email address
                  <span className="flex items-center gap-3 rounded-2xl border border-auralis-border px-4 py-3">
                    <Mail className="h-5 w-5 text-auralis-orange" aria-hidden />
                    <input className="min-w-0 flex-1 outline-none" type="email" placeholder="you@example.com" required />
                  </span>
                </label>
                <label className="grid gap-2 text-sm font-bold text-auralis-dark">
                  Password
                  <span className="flex items-center gap-3 rounded-2xl border border-auralis-border px-4 py-3">
                    <LockKeyhole className="h-5 w-5 text-auralis-orange" aria-hidden />
                    <input className="min-w-0 flex-1 outline-none" type="password" placeholder="Minimum 8 characters" minLength={8} required />
                  </span>
                </label>
              </div>

              <button
                className="focus-ring mt-6 w-full rounded-2xl bg-auralis-orange px-6 py-4 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5"
                type="submit"
              >
                {isSignup ? "Create Account" : "Login"}
              </button>

              {submitted ? (
                <p className="mt-4 rounded-2xl bg-auralis-peach px-4 py-3 text-sm font-bold text-auralis-dark">
                  Demo flow ready. In production this connects to secure authentication and your traveler dashboard.
                </p>
              ) : null}

              <p className="mt-5 text-center text-sm font-semibold text-auralis-muted">
                {isSignup ? "Already have an account?" : "New to Auralis?"}{" "}
                <button
                  className="font-extrabold text-auralis-orange"
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onModeChange(isSignup ? "login" : "signup");
                  }}
                >
                  {isSignup ? "Login" : "Create one"}
                </button>
              </p>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
