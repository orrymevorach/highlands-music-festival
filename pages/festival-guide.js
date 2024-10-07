import Head from 'components/head/head';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';

export default function Index() {
  return (
    <>
      <Head />
      <div
        style={{
          position: 'relative',
          paddingTop: 'max(60%,326px)',
          height: '0',
          width: '100%',
        }}
      >
        <iframe
          allow="clipboard-write"
          sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
          allowfullscreen="true"
          src="https://e.issuu.com/embed.html?d=2024_booklet_single_pages_1_&u=highlandsmusicfestival"
          style={{
            position: 'absolute',
            border: 'none',
            width: '100%',
            height: '100%',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
          }}
        ></iframe>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.FESTIVAL_GUIDE,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
