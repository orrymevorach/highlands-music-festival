import { client } from './apollo-config';
import { GET_PRICE_MODEL } from './queries';

export const getPriceModel = async () => {
  const { data } = await client.query({
    query: GET_PRICE_MODEL,
    fetchPolicy: 'no-cache',
  });
  return data.priceModelCollection.items[0];
};
