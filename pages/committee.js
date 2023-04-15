import Committee from 'components/committee';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getCommitteeMembers } from 'graphql/contentful-lib';

export default function CommitteePage({ committeeMembers }) {
  return (
    <EmailCaptureProvider>
      <Head />
      <Committee committeeMembers={committeeMembers} />
    </EmailCaptureProvider>
  );
}

export async function getStaticProps() {
  const committeeMembers = await getCommitteeMembers();
  return {
    props: {
      committeeMembers,
    },
  };
}
