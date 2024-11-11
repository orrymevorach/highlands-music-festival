import OrderConfirmation from 'components/OrderConfirmationPage/order-confirmation';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';
import Head from 'components/shared/Head/Head';
import { useFacebookPixel } from 'hooks';
import { getRecordById } from 'lib/airtable-lib';

export default function CommitteePage({ user, festivalDate }) {
  useFacebookPixel();
  return (
    <>
      <Head title="Order Confirmed!" festivalDate={festivalDate} />
      <OrderConfirmation user={user} />
    </>
  );
}

export const getServerSideProps = async context => {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.ORDER_CONFIRMATION,
  });

  const { id } = context.query;

  const { record: user } = await getRecordById({
    recordId: id,
    tableId: 'Ticket Purchases',
  });

  return {
    props: {
      user: user || null,
      ...pageLoadData,
    },
  };
};
