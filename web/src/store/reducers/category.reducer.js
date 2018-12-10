import actionTypes from '../actions/quiz/types.actions';

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @param {String} action.type
 * @param {String} action.payload.category
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
      category = action.payload.category;
      console.group('Category');
      console.log('category', category);
      console.log('state', state);
      console.groupEnd();
      const { questionKey, subcategory, result } = action.payload;
      return {
        ...state,
        [category]: [
          ...state[category],
          {
            questionKey,
            subcategory,
            result,
          },
        ],
      };
    default:
      return state;
  }
}

export default category;

export const getCategory = (state, category) => state[category];
