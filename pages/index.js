import Home from 'components/home';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';

export default function Index() {
  return (
    <EmailCaptureProvider>
      <Head />
      <Home />
    </EmailCaptureProvider>
  );
}
