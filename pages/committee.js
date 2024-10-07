import Committee from 'components/committee/committee';
import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getCommitteeMembers } from 'lib/contentful-lib';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function CommitteePage({
  committeeMembers,
  showEmailCapture,
  festivalDate,
}) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Committee" festivalDate={festivalDate} />
      <Layout festivalDate={festivalDate}>
        <Committee committeeMembers={committeeMembers} />
      </Layout>
    </>
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
