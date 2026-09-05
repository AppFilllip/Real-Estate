'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/lib/site';
import { ArrowGlyph } from './ui/brand';

type Errors = Partial<Record<'name' | 'phone' | 'email', string>>;

export function EnquiryForm() {
  const { contact } = site;
  const endpoint = contact.formEndpoint;

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ tone: 'error' | 'success'; text: string } | null>(
    null
  );

  const clear = (field: keyof Errors) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};

    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    if (!name) next.name = 'This field is required.';
    if (!phone) next.phone = 'This field is required.';
    else if (phone.replace(/\D/g, '').length < 8) next.phone = 'Enter a valid phone number.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = 'Enter a valid email address.';

    if (Object.keys(next).length) {
      event.preventDefault();
      setErrors(next);
      setStatus({ tone: 'error', text: 'Please check the highlighted fields.' });
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setErrors({});

    // A configured handler takes it from here.
    if (endpoint) return;

    /*
     * No form handler is wired up yet (contact.formEndpoint in lib/site.ts).
     * Rather than silently dropping an enquiry, say so plainly and leave the
     * visitor's input intact.
     */
    event.preventDefault();
    setStatus({
      tone: 'error',
      text: 'This form is not connected to a mailbox yet. Please reach out to Rajdhara directly.'
    });
  }

  const field = (name: keyof Errors) => (errors[name] ? ' is-invalid' : '');

  return (
    <form
      className="enquiry"
      onSubmit={handleSubmit}
      noValidate
      {...(endpoint ? { action: endpoint, method: 'post' } : {})}
    >
      <div className="enquiry__row">
        <div className={`field${field('name')}`}>
          <label className="field__label" htmlFor="enq-name">
            Full name
          </label>
          <input
            className="field__input"
            id="enq-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'enq-name-error' : undefined}
            onInput={() => clear('name')}
          />
          {errors.name && (
            <p className="field__error" id="enq-name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className={`field${field('phone')}`}>
          <label className="field__label" htmlFor="enq-phone">
            Phone
          </label>
          <input
            className="field__input"
            id="enq-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? 'enq-phone-error' : undefined}
            onInput={() => clear('phone')}
          />
          {errors.phone && (
            <p className="field__error" id="enq-phone-error">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className={`field${field('email')}`}>
        <label className="field__label" htmlFor="enq-email">
          Email
        </label>
        <input
          className="field__input"
          id="enq-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'enq-email-error' : undefined}
          onInput={() => clear('email')}
        />
        {errors.email && (
          <p className="field__error" id="enq-email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="enquiry__row">
        <div className="field">
          <label className="field__label" htmlFor="enq-interest">
            Looking for
          </label>
          <select
            className="field__input field__input--select"
            id="enq-interest"
            name="interest"
            defaultValue={contact.form.interests[0]}
          >
            {contact.form.interests.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="enq-project">
            Project
          </label>
          <select
            className="field__input field__input--select"
            id="enq-project"
            name="project"
            defaultValue=""
          >
            <option value="">No preference</option>
            {site.projects.items.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="enq-message">
          Message <span className="field__opt">(optional)</span>
        </label>
        <textarea
          className="field__input field__input--area"
          id="enq-message"
          name="message"
          rows={3}
        />
      </div>

      <button className="btn btn--primary btn--block" type="submit">
        <span>Send Enquiry</span>
        <ArrowGlyph className="btn__glyph" />
      </button>

      <p
        className={`enquiry__status${status ? ` is-${status.tone}` : ''}`}
        role="status"
        aria-live="polite"
      >
        {status?.text ?? ''}
      </p>
    </form>
  );
}
