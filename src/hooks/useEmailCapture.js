import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { cookies } from '@utils/constants';

export default function useEmailCapture() {
  const [hasSubmitted, setHasSubmitted] = useState(true);
  useEffect(() => {
    const EmailCaptureCookie = !!Cookies.get(cookies.emailCaptureCookie);
    setHasSubmitted(EmailCaptureCookie);
  }, []);

  return hasSubmitted;
}
