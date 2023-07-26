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
  const mutation =
    env === 'production' ? INSERT_TICKET : INSERT_TICKET_DEVELOPMENT_MODE;
  const { data } = await client.mutate({
    mutation,
    variables: {
      name,
      amount,
      status: 'Ticket Purchased',
      paymentIntent: paymentIntentId,
      fullName: name,
      discountCode,
      emailAddress,
      environment:
        process.env.NODE_ENV === 'production' ? 'Production' : 'Development',
    },
  });
  const successField =
    process.env.NODE_ENV === 'production'
      ? 'insert_ticketPurchases'
      : 'insert_ticketPurchasesDevelopmentMode';
  const isSuccess = !!data[successField];
  return { isSuccess };
};
