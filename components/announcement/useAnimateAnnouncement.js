import { useState, useEffect } from 'react';

export default function useAnimationAnnouncement() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowAnnouncement(false);
    }, 6500);
  }, []);
  return { showAnnouncement, setShowAnnouncement };
}
