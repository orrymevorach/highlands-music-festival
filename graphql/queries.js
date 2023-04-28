import { gql } from '@apollo/client';
import { COMMITTEE_MEMBER_FRAGMENT } from './fragments';

export const GET_FEATURE_FLAG = gql`
  query getFeatureFlag($name: String) {
    featureFlagCollection(where: { name: $name }) {
      items {
        name
        value
      }
    }
  }
`;

export const GET_PRICE_MODEL = gql`
  query GetPriceModel($priceModelId: String) {
    priceModelCollection(where: { priceModelId: $priceModelId }) {
      items {
        subscriptionId
        ticketPrice
        subscriptionStartDate
        numberOfSubscriptionIterations
        discountName
        discountAmountPerUnit
      }
    }
  }
`;

export const GET_COMMITTEE_MEMBERS = gql`
  query GetCommitteeMembers {
    galleryCommitteeMembersCollection(
      where: { queryTitle: "Committee Members Gallery" }
      limit: 1
    ) {
      items {
        foundingMembersCollection {
          items {
            ...CommitteeMemberFields
          }
        }
        friendsOfHighlandsCollection {
          items {
            ...CommitteeMemberFields
          }
        }
      }
    }
  }
  ${COMMITTEE_MEMBER_FRAGMENT}
`;

export const GET_NAVIGATION_BAR = gql`
  query GetNavigationBar {
    navigationBarCollection(where: { title: "HOME_NAVIGATION_BAR" }) {
      items {
        pageCollection {
          items {
            label
            url
          }
        }
      }
    }
  }
`;

export const GET_IS_PAGE_PUBLISHED = gql`
  query GetIsPagePublished($url: String!) {
    pageCollection(where: { url: $url }) {
      items {
        label
        isPasswordProtected
      }
    }
  }
`;

export const GET_HEADLINERS = gql`
  query GetHeadliners {
    lineupCollection(where: { title: "2023_LINEUP" }) {
      items {
        headlinersCollection {
          items {
            name
          }
        }
      }
    }
  }
`;
