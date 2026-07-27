'use client';

import { FormEvent, useState } from 'react';

const CONTACT_EMAIL = 'unikrutidev@gmail.com';

type Status = 'idle' | 'sending' | 'success' | 'error';

/**
 * Lightweight contact form — opens the user's mail client after validation.
 * Shows sending → success/error states for WCAG / UX checklist 8.3.
 */
export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setError('Error: Please fill in your name, email, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setError('Error: Please enter a valid email address.');
      return;
    }

    setStatus('sending');

    window.setTimeout(() => {
      try {
        const subject = encodeURIComponent(`UnicodeKruti contact from ${name.trim()}`);
        const body = encodeURIComponent(
          `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setStatus('success');
      } catch {
        setStatus('error');
        setError('Error: Could not open your email app. Please email unikrutidev@gmail.com directly.');
      }
    }, 400);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <h2 className="contact-form__heading">Send a message</h2>
      <p className="contact-form__intro">
        Prefer email? Write to{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Or use this form
        to draft a message in your mail app.
      </p>

      <div className="contact-form__field">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-required="true"
          required
        />
      </div>

      {error ? (
        <p className="contact-form__alert" role="alert">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      ) : null}

      {status === 'success' ? (
        <p className="contact-form__success" role="status">
          Your mail app should open with the message ready. If it did not, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      ) : null}

      <button
        type="submit"
        className="btn-primary contact-form__submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
