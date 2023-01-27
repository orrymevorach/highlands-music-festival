import React from 'react';
import '../styles/global.scss';
import LocationAndAccommodation from '@components/location-and-accommodation';
import Head from '@components/head';
import { EmailCaptureProvider } from '../context/emailCaptureContext';

export default function LocationAndAccommodationPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <LocationAndAccommodation />
    </EmailCaptureProvider>
  );
}
