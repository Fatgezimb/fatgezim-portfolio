"use client";

import { useState, type FormEvent } from "react";
import { identity } from "@/app/content/resume";
import styles from "./showcase/ContactForm.module.css";

const CONTACT_EMAIL = identity.email;

function getTextField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

export function PortfolioContactForm({
  showHeading = true,
}: { showHeading?: boolean } = {}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (getTextField(data, "_honey")) return;
    setStatus("sending");
    const payload = Object.fromEntries(data.entries());
    payload._subject = `Portfolio inquiry: ${getTextField(data, "inquiry_type")} — ${getTextField(data, "name")}`;
    payload._replyto = getTextField(data, "email");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || ![true, "true"].includes(result.success)) throw new Error("Submission unavailable");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      action={`https://formsubmit.co/${CONTACT_EMAIL}`}
      className={styles.contactForm}
      method="post"
      onSubmit={sendMessage} aria-busy={status === "sending"}
    >
      <div className={styles.formHeading}>
        {showHeading && <h3>Start a conversation</h3>}
        <p>Send me a message directly. I’ll reply to the email you provide.</p>
      </div>

      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_url" value="https://fatgezimb.github.io/fatgezim-portfolio/#contact" />
      <div hidden aria-hidden="true"><input name="_honey" tabIndex={-1} autoComplete="off" aria-label="Leave empty" /></div>
      <div className={styles.formGrid}>
        <label>
          <span>Name (required)</span>
          <input autoComplete="name" name="name" maxLength={120} required type="text" />
        </label>
        <label>
          <span>Email (required)</span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label>
          <span>Organization</span>
          <input autoComplete="organization" name="organization" maxLength={200} type="text" />
        </label>
        <label>
          <span>What would you like to discuss? (required)</span>
          <select defaultValue="" name="inquiry_type" required>
            <option disabled value="">
              Select a topic
            </option>
            <option>Product or software work</option>
            <option>Behavioral-health technology</option>
            <option>Data or research collaboration</option>
            <option>Medical learning or education</option>
            <option>Speaking or professional inquiry</option>
            <option>Something else</option>
          </select>
        </label>
        <label className={styles.messageField}>
          <span>Message (required)</span>
          <textarea name="message" maxLength={10000} required rows={6} />
        </label>
      </div>

      <div className={styles.formFooter}>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
        </button>
        <p role="status" aria-live="polite">
          {status === "sent" && "Your message has been submitted. Thank you for reaching out."}
          {status === "error" && "Your message could not be sent. Your text is still here; please try again shortly."}
        </p>
      </div>
    </form>
  );
}
