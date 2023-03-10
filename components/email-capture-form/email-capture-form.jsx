import styles from './email-capture-form.module.scss';
import { useForm, ValidationError } from '@formspree/react';
import React, { useEffect } from 'react';
import Loader from 'components/loader';
import Cookies from 'js-cookie';
import { cookies } from 'utils/constants';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useRouter } from 'next/router';

export default function EmailCaptureForm({ buttonClassNames = '' }) {
  const { pathname } = useRouter();
  const [state, handleSubmit] = useForm('mrgvegqk');
  const {
    triggers: { SUBMIT_FORM },
  } = useEmailCaptureContext();
  useEffect(() => {
    if (state.succeeded) {
      Cookies.set(cookies.emailCaptureCookie, true);
      SUBMIT_FORM();
    }
  }, [state, SUBMIT_FORM]);

  if (state.submitting) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className={styles.emailCaptureForm}>
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
      <button
        type="submit"
        disabled={state.submitting}
        className={buttonClassNames}
      >
        Submit
      </button>
    </form>
  );
}
