import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
import Policies from 'components/PoliciesPage/policies';
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
