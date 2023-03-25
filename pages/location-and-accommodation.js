import LocationAndAccommodation from 'components/location-and-accommodation';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';

export default function LocationAndAccommodationPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <LocationAndAccommodation />
    </EmailCaptureProvider>
  );
}
