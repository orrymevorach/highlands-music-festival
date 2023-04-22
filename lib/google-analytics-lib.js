import { useRouter } from 'next/router';
import { useEffect } from 'react';

const pageview = url => {
  window.gtag('config', NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID, {
    page_path: url,
  });
};

const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export const useGoogleAnalytics = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      console.log('url', url);
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};
