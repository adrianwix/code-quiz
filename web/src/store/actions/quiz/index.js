import actionTypes from './types.actions';
import { action } from '../utils';

export const createCategory = action(actionTypes.CREATE_CATEGORY);

// Adrian: Using payload for the data that goes directly into the State
// The other data is used to locate the part of the state that will be updated

/**
 * @description returned function receive category in mapStateToProps of <QuestionContainer />
 */
export const addAnswer = category => ({ questionKey, subcategory, result }) => ({
  type: actionTypes.ADD_ANSWER,
  category,
  payload: { questionKey, subcategory, result },
});

/**
 * @description returned function receive category in mapStateToProps of <QuestionContainer />
 */
export const updateAnswer = category => ({ index, questionKey, subcategory, result }) => ({
  type: actionTypes.UPDATE_ANSWER,
  index,
  category,
  payload: { questionKey, subcategory, result },
});
