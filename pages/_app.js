import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import PageNotFound from './404';
import { NavProvider } from 'context/nav-context';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const { isPagePublished, navData } = pageProps;
  if (!isPagePublished) return <PageNotFound />;

  return (
    <NavProvider navData={navData}>
      <Component {...pageProps} />
    </NavProvider>
  );
}
