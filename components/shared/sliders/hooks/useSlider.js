import { useReducer } from 'react';

const actions = {
  NEXT_SLIDE: 'NEXT_SLIDE',
  LAST_SLIDE: 'LAST_SLIDE',
  SET_SLIDE: 'SET_SLIDE',
  START_AUTO_SLIDE: 'START_AUTO_SLIDE',
};

const reducer = (state, action) => {
  const { NEXT_SLIDE, LAST_SLIDE, SET_SLIDE, START_AUTO_SLIDE } = actions;
  let index;
  switch (action.type) {
    case NEXT_SLIDE:
      const nextIndex = action.index + 1;
      if (nextIndex > action.numberOfSlides) {
        index = 0;
      } else {
        index = action.index;
      }
      return {
        ...state,
        index,
      };

    case LAST_SLIDE:
      if (action.index < 0) {
        index = action.numberOfSlides - 1;
      } else {
        index = action.index;
      }
      return {
        ...state,
        index,
      };

    case SET_SLIDE:
      return {
        ...state,
        isAutoSlide: false,
        index: action.index,
      };
    case START_AUTO_SLIDE:
      return {
        ...state,
        isAutoSlide: true,
      };
    default:
      return {
        ...state,
        index: state.index,
      };
  }
};

const initialState = {
  index: 0,
  usAutoSlide: false,
};

export default function useSlider({ data }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { NEXT_SLIDE, LAST_SLIDE, SET_SLIDE, START_AUTO_SLIDE } = actions;
  const triggers = {
    [NEXT_SLIDE]: () =>
      dispatch({
        type: NEXT_SLIDE,
        numberOfSlides: data.length,
        index: state.index + 1,
      }),
    [LAST_SLIDE]: () =>
      dispatch({
        type: LAST_SLIDE,
        numberOfSlides: data.length,
        index: state.index - 1,
      }),
    [SET_SLIDE]: index => dispatch({ type: SET_SLIDE, index }),
    [START_AUTO_SLIDE]: () => dispatch({ type: START_AUTO_SLIDE }),
  };

  return {
    state,
    triggers,
  };
}
