"use client";

import type { FormEvent } from "react";
import styles from "./supporting/Contact.module.css";

const CONTACT_EMAIL = "fatgezimbela1@gmail.com";

function getTextField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

function createEmailDraft(form: HTMLFormElement) {
  const formData = new FormData(form);
  const name = getTextField(formData, "name");
  const email = getTextField(formData, "email");
  const organization = getTextField(formData, "organization");
  const inquiryType = getTextField(formData, "inquiry_type");
  const message = getTextField(formData, "message");

  const subject = `Portfolio inquiry: ${inquiryType} — ${name}`;
  const body = [
    "Hello Zim,",
    "",
    `I’m reaching out about: ${inquiryType}`,
    "",
    message,
    "",
    `Name: ${name}`,
    `Reply email: ${email}`,
    `Organization: ${organization || "Not provided"}`,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function PortfolioContactForm() {
  function openEmailDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.assign(createEmailDraft(event.currentTarget));
  }

  return (
    <form
      action={`mailto:${CONTACT_EMAIL}`}
      className={styles.contactForm}
      encType="text/plain"
      method="post"
      onSubmit={openEmailDraft}
    >
      <div className={styles.formHeading}>
        <p className={styles.formEyebrow}>Email draft</p>
        <h3>Start a conversation</h3>
        <p>
          Share the role, project, or collaboration you have in mind. Your email app will open a
          draft for you to review and send.
        </p>
      </div>

      <div className={styles.formGrid}>
        <label>
          <span>Name (required)</span>
          <input autoComplete="name" name="name" required type="text" />
        </label>
        <label>
          <span>Email (required)</span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label>
          <span>Organization</span>
          <input autoComplete="organization" name="organization" type="text" />
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
          <textarea name="message" required rows={6} />
        </label>
      </div>

      <div className={styles.formFooter}>
        <p id="contact-privacy-note">
          This site does not send or store your message. Please don’t include PHI, client
          information, passwords, or other sensitive details.
        </p>
        <button aria-describedby="contact-privacy-note" type="submit">
          Open email draft
        </button>
      </div>

      <p className={styles.emailFallback}>
        Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </form>
  );
}
