import actionTypes from './types.actions';
import { action } from '../utils';

export const updateJavascriptResults = action(actionTypes.UPDATE_JAVASCRIPT);
export const createCategory = action(actionTypes.CREATE_CATEGORY);

/**
 * @description returned function receive category in mapStateToProps
 */
let addAnswer = type => category => ({ questionKey, subcategory, result }) => ({
  type,
  category,
  payload: { questionKey, subcategory, result },
});
export const addAnswerWithType = addAnswer(actionTypes.ADD_ANSWER);

let updateAnswer = type => category => ({ index, questionKey, subcategory, result }) => ({
  type,
  index,
  category,
  payload: { questionKey, subcategory, result },
});
export const updateAnswerWithType = updateAnswer(actionTypes.UPDATE_ANSWER);
