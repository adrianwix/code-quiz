import { combineReducers } from 'redux';

import javascriptResults from './javascript-results.reducer';

const reducer = combineReducers({
  javascriptResults,
});

export default reducer;

export const getJavasScriptResults = state => state.javascriptResults;
