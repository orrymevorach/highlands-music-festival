import About from 'components/about';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';

export default function AboutPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <About />
    </EmailCaptureProvider>
  );
}
