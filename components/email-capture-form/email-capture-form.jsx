import styles from './email-capture-form.module.scss';
import React, { useState } from 'react';
import Loader from 'components/loader';
import Cookies from 'js-cookie';
import { cookies } from 'utils/constants';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { addMemberToMailchimpAudience } from 'lib/mailchimp-lib';

export default function EmailCaptureForm({ buttonClassNames = '' }) {
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
    <form onSubmit={handleSubmit} className={styles.emailCaptureForm}>
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
