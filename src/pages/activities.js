import React from 'react';
import '../styles/global.scss';
import Activities from '@components/activities';
import Head from '@components/head';
import EmailCaptureFooter from '@components/email-capture-form/email-capture-header';

export default function AboutPage() {
  return (
    <>
      <Head />
      <Activities />
      <EmailCaptureFooter />
    </>
  );
}
