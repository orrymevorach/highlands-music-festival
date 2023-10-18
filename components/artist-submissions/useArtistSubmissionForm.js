import { useReducer } from 'react';

const actions = {
  SET_STAGE: 'SET_STAGE',
  SET_CONTACT_NAME: 'SET_CONTACT_NAME',
  SET_ARTIST_NAME: 'SET_ARTIST_NAME',
  SET_CONTACT_EMAIL: 'SET_CONTACT_EMAIL',
  SET_CONTACT_PHONE: 'SET_CONTACT_PHONE',
  SET_CITY: 'SET_CITY',
  SET_WEBSITE: 'SET_WEBSITE',
  SET_SOCIAL_PAGE: 'SET_SOCIAL_PAGE',
  SET_ABOUT: 'SET_ABOUT',
  SET_AUDIO_EXAMPLE_1: 'SET_AUDIO_EXAMPLE_1',
  SET_AUDIO_EXAMPLE_2: 'SET_AUDIO_EXAMPLE_2',
  SET_AUDIO_EXAMPLE_3: 'SET_AUDIO_EXAMPLE_3',
};

const stages = {
  FILL_OUT_FORM: 'FILL_OUT_FORM',
  CONFIRMATION: 'CONFIRMATION',
};

const initialState = {
  stage: stages.FILL_OUT_FORM,
  contactName: '',
  artistName: '',
  contactEmail: '',
  contactPhone: '',
  city: '',
  website: '',
  socialPage: '',
  about: '',
  audioExampleOne: '',
  audioExampleTwo: '',
  audioExampleThree: '',
};

const reducer = (state, action) => {
  const {
    SET_STAGE,
    SET_CONTACT_NAME,
    SET_ARTIST_NAME,
    SET_CONTACT_EMAIL,
    SET_CONTACT_PHONE,
    SET_CITY,
    SET_WEBSITE,
    SET_SOCIAL_PAGE,
    SET_ABOUT,
    SET_AUDIO_EXAMPLE_1,
    SET_AUDIO_EXAMPLE_2,
    SET_AUDIO_EXAMPLE_3,
  } = actions;
  switch (action.type) {
    case SET_STAGE:
      return {
        ...state,
        stage: action.stage,
      };

    case SET_CONTACT_NAME:
      return {
        ...state,
        contactName: action.contactName,
      };
    case SET_ARTIST_NAME:
      return {
        ...state,
        artistName: action.artistName,
      };
    case SET_CONTACT_EMAIL:
      return {
        ...state,
        contactEmail: action.contactEmail,
      };
    case SET_CONTACT_PHONE:
      return {
        ...state,
        contactPhone: action.contactPhone,
      };
    case SET_CITY:
      return {
        ...state,
        city: action.city,
      };
    case SET_WEBSITE:
      return {
        ...state,
        website: action.website,
      };
    case SET_SOCIAL_PAGE:
      return {
        ...state,
        socialPage: action.socialPage,
      };
    case SET_ABOUT:
      return {
        ...state,
        about: action.about,
      };
    case SET_AUDIO_EXAMPLE_1:
      return {
        ...state,
        audioExampleOne: action.audioExampleOne,
      };
    case SET_AUDIO_EXAMPLE_2:
      return {
        ...state,
        audioExampleTwo: action.audioExampleTwo,
      };
    case SET_AUDIO_EXAMPLE_3:
      return {
        ...state,
        audioExampleThree: action.audioExampleThree,
      };
  }
};

export default function useArtistSubmissionFormReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    state,
    dispatch,
    actions,
    stages,
  };
}
