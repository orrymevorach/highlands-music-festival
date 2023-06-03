import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { cookies } from 'utils/constants';

export default function useAnimationAnnouncement() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const { headlinerOne: headlinerOneCookie } = cookies;

  const closeAnnouncement = () => {
    setShowAnnouncement(false);
    Cookies.set(headlinerOneCookie, true);
  };

  useEffect(() => {
    const hasHeadlinerOneCookie = !!Cookies.get(headlinerOneCookie);
    if (hasHeadlinerOneCookie) {
      setShowAnnouncement(false);
    } else {
      setTimeout(() => {
        closeAnnouncement();
      }, 10500);
    }
  }, []);

  useEffect(() => {
    const deleteHeadlinerCookie = () => Cookies.remove(headlinerOneCookie);
    window.addEventListener('unload', deleteHeadlinerCookie);

    return () => {
      window.removeEventListener('unload', deleteHeadlinerCookie);
    };
  }, []);

  return { showAnnouncement, closeAnnouncement };
}
