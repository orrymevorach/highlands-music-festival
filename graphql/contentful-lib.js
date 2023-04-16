import { client } from './apollo-config';
import {
  GET_COMMITTEE_MEMBERS,
  GET_FEATURE_FLAG,
  GET_IS_PAGE_PUBLISHED,
  GET_NAVIGATION_BAR,
} from './queries';

export const getFeatureFlags = async ({ name }) => {
  const { data } = await client.query({
    query: GET_FEATURE_FLAG,
    variables: {
      name,
    },
    fetchPolicy: 'no-cache',
  });
  return data.featureFlagCollection.items;
};

export const getCommitteeMembers = async () => {
  const { data } = await client.query({
    query: GET_COMMITTEE_MEMBERS,
  });
  return data.galleryCommitteeMembersCollection.items[0];
};

const getNavigationBar = async () => {
  const { data } = await client.query({
    query: GET_NAVIGATION_BAR,
    fetchPolicy: 'no-cache',
  });
  return data.navigationBarCollection.items[0].pageCollection.items;
};

const getIsPagePublished = async ({ url }) => {
  const { data } = await client.query({
    query: GET_IS_PAGE_PUBLISHED,
    variables: {
      url,
    },
    fetchPolicy: 'no-cache',
  });
  const isPagePublished =
    data?.pageCollection?.items && data?.pageCollection?.items.length > 0;
  return isPagePublished;
};

export const getPageLoadData = async ({ url }) => {
  const navData = await getNavigationBar();
  const isPagePublished = await getIsPagePublished({
    url,
  });

  return {
    navData,
    isPagePublished,
  };
};
