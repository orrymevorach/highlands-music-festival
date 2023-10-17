import { useReducer } from 'react';

const actions = {
  SET_STAGE: 'SET_STAGE',
  SET_EMAIL: 'SET_EMAIL',
  SET_NAME: 'SET_NAME',
  SET_MESSAGE: 'SET_MESSAGE',
};

const stages = {
  FILL_OUT_FORM: 'FILL_OUT_FORM',
  CONFIRMATION: 'CONFIRMATION',
};

const initialState = {
  email: '',
  name: '',
  message: '',
  stage: stages.FILL_OUT_FORM,
};

const reducer = (state, action) => {
  const { SET_STAGE, SET_NAME, SET_MESSAGE, SET_EMAIL } = actions;
  switch (action.type) {
    case SET_STAGE:
      return {
        ...state,
        stage: action.stage,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message,
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
