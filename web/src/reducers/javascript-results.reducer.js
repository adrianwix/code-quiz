import javascriptData from '../../../data/javascript/index.json';
import actionTypes from '../actions-types';

const getInitialState = () => {
  const initialState = {};
  javascriptData.quizzes.forEach(question => {
    initialState[question.key] = 'UNSOLVED';
  });
  return initialState;
};

export default (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_JAVASCRIPT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
