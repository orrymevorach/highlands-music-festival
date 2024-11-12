import { toCamelCase } from 'utils/utils';

export const createRecord = async ({ tableId, newFields }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/airtable/create-record`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, newFields }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
};

export async function getRecords({ tableId, view = 'Grid view' }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/airtable/get-records`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, view }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

export async function getRecordById({ tableId, recordId }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/airtable/get-record-by-id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, recordId }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log('error', error);
  }
}

export const updateRecord = async ({ tableId, recordId, newFields }) => {
  try {
    const response = await fetch(`/api/airtable/update-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId, newFields, recordId }),
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

export const getProduct = async ({ recordId }) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const { record } = await getRecordById({
    tableId: 'Product Inventory',
    recordId,
  });
  const paymentOptions = record.paymentOptions
    ? JSON.parse(record.paymentOptions)
    : null;
  const filteredPaymentOptionsByEnv = await Promise.all(
    paymentOptions
      .filter(({ environment }) => environment === process.env.NODE_ENV)
      .map(async option => {
        const price = await stripe.prices.retrieve(option.subscriptionId);
        const priceInDollars = price.unit_amount / 100;
        return {
          ...option,
          price: priceInDollars,
        };
      })
  );

  record.paymentOptions = filteredPaymentOptionsByEnv;
  return record;
};

export const getProducts = async () => {
  const { records } = await getRecords({
    tableId: 'Product Inventory',
  });
  return records;
};
