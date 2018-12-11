import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from 'presentational/Question';
import { createCategory, addAnswer, updateAnswer } from 'actions/quiz';
import * as FromCategory from 'reducers/category.reducer';

const questionResults = {
  pending: {
    text: 'Select an answer!',
    type: 'PENDING',
  },
  correct: {
    text: 'Right Answer!',
    type: 'CORRECT',
  },
  wrong: {
    text: 'Wrong Answer try again',
    type: 'WRONG',
  },
};

class QuestionContainer extends Component {
  /**
   *
   * @param {Object} props
   * @param {Object} props.question src: withRouteDate
   * @param {Object} props.file src: withRouteDate
   * @param {Object} props.questionKey src: withRouteDate
   * @param {Object} props.subcategory src: withRouteDate
   */
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      inputChecked: '',
    };
  }

  componentDidMount() {
    const { category, createCategory } = this.props;
    // Add new category to state if it doesn't exist
    if (!category) {
      createCategory();
    }
  }

  validate = e => {
    e.preventDefault();
    const { question } = this.props;
    const { inputChecked } = this.state;
    const { correctAnswer } = question;
    let result = '';

    if (inputChecked === '') {
      result = questionResults.pending;
      this.setState({ result }, this.updateReduxState);
    } else if (inputChecked !== '') {
      result = inputChecked === correctAnswer ? questionResults.correct : questionResults.wrong;
      this.setState({ result }, this.updateReduxState);
    }
  };

  updateReduxState = () => {
    const { questionKey, category, subcategory, addAnswer, updateAnswer } = this.props;
    const { result } = this.state;

    // Check state.category[] to verify if the user answer previously
    if (category.filter(answers => answers.questionKey === questionKey).length === 0) {
      addAnswer(questionKey, subcategory, result.type);
    } else {
      const answerKeys = category.map(answers => answers.questionKey);
      const index = answerKeys.indexOf(questionKey);
      updateAnswer(index, questionKey, subcategory, result.type);
    }
  };

  handleInputChange = e => {
    this.setState({ inputChecked: e.target.value });
  };

  render() {
    const { question, file } = this.props;
    const { inputChecked, result } = this.state;

    return (
      <Question
        question={question}
        file={file}
        inputChecked={inputChecked}
        result={result}
        onChange={this.handleInputChange}
        onSubmit={this.validate}
      />
    );
  }
}

QuestionContainer.propTypes = {
  createCategory: PropTypes.func.isRequired, // src: Redux connect()
  addAnswer: PropTypes.func.isRequired, // src: Redux connect()
  updateAnswer: PropTypes.func.isRequired, // src: Redux connect()
  category: PropTypes.arrayOf(
    // src: Redux connect()
    PropTypes.shape({
      subcategory: PropTypes.string.isRequired,
      questionKey: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
    }),
  ),
  question: PropTypes.shape({
    // src: withRouteDate
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    questionFile: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    answers: PropTypes.array.isRequired,
  }).isRequired,
  file: PropTypes.string.isRequired, // src: withRouteDate
  questionKey: PropTypes.string.isRequired, // src: withRouteDate
  subcategory: PropTypes.string.isRequired, // src: withRouteDate
};

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps.history;
  const category = location.pathname.split('/')[1];
  return {
    category: FromCategory.getCategory(state, category),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { location } = ownProps.history;
  const category = location.pathname.split('/')[1];
  console.log('category', category);
  return {
    createCategory: () => {
      dispatch(createCategory({ category }));
    },
    addAnswer: (questionKey, subcategory, result) => {
      dispatch(addAnswer(category)({ questionKey, subcategory, result }));
    },
    updateAnswer: (index, questionKey, subcategory, result) => {
      dispatch(updateAnswer(category)({ index, questionKey, subcategory, result }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionContainer);
