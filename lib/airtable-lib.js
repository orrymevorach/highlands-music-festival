import { toCamelCase } from 'utils/utils';

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
