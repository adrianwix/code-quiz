import actionTypes from './types.actions';
import { action } from '../utils';

export const updateJavascriptResults = action(actionTypes.UPDATE_JAVASCRIPT);
export const createCategory = action(actionTypes.CREATE_CATEGORY);

/**
 * @description returned function receive category in mapStateToProps
 * @param type
 * @returns {function(*): function({questionKey: *, subcategory: *, result: *}): {type: *, payload: {questionKey: *, subcategory: *, result: *}}}
 */
let addAnswer = type => category => ({ questionKey, subcategory, result }) => ({
  type,
  payload: { questionKey, category, subcategory, result },
});
export const addAnswerWithType = addAnswer(actionTypes.ADD_ANSWER);
