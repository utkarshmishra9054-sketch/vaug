"use client";

import { useState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";

import { engagementOptions, timelineOptions } from "@/lib/lead-options";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-subtle outline-none transition focus:border-accent-text aria-[invalid=true]:border-red-400";

export function ContactForm({ idPrefix = "", defaultEngagement = "" }: { idPrefix?: string; defaultEngagement?: string } = {}) {
  const id = (name: string) => `${idPrefix}${name}`;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!data.timeline) delete data.timeline;

    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; fieldErrors?: Record<string, string> };

      if (!res.ok || !json.ok) {
        setFieldErrors(json.fieldErrors ?? {});
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-lg border border-border bg-surface p-8 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-yellow text-ink">
          <CircleCheck className="size-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold">Thanks, we&apos;ve got it.</h3>
        <p className="mt-2 max-w-sm text-muted">
          Someone from VAUG will reply within one business day with next steps.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldError = (name: string) =>
    fieldErrors[name] ? (
      <p id={`${idPrefix}${name}-error`} className="mt-1.5 text-xs text-red-300">
        {fieldErrors[name]}
      </p>
    ) : null;

  const aria = (name: string) => ({
    "aria-invalid": Boolean(fieldErrors[name]),
    "aria-describedby": fieldErrors[name] ? `${idPrefix}${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="mb-1.5 block text-xs font-semibold text-muted">Full name *</label>
          <input id={id("name")} name="name" required autoComplete="name" placeholder="Your name" className={inputClass} {...aria("name")} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={id("email")} className="mb-1.5 block text-xs font-semibold text-muted">Work email *</label>
          <input id={id("email")} name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputClass} {...aria("email")} />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor={id("company")} className="mb-1.5 block text-xs font-semibold text-muted">Company</label>
          <input id={id("company")} name="company" autoComplete="organization" placeholder="Optional" className={inputClass} />
        </div>
        <div>
          <label htmlFor={id("phone")} className="mb-1.5 block text-xs font-semibold text-muted">Phone / WhatsApp</label>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="Optional" className={inputClass} />
        </div>
        <div>
          <label htmlFor={id("engagement")} className="mb-1.5 block text-xs font-semibold text-muted">I&apos;m interested in *</label>
          <select id={id("engagement")} name="engagement" required defaultValue={defaultEngagement} className={`${inputClass} [&>option]:text-ink`} {...aria("engagement")}>
            <option value="" disabled>Choose one</option>
            {engagementOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {fieldError("engagement")}
        </div>
        <div>
          <label htmlFor={id("timeline")} className="mb-1.5 block text-xs font-semibold text-muted">When would you like to start?</label>
          <select id={id("timeline")} name="timeline" defaultValue="" className={`${inputClass} [&>option]:text-ink`}>
            <option value="">Optional</option>
            {timelineOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="mb-1.5 block text-xs font-semibold text-muted">What are you building? *</label>
          <textarea
            id={id("message")}
            name="message"
            required
            rows={4}
            placeholder="A few lines about your idea, workflow or project"
            className={`${inputClass} resize-none`}
            {...aria("message")}
          />
          {fieldError("message")}
        </div>

        {/* Honeypot: hidden from people, often filled by bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={id("website")}>Website</label>
          <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-yellow px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-[#ffdf6b] active:scale-[0.99] disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Send message <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-subtle">We reply within one business day. No spam, ever.</p>
    </form>
  );
}
