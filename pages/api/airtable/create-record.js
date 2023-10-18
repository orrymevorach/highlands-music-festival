const Airtable = require('airtable');
import { toCamelCase } from 'utils/utils';

require('dotenv').config({ path: '.env.local' });

// Airtable Config
var airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

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

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId, newFields } = req.body;
    try {
      const response = await airtableBase(tableId).create([
        {
          fields: {
            ...newFields,
          },
        },
      ]);
      const record = response[0];
      const fields = transformFields({ record });
      const transformedRecord = {
        id: record.id,
        ...fields,
      };
      res.status(200).json({ response: transformedRecord });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
