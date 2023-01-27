import React from 'react';
import '../styles/global.scss';
import LocationAndAccommodation from '@components/location-and-accommodation';
import Head from '@components/head';
import EmailCaptureFooter from '@components/email-capture-form/email-capture-footer';

export default function LocationAndAccommodationPage() {
  return (
    <>
      <Head />
      <LocationAndAccommodation />
      <EmailCaptureFooter />
    </>
  );
}
