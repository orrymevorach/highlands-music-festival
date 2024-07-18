import Head from 'components/head';
import Layout from 'components/layout/layout';
import Vendors from 'components/marketplace';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData, getVendors } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function ActivitiesPage({
  showEmailCapture,
  vendors,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Marketplace" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <Vendors vendors={vendors} />
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.MARKETPLACE,
  });

  const vendors = await getVendors();
  return {
    props: {
      ...pageLoadData,
      vendors,
    },
  };
}
