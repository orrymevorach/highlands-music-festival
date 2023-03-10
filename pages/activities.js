import '../styles/global.scss';
import Activities from 'components/activities';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';

export default function AboutPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <Activities />
    </EmailCaptureProvider>
  );
}
