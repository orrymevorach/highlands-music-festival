import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

export default function useAnimationAnnouncement() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowAnnouncement(false);
    }, 8000);
  }, []);
  return { showAnnouncement, setShowAnnouncement };
}
