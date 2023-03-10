import { useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import { cookies } from 'utils/constants';

const inititalState = {
  hasSubmittedForm: true, // setting as true so capture does not show up on intial render
  hasClosedModal: true, // setting as true so modal does not show up on intial render
};

const actions = {
  SET_EMAIL_CAPTURE_SETTINGS: 'SET_EMAIL_CAPTURE_SETTINGS',
  SUBMIT_FORM: 'SUBMIT_FORM',
  CLOSE_SUBMIT_MODAL: 'CLOSE_SUBMIT_MODAL',
};

const { SET_EMAIL_CAPTURE_SETTINGS, SUBMIT_FORM, CLOSE_SUBMIT_MODAL } = actions;

export default function useEmailCapture() {
  const [{ hasSubmittedForm, hasClosedModal }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case SET_EMAIL_CAPTURE_SETTINGS:
          return {
            hasClosedModal: action.hasEmailCaptureCookie,
            hasSubmittedForm: action.hasEmailCaptureCookie,
          };
        case SUBMIT_FORM:
          return {
            hasSubmittedForm: true,
            hasClosedModal: false,
          };
        case CLOSE_SUBMIT_MODAL:
          return {
            hasSubmittedForm: true,
            hasClosedModal: true,
          };
        default:
          return state;
      }
    },
    inititalState
  );

  useEffect(() => {
    const hasEmailCaptureCookie = !!Cookies.get(cookies.emailCaptureCookie);
    dispatch({
      type: SET_EMAIL_CAPTURE_SETTINGS,
      hasEmailCaptureCookie,
    });
  }, []);

  const triggers = {
    SUBMIT_FORM: () => dispatch({ type: SUBMIT_FORM }),
    CLOSE_SUBMIT_MODAL: () => dispatch({ type: CLOSE_SUBMIT_MODAL }),
  };

  return { hasSubmittedForm, hasClosedModal, triggers };
}
