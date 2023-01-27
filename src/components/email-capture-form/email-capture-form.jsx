import './email-capture-form.scss';
import { useForm, ValidationError } from '@formspree/react';
import { useLocation } from '@reach/router';
import React, { useEffect } from 'react';
import Loader from '@components/loader';
import Cookies from 'js-cookie';
import { cookies } from '@utils/constants';

export default function EmailCaptureForm({ handleSuccess }) {
  const { pathname } = useLocation();
  const [state, handleSubmit] = useForm('mrgvegqk');
  useEffect(() => {
    if (state.succeeded) {
      Cookies.set(cookies.emailCaptureCookie, true);
      handleSuccess();
    }
  }, [state]);

  if (state.submitting) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="emailCaptureForm">
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
