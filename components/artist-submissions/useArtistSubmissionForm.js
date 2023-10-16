import { useReducer } from 'react';

const actions = {
  SET_STAGE: 'SET_STAGE',
  SET_NAME: 'SET_NAME',
  SET_DROPDOWN: 'SET_DROPDOWN',
  SET_TEXTAREA: 'SET_TEXTAREA',
};

const stages = {
  FILL_OUT_FORM: 'FILL_OUT_FORM',
  CONFIRMATION: 'CONFIRMATION',
};

const initialState = {
  name: '',
  dropdown: '',
  textarea: '',
};

const reducer = (state, action) => {
  const { SET_STAGE, SET_NAME, SET_DROPDOWN, SET_TEXTAREA } = actions;
  switch (action.type) {
    case SET_STAGE:
      return {
        ...state,
        stage: action.stage,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case SET_DROPDOWN:
      return {
        ...state,
        dropdown: action.dropdown,
      };
    case SET_TEXTAREA:
      return {
        ...state,
        textarea: action.textarea,
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
