import React from 'react';
import '../styles/global.scss';
import Committee from '@components/committee';
import Head from '@components/head';
import EmailCaptureFooter from '@components/email-capture-form/email-capture-header';

export default function CommitteePage() {
  return (
    <>
      <Head />
      <Committee />
      <EmailCaptureFooter />
    </>
  );
}
