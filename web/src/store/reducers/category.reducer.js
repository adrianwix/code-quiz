import actionTypes from 'actions/quiz/types.actions';

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @param {String} action.type
 * @param {String} action.category
 * @param {String} action.index
 * @param {String} action.payload
 * @returns {{}}
 */
function category(state = {}, action) {
  /**
   * TODO(Adrian): Use reducer composition. Use object instead of array to store answer.
   *  Name object key `${subcategory}-${questionKey}`. Store key names in an array
   */
  let category;
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY:
      category = action.payload.category;
      return { ...state, [category]: [] };
    case actionTypes.ADD_ANSWER:
      category = action.category;
      return {
        ...state,
        [category]: [...state[category], action.payload],
      };
    case actionTypes.UPDATE_ANSWER:
      category = action.category;
      const categoryCopy = [...state[category]];
      categoryCopy[action.index] = action.payload;
      return {
        ...state,
        [category]: categoryCopy,
      };
    default:
      return state;
  }
}

export default category;

export const getCategory = (state, category) => state[category];
