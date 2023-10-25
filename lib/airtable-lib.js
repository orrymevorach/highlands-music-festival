import { client } from '../graphql/airtable-config';
import {
  INSERT_TICKET,
  INSERT_TICKET_DEVELOPMENT_MODE,
} from 'graphql/airtable-queries';
import { toCamelCase } from 'utils/utils';

export const addTicketToAirtable = async ({
  name,
  amount,
  paymentIntentId,
  discountCode = null,
  emailAddress,
  fullTicketPrice,
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
      fullTicketPrice,
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

export const createRecord = async ({ tableId, newFields }) => {
  try {
    const response = await fetch('/api/airtable/create-record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId, newFields }),
    }).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
};

export const transformFields = ({ record }) => {
  let transformedFieldsObj = {};
  const entries = Object.entries(record.fields);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const transformedKey = toCamelCase(key);
    transformedFieldsObj[transformedKey] = value;
    transformedFieldsObj.id = record.id;
  }
  return transformedFieldsObj;
};
