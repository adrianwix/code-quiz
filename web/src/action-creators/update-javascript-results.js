import actionTypes from '../actions-types';

export const updateJavascriptResults = payload => {
  return {
    type: actionTypes.UPDATE_JAVASCRIPT,
    payload,
  };
};
