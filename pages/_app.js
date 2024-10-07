import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import PageNotFound from './404';
import { NavProvider } from 'context/nav-context';
import Script from 'next/script';
import { useGoogleAnalytics } from 'lib/google-analytics-lib';
import PasswordProtectionTakeover from 'components/shared/password-protection-takeover/password-protection-takeover';
import { useState } from 'react';
import { EmailCaptureProvider } from 'context/email-capture-context';

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const { isPagePublished, navData, isPasswordProtected } = pageProps;
  const [showPasswordProtectionTakeover, setShowPasswordProtectionTakeover] =
    useState(true);
  useGoogleAnalytics();
  if (!isPagePublished) return <PageNotFound />;
  if (isPasswordProtected && showPasswordProtectionTakeover)
    return (
      <PasswordProtectionTakeover
        setShowPasswordProtectionTakeover={setShowPasswordProtectionTakeover}
      />
    );

  return (
    <EmailCaptureProvider>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              if(${process.env.NODE_ENV !== 'production'}) {
                return;
              }
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${
              process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID
            }', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <NavProvider navData={navData}>
        <Component {...pageProps} />
      </NavProvider>
    </EmailCaptureProvider>
  );
}
