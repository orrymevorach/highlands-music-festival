import { client } from '../graphql/airtable-config';
import {
  INSERT_TICKET,
  INSERT_TICKET_DEVELOPMENT_MODE,
} from 'graphql/airtable-queries';

export const addTicketToAirtable = async ({
  name,
  amount,
  paymentIntentId,
  discountCode = null,
  emailAddress,
}) => {
  const env = process.env.NODE_ENV;
  // const mutation =
  //   env === 'production' ? INSERT_TICKET : INSERT_TICKET_DEVELOPMENT_MODE;
  const mutation = INSERT_TICKET;
  const status = env === 'production' ? 'Ticket Purchased' : 'Testing';
  const { data } = await client.mutate({
    mutation,
    variables: {
      name,
      amount,
      status,
      paymentIntent: paymentIntentId,
      fullName: name,
      discountCode,
      emailAddress,
    },
  });
  // const successField =
  //   process.env.NODE_ENV === 'production'
  //     ? 'insert_ticketPurchases2024'
  //     : 'insert_ticketPurchasesDevelopmentMode';
  const successField = 'insert_ticketPurchases2024';
  const isSuccess = !!data[successField];
  return { isSuccess };
};
