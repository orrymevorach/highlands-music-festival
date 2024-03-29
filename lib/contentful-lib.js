import { client } from '../graphql/apollo-config';
import {
  GET_PRICE_MODEL,
  GET_COMMITTEE_MEMBERS,
  GET_FEATURE_FLAG,
  GET_IS_PAGE_PUBLISHED,
  GET_NAVIGATION_BAR,
  GET_LINEUP,
  GET_FAQ_PAGE,
} from '../graphql/contentful-queries';
import { FEATURE_FLAGS } from 'utils/constants';

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

export const getPriceModel = async ({ priceModelId = '' }) => {
  const { data } = await client.query({
    query: GET_PRICE_MODEL,
    variables: {
      priceModelId,
    },
    fetchPolicy: 'no-cache',
  });
  return data.priceModelCollection.items[0];
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

  const isPasswordProtected =
    isPagePublished && data?.pageCollection?.items[0].isPasswordProtected;
  return { isPagePublished, isPasswordProtected };
};

export const getPageLoadData = async ({ url }) => {
  const navData = await getNavigationBar();
  const { isPagePublished, isPasswordProtected } = await getIsPagePublished({
    url,
  });
  const emailCaptureFeatureFlagResponse = await getFeatureFlags({
    name: FEATURE_FLAGS.SHOW_EMAIL_CAPTURE,
  });
  const showEmailCapture = emailCaptureFeatureFlagResponse[0].value;

  return {
    navData,
    isPagePublished,
    isPasswordProtected,
    showEmailCapture,
  };
};

export const getLineup = async () => {
  const { data } = await client.query({
    query: GET_LINEUP,
  });

  return data.lineupCollection.items[0];
};

export const getHeadliners = async () => {
  const { data } = await client.query({
    query: GET_LINEUP,
  });

  return data.lineupCollection.items[0].headlinersCollection.items;
};

export const getFaqPage = async () => {
  const { data } = await client.query({
    query: GET_FAQ_PAGE,
  });

  return data.faqPageCollection.items[0];
};
