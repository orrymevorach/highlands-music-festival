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

export const GET_COMMITTEE_MEMBERS = gql`
  query {
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
