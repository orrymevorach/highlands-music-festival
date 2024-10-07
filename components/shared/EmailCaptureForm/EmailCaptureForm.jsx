import styles from './EmailCaptureForm.module.scss';
import React, { useState } from 'react';
import Loader from 'components/shared/Loader/Loader';
import Cookies from 'js-cookie';
import { cookies } from 'utils/constants';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { addMemberToMailchimpAudience } from 'lib/mailchimp-lib';
import clsx from 'clsx';

export default function EmailCaptureForm({
  buttonClassNames = {},
  formClassNames = {},
}) {
  const {
    triggers: { SUBMIT_FORM },
  } = useEmailCaptureContext();
  const [emailAddress, setEmailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    const { response, status } = await addMemberToMailchimpAudience({
      emailAddress,
    });
    setIsLoading(false);
    if (status === 400) {
      setError(`Error: ${JSON.parse(response.text).title}. Please try again.`);
    } else {
      fbq('trackCustom', 'WebsiteLead');
      Cookies.set(cookies.emailCaptureCookie, true);
      SUBMIT_FORM();
    }
  };

  const handleChange = e => {
    setError('');
    setEmailAddress(e.target.value);
  };

  if (isLoading) return <Loader isWhite centerInContainer />;

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(styles.emailCaptureForm, formClassNames)}
    >
      <div className={styles.inputContainer}>
        {error && <p className={styles.error}>{error}</p>}
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={emailAddress}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={buttonClassNames}>
        Submit
      </button>
    </form>
  );
}
