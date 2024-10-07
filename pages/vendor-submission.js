import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
import VendorSubmission from 'components/VendorSubmissionPage/VendorSubmission';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function VendorSubmissionsPage({
  showEmailCapture,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Vendor Submissions" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <VendorSubmission />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.VENDOR_SUBMISSION,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
