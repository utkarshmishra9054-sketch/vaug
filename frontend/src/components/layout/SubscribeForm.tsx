"use client";

import { useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

export function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; alreadySubscribed?: boolean };
      if (!json.ok) throw new Error(json.error);
      form.reset();
      setStatus("done");
      setMessage(json.alreadySubscribed ? "You're already on the list." : "Subscribed. Thanks!");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error && err.message ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xs">
      <label htmlFor="subscribe-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center rounded-md border border-border-strong p-1 focus-within:border-accent-text">
        <input
          id="subscribe-email"
          name="email"
          type="email"
          required
          placeholder="Subscribe to our notes"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-fg outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading"}
          className="inline-flex size-10 items-center justify-center rounded-[4px] bg-fg text-bg transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? <LoaderCircle className="size-4 animate-spin" /> : status === "done" ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
        </button>
      </div>
      <p role="status" className={`mt-2 min-h-5 text-xs ${status === "error" ? "text-red-400" : "text-muted"}`}>
        {status === "done" || status === "error" ? message : ""}
      </p>
    </form>
  );
}
