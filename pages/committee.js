import Committee from 'components/committee';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';

export default function CommitteePage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <Committee />
    </EmailCaptureProvider>
  );
}