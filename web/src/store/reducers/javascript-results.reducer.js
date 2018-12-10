import actionTypes from 'actions/quiz/types.actions';
// NOTE(Trey): I think we should either infer the question being unsolved
// by it being absent in the reducer or have the component load this hydrate
// this data on componentDidMount. Importing directly into a reducer feels brittle.
import javascriptData from '../../../../data/javascript/index.json';

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
