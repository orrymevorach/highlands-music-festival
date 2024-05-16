import Head from 'components/head';
import Layout from 'components/layout/layout';
import Policies from 'components/policies/policies';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function PoliciesPage({ showEmailCapture, festivalDate }) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Policies" festivalDate={festivalDate} />
      <Layout festivalDate={festivalDate}>
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
