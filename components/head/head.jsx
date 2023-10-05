import Head from 'next/head';
import { imgPath } from 'utils/constants';

export default function Meta({ title = '' }) {
  const tabTitle = `Highlands Music Festival ${title ? `| ${title}` : ''}`;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Highlands Music Festival is a music festival taking place at Camp Walden in Palmer Rapids, Ontario, between Thursday September 26th - 29th, 2024"
      />
      <title>{tabTitle}</title>
      <link rel="icon" href={`${imgPath}/favicon.png`} />
      <meta
        name="keywords"
        content="Highlands Music Festival, music festival, festival, Bancroft, Ontario, Toronto, Palmer Rapids, summer camp, 2023, 2024"
      />
    </Head>
  );
}
