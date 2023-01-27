import React from 'react';
import '../styles/global.scss';
import Activities from '@components/activities';
import Head from '@components/head';
import { EmailCaptureProvider } from '../context/emailCaptureContext';

export default function AboutPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <Activities />
    </EmailCaptureProvider>
  );
}
