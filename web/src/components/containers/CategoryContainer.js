import Category from '../presentational/Category';
import { connect } from 'react-redux';
import { getJavasScriptResults } from 'reducers/selectors';
import * as FromCategory from '../../store/reducers/category.reducer';

const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps;
  console.log(category);
  return {
    categoryAnswers: FromCategory.getCategory(state, category.category),
  };
};

export default connect(mapStateToProps)(Category);
