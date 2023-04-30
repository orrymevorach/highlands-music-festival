import Head from 'components/head';
import Layout from 'components/layout/layout';
import Policies from 'components/policies/policies';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function Policies({ showEmailCapture }) {
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Policies" />
      <Layout>
        <Policies />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.POLICIES,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
