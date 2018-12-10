import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from 'presentational/Question';
import { updateJavascriptResults } from 'actions/quiz';
import { createCategory, addAnswerWithType, updateAnswerWithType } from '../../store/actions/quiz';
import * as FromCategory from '../../store/reducers/category.reducer';

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

class QuestionPage extends Component {
  /**
   *
   * @param {Object} props
   * @param {Object} props.question src: withRouteDate
   * @param {Object} props.file src: withRouteDate
   * @param {Object} props.questionKey src: withRouteDate
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
    const {
      questionKey,
      category,
      question: { subcategory },
      addAnswer,
      updateAnswer,
    } = this.props;
    const { result } = this.state;

    // Check state.category[] to verify if the user answer previously
    if (category.filter(answers => answers.questionKey === questionKey).length === 0) {
      addAnswer(questionKey, subcategory, result.type);
    } else {
      const answerKeys = category.map(answers => answers.questionKey);
      const index = answerKeys.indexOf(questionKey);
      updateAnswer(index, questionKey, subcategory, result.type);
    }

    // TODO(Adrian): Update answers if the answer is in the state
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

// TODO(Adrian): Add propTypes

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
      dispatch(addAnswerWithType(category)({ questionKey, subcategory, result }));
    },
    updateAnswer: (index, questionKey, subcategory, result) => {
      dispatch(updateAnswerWithType(category)({ index, questionKey, subcategory, result }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionPage);
