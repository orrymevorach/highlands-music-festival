import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import PageNotFound from './404';
import { NavProvider } from 'context/nav-context';
import Script from 'next/script';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const { isPagePublished, navData } = pageProps;
  if (!isPagePublished) return <PageNotFound />;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}, {
          page_path: window.location.pathname,
          });`,
        }}
      />

      <NavProvider navData={navData}>
        <Component {...pageProps} />
      </NavProvider>
    </>
  );
}
