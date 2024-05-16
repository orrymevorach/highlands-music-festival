import Head from 'next/head';
import { imgPath } from 'utils/constants';
import { formatFestivalDate } from 'utils/utils';

export default function Meta({ title = '', festivalDate = '' }) {
  const tabTitle = `Highlands Music Festival ${title ? `| ${title}` : ''}`;
  const formattedFestivalDate = formatFestivalDate(festivalDate);
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={`Highlands Music Festival is a music festival taking place at Camp Walden in Palmer Rapids, Ontario, between Thursday ${formattedFestivalDate}`}
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
