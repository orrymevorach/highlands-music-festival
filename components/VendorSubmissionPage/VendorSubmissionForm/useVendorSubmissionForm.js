import { useReducer } from 'react';

const actions = {
  SET_STAGE: 'SET_STAGE',
  SET_BUSINESS: 'SET_BUSINESS',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_SERVICES: 'SET_SERVICES',
  SET_INSTAGRAM: 'SET_INSTAGRAM',
  SET_WEBSITE: 'SET_WEBSITE',
  SET_EMAIL: 'SET_EMAIL',
  SET_LENGTH_OF_STAY: 'SET_LENGTH_OF_STAY',
};

const stages = {
  FILL_OUT_FORM: 'FILL_OUT_FORM',
  CONFIRMATION: 'CONFIRMATION',
};

const initialState = {
  stage: stages.FILL_OUT_FORM,
  business: '',
  products: '',
  services: '',
  instagram: '',
  website: '',
  email: '',
  lengthOfStay: '',
};

const reducer = (state, action) => {
  const {
    SET_STAGE,
    SET_BUSINESS,
    SET_PRODUCTS,
    SET_SERVICES,
    SET_INSTAGRAM,
    SET_WEBSITE,
    SET_EMAIL,
    SET_LENGTH_OF_STAY,
  } = actions;
  switch (action.type) {
    case SET_STAGE:
      return {
        ...state,
        stage: action.stage,
      };
    case SET_BUSINESS:
      return {
        ...state,
        business: action.business,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case SET_SERVICES:
      return {
        ...state,
        services: action.services,
      };
    case SET_INSTAGRAM:
      return {
        ...state,
        instagram: action.instagram,
      };
    case SET_WEBSITE:
      return {
        ...state,
        website: action.website,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case SET_LENGTH_OF_STAY:
      return {
        ...state,
        lengthOfStay: action.lengthOfStay,
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
