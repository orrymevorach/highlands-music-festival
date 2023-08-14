import Committee from 'components/committee';
import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getCommitteeMembers } from 'lib/contentful-lib';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function CommitteePage({ committeeMembers, showEmailCapture }) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Committee" />
      <Committee committeeMembers={committeeMembers} />
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
