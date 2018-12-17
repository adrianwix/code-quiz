import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from 'presentational/Question';
import { createCategory, addAnswer, updateAnswer } from 'actions/quiz';
import * as FromCategory from 'reducers/category.reducer';
import { Link } from 'react-static';
import QuestionNav from '../presentational/QuestionNav';

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
    const { categoryAnswers, createCategory } = this.props;
    // Add new category to state if it doesn't exist
    if (!categoryAnswers) {
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
    const { questionKey, categoryAnswers, subcategory, addAnswer, updateAnswer } = this.props;
    const { result } = this.state;

    // Check state.category[] to verify if the user answer previously
    if (categoryAnswers.filter(answers => answers.questionKey === questionKey).length === 0) {
      addAnswer(questionKey, subcategory, result.type);
    } else {
      const answerKeys = categoryAnswers.map(answers => answers.questionKey);
      const index = answerKeys.indexOf(questionKey);
      updateAnswer(index, questionKey, subcategory, result.type);
    }
  };

  handleInputChange = e => {
    this.setState({ inputChecked: e.target.value });
  };

  render() {
    const { question, file, quizzes, category } = this.props;
    const { inputChecked, result } = this.state;
    console.log('question', question);
    // This fails when the title in category/index.json is different from category/question/index.json
    // const currentIndex = quizzes.findIndex(quiz => quiz.title === question.title);
    // TODO(Adrian): avoid repeating data
    const currentIndex = quizzes.findIndex(quiz => quiz.title === question.title);
    // console.group();
    // console.log('quizzes', quizzes);
    // console.log('category', category);
    // console.log('currentIndex', currentIndex);
    // console.groupEnd();
    return (
      <div>
        <Question
          question={question}
          file={file}
          inputChecked={inputChecked}
          result={result}
          category={category} // QuestionNav
          currentIndex={currentIndex} // QuestionNav
          quizzes={quizzes} // QuestionNav
          onChange={this.handleInputChange}
          onSubmit={this.validate}
        />
      </div>
    );
  }
}

// TODO(Adrian): category and quizzes is not in propTypes
QuestionContainer.propTypes = {
  createCategory: PropTypes.func.isRequired, // src: Redux connect()
  addAnswer: PropTypes.func.isRequired, // src: Redux connect()
  updateAnswer: PropTypes.func.isRequired, // src: Redux connect()
  categoryAnswers: PropTypes.arrayOf(
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
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      subcategory: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
    }),
  ),
  file: PropTypes.string.isRequired, // src: withRouteDate
  questionKey: PropTypes.string.isRequired, // src: withRouteDate
  subcategory: PropTypes.string.isRequired, // src: withRouteDate
};

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps.history;
  const category = location.pathname.split('/')[1];
  return {
    categoryAnswers: FromCategory.getCategory(state, category),
    category,
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
