import { client } from './apollo-config';
import { GET_COMMITTEE_MEMBERS } from './queries';

// export const getFeatureFlags = async () => {
//   const { data } = await client.query({
//     query: GET_FEATURE_FLAG,
//   });
//   return data.featureFlagCollection.items;
// };

export const getCommitteeMembers = async () => {
  const { data } = await client.query({
    query: GET_COMMITTEE_MEMBERS,
  });
  return data.galleryCommitteeMembersCollection.items[0];
};
