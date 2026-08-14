"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/site-data";

export function InquiryForm({ product }: { product?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/inquiry", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Inquiry submission failed.");
      form.reset();
      setStatus("success");
      setMessage("Thank you. Your inquiry has been sent successfully.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send your inquiry. Please try again or email us directly.");
    }
  }

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <input type="hidden" name="source" value="website" />
      <div className="form-grid">
        <label>Name<input name="name" required placeholder="Your name" /></label>
        <label>Company<input name="company" required placeholder="Company name" /></label>
        <label>Email<input name="email" type="email" required placeholder="name@company.com" /></label>
        <label>Phone / WhatsApp<input name="phone" placeholder="Country code + number" /></label>
      </div>
      <label>
        Product Interest
        <select name="product" defaultValue={product || ""}>
          <option value="">Select a product</option>
          {products.map((item) => <option key={item.slug} value={item.name.en}>{item.name.en}</option>)}
        </select>
      </label>
      <label>
        Inquiry Details
        <textarea name="message" required rows={5} placeholder="Tell us the specifications, quantity, packing requirements and destination market." />
      </label>
      <button className="primary-button" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Submitting..." : "Submit Inquiry"} <ArrowRight size={18} />
      </button>
      {message && <p className={`form-status form-status-${status}`} role="status">{message}</p>}
    </form>
  );
}
