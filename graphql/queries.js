import { gql } from '@apollo/client';

// export const GET_FEATURE_FLAG = gql`
//   query getFeatureFlag {
//     featureFlagCollection {
//       items {
//         name
//       }
//     }
//   }
// `;

export const GET_PRICE_MODEL = gql`
  query GetPriceModel {
    priceModelCollection {
      items {
        subscriptionId
        firstInstalmentPerUnitBeforeTax
        subscriptionStartDate
        numberOfSubscriptionIterations
        discountName
        discountAmountPerUnit
      }
    }
  }
`;
