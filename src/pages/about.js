import React from 'react';
import '../styles/global.scss';
import About from '../components/about';
import Head from '@components/head';
import EmailCaptureFooter from '@components/email-capture-form/email-capture-footer';

export default function AboutPage() {
  return (
    <>
      <Head />
      <About />
      <EmailCaptureFooter />
    </>
  );
}
