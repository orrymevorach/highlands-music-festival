import Head from 'components/head';
import Layout from 'components/layout/layout';
import Policies from 'components/policies/policies';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getCommitteeMembers } from 'lib/contentful-lib';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function CommitteePage({ committeeMembers }) {
  return (
    <EmailCaptureProvider>
      <Head title="Policies" />
      <Layout>
        <Policies />
      </Layout>
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
