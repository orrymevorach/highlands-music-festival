import { client } from '../graphql/apollo-config';
import {
  GET_PRICE_MODEL,
  GET_COMMITTEE_MEMBERS,
  GET_FEATURE_FLAG,
  GET_IS_PAGE_PUBLISHED,
  GET_NAVIGATION_BAR,
  GET_LINEUP,
  GET_FAQ_PAGE,
  GET_ACTIVITIES,
  GET_LINEUP_GRAPHICS,
  GET_FESTIVAL_DATE,
  GET_VENDORS,
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
  return data.featureFlagCollection.items[0].value;
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

  const password =
    (isPagePublished && data?.pageCollection?.items[0].password) || '';
  return { isPagePublished, isPasswordProtected, password };
};

export const getFestivalDate = async () => {
  // const { data } = await client.query({
  //   query: GET_FESTIVAL_DATE,
  // });
  // return data.festivalDateCollection.items[0];
  return 'Sept 25th - 28th, 2025';
};

export const getPageLoadData = async ({ url }) => {
  const navData = await getNavigationBar();
  const { isPagePublished, isPasswordProtected, password } =
    await getIsPagePublished({
      url,
    });
  const showEmailCapture = await getFeatureFlags({
    name: FEATURE_FLAGS.SHOW_EMAIL_CAPTURE,
  });

  const festivalDate = await getFestivalDate();

  return {
    navData,
    isPagePublished,
    isPasswordProtected,
    password,
    showEmailCapture,
    festivalDate,
  };
};

export const getLineup = async () => {
  const { data, errors } = await client.query({
    query: GET_LINEUP,
    errorPolicy: 'all', // returns both data and errors when response returns unpublished entries in draft state
  });

  return data.lineupCollection.items[0];
};

export const getHeadliners = async () => {
  const { data, errors } = await client.query({
    query: GET_LINEUP,
    errorPolicy: 'all', // returns both data and errors when response returns unpublished entries in draft state
  });

  return data.lineupCollection.items[0].headlinersCollection.items;
};

export const getFaqPage = async () => {
  const { data } = await client.query({
    query: GET_FAQ_PAGE,
  });

  return data.faqPageCollection.items[0];
};

export const getActivities = async () => {
  const { data } = await client.query({
    query: GET_ACTIVITIES,
  });

  return data.galleryActivitiesCollection.items[0].activitiesCollection.items;
};

export const getLineupGraphics = async () => {
  const { data } = await client.query({
    query: GET_LINEUP_GRAPHICS,
    fetchPolicy: 'no-cache',
  });

  return data.galleryLineupGraphicsCollection.items[0].imageCollection.items;
};

export const getVendors = async () => {
  const { data } = await client.query({
    query: GET_VENDORS,
  });
  const vendors =
    data.galleryVendorsCollection.items[0].vendorsCollection.items;
  const partners =
    data.galleryVendorsCollection.items[0].partnersCollection.items;
  return { vendors, partners };
};
