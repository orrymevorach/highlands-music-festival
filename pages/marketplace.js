import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
import Marketplace from 'components/MarketplacePage/marketplace';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData, getVendors } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function ActivitiesPage({
  showEmailCapture,
  vendors,
  partners,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Marketplace" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <Marketplace vendors={vendors} partners={partners} />
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.MARKETPLACE,
  });

  const { vendors, partners } = await getVendors();
  return {
    props: {
      ...pageLoadData,
      vendors,
      partners,
    },
  };
}
