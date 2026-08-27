"use client";

import { useEffect, useState, type FormEvent } from "react";
import { services } from "@/lib/content";

const budgets = ["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+", "Not sure yet"];

const inputClasses =
  "w-full border-b border-ink/20 bg-transparent py-2.5 text-sm text-ink outline-none transition-colors duration-200 ease-[var(--ease-out)] placeholder:text-ink/30 focus:border-red";

export default function ContactFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Give the panel a beat to fade out before resetting the form.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setSubmitted(false), 300);
    return () => clearTimeout(t);
  }, [open]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ease-[var(--ease-out)] md:p-8 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <div
        className={`relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto bg-paper text-ink transition-[opacity,transform] duration-300 ease-[var(--ease-out)] ${
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between bg-ink px-6 py-5 text-paper md:px-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red">
              Let&rsquo;s talk
            </p>
            <h3 className="font-display mt-1 text-xl font-bold uppercase md:text-2xl">
              Start a Project
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="btn-press flex h-10 w-10 items-center justify-center border border-paper/40 transition-colors duration-200 ease-[var(--ease-out)] hover:bg-paper hover:text-ink"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-start px-6 py-16 md:px-10">
            <span className="text-3xl text-red">✦</span>
            <h4 className="font-display mt-4 text-2xl font-bold uppercase">Message sent.</h4>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
              Thanks for reaching out — I&rsquo;ll get back to you within 24 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-press mt-8 bg-ink px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-paper transition-colors duration-200 ease-[var(--ease-out)] hover:bg-red"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6 py-8 md:px-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink/50">
                  Name
                </span>
                <input type="text" name="name" required placeholder="Your name" className={inputClasses} />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink/50">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  className={inputClasses}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink/50">
                  Service
                </span>
                <select name="service" defaultValue="" required className={inputClasses}>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s.index} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink/50">
                  Budget
                </span>
                <select name="budget" defaultValue="" required className={inputClasses}>
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink/50">
                Project details
              </span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me a bit about the project..."
                className={`${inputClasses} resize-none`}
              />
            </label>

            <button
              type="submit"
              className="btn-press mt-2 bg-ink px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-paper transition-colors duration-200 ease-[var(--ease-out)] hover:bg-red"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
