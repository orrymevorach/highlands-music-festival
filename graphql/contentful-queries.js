import { gql } from '@apollo/client';
import {
  COMMITTEE_MEMBER_FRAGMENT,
  FAQ_FRAGMENT,
  IMAGE_FRAGMENT,
} from './contentful-fragments';

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

export const GET_LINEUP = gql`
  query GetLineup {
    lineupCollection(where: { title: "2024_LINEUP" }) {
      items {
        headlinersCollection(limit: 5) {
          items {
            name
            image {
              ...ImageFields
            }
          }
        }
        artistsCollection(limit: 20) {
          items {
            name
            image {
              ...ImageFields
            }
          }
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const GET_FAQ_PAGE = gql`
  query GetFaqPage {
    faqPageCollection(where: { title: "FAQ Page" }) {
      items {
        arrivalDepartureCollection(limit: 15) {
          items {
            ...FaqFields
          }
        }
        festivalOperationsCollection(limit: 15) {
          items {
            ...FaqFields
          }
        }
        accommodationsPackingCollection(limit: 15) {
          items {
            ...FaqFields
          }
        }
        foodBeverageCollection(limit: 15) {
          items {
            ...FaqFields
          }
        }
        ticketsCollection(limit: 15) {
          items {
            ...FaqFields
          }
        }
        musicEntertainmentCollection(limit: 15) {
          items {
            ...FaqFields
          }
        }
        healthAndSafetyCollection(limit: 15) {
          items {
            ...FaqFields
          }
        }
      }
    }
  }
  ${FAQ_FRAGMENT}
`;

export const GET_ACTIVITIES = gql`
  query getActivities {
    galleryActivitiesCollection(where: { title: "Activities" }, limit: 1) {
      items {
        activitiesCollection {
          items {
            name
            image {
              ...ImageFields
            }
          }
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const GET_LINEUP_GRAPHICS = gql`
  query getLineupGraphics {
    galleryLineupGraphicsCollection(
      where: { title: "Lineup Graphics" }
      limit: 1
    ) {
      items {
        imageCollection {
          items {
            url
            height
            width
          }
        }
      }
    }
  }
`;
