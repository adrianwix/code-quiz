import React, { Component } from 'react';
import Category from 'presentational/Category';
import { connect } from 'react-redux';
import * as FromCategory from 'reducers/category.reducer';
import queryString from 'query-string';

class CategoryContainer extends Component {
  handleFilter = event => {
    const { history } = this.props;
    const currentPath = history.location.pathname;
    const filter = event.target.innerText;
    const location = filter === 'all' ? `${currentPath}` : `${currentPath}?filter=${filter}`;
    history.push(location);
  };

  render() {
    const {
      category: { quizzes },
      history,
    } = this.props;
    const parsed = queryString.parse(history.location.search);

    const filterQuizzes = quizzes.filter(quiz => {
      return quiz.subcategory.indexOf(parsed.filter || '') >= 0;
    });

    return (
      <Category
        quizzes={filterQuizzes}
        filter={parsed.filter}
        handleFilter={this.handleFilter}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps;

  return {
    categoryAnswers: FromCategory.getCategory(state, category.name),
  };
};

// TODO(Adrian): Add PropTypes

export default connect(mapStateToProps)(CategoryContainer);
