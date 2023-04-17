import Committee from 'components/committee';
import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getCommitteeMembers } from 'lib/contentful-lib';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

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
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.COMMITTEE,
  });
  return {
    props: {
      committeeMembers,
      ...pageLoadData,
    },
  };
}
