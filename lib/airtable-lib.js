import { client } from '../graphql/airtable-config';
import { INSERT_TICKET } from 'graphql/airtable-queries';

export const addTicketToAirtable = async ({
  name,
  amount,
  paymentIntentId,
  discountCode = null,
  emailAddress,
}) => {
  const { data } = await client.mutate({
    mutation: INSERT_TICKET,
    variables: {
      name,
      amount,
      status: 'Ticket Purchased',
      paymentIntent: paymentIntentId,
      fullName: name,
      discountCode,
      emailAddress,
      environment: process.env === 'production' ? 'Production' : 'Development',
    },
  });
  return data;
};
