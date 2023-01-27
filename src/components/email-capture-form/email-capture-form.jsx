import './email-capture-form.scss';
import { useForm, ValidationError } from '@formspree/react';
import { useLocation } from '@reach/router';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import Loader from '@components/loader';

export default function EmailCaptureForm({ classNames, handleSuccess }) {
  const { pathname } = useLocation();
  const [state, handleSubmit] = useForm('mrgvegqk');
  useEffect(() => {
    if (state.succeeded && handleSuccess) {
      handleSuccess();
    }
  }, [state]);

  if (state.succeeded) {
    return (
      <p className={clsx(classNames, 'submittedText')}>
        Thank you! You will hear from us shortly.
      </p>
    );
  }

  if (state.submitting) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('emailCaptureForm', classNames)}
    >
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter Your Email"
      />
      <input
        type="text"
        id="page"
        name="page"
        value={pathname}
        onChange={() => {}}
        style={{ display: 'none' }}
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}
