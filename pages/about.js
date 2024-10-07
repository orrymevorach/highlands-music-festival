import About from 'components/AboutPage/About';
import Head from 'components/shared/Head/Head';
import Layout from 'components/shared/Layout/Layout';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { useFacebookPixel } from 'hooks';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';
import { formatFestivalDate } from 'utils/utils';

export default function AboutPage({ showEmailCapture, festivalDate }) {
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);

  // const formattedFestivalDate = formatFestivalDate(festivalDate);
  const formattedFestivalDate = festivalDate;
  return (
    <>
      <Head title="About" festivalDate={festivalDate} />
      <Layout
        hasPaddingBottom={false}
        hideHeaderMargin
        festivalDate={festivalDate}
      >
        <About festivalDate={formattedFestivalDate} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.ABOUT,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
