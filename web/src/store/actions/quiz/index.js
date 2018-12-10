import actionTypes from './types.actions';
import { action } from '../utils';

export const createCategory = action(actionTypes.CREATE_CATEGORY);

// Adrian: Using payload for the data that goes directly into the State
// The other data is used to locate the part of the state that will be updated

/**
 * @description returned function receive category in mapStateToProps of <QuestionContainer />
 */
let addAnswer = type => category => ({ questionKey, subcategory, result }) => ({
  type,
  category,
  payload: { questionKey, subcategory, result },
});
export const addAnswerWithType = addAnswer(actionTypes.ADD_ANSWER);

/**
 * @description returned function receive category in mapStateToProps of <QuestionContainer />
 */
let updateAnswer = type => category => ({ index, questionKey, subcategory, result }) => ({
  type,
  index,
  category,
  payload: { questionKey, subcategory, result },
});
export const updateAnswerWithType = updateAnswer(actionTypes.UPDATE_ANSWER);
