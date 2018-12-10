import Category from 'presentational/Category';
import { connect } from 'react-redux';
import * as FromCategory from 'reducers/category.reducer';

const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps;

  return {
    categoryAnswers: FromCategory.getCategory(state, category.name),
  };
};

// TODO(Adrian): Add PropTypes

export default connect(mapStateToProps)(Category);
