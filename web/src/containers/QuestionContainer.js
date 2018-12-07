import React, { Component } from 'react';
import Question from '../presentational/Question';
import { connect } from 'react-redux';
import { updateJavascriptResults } from '../action-creators/update-javascript-results';

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
  constructor(props) {
    super(props);
    const initialArray = [];
    props.question.answers.forEach((value, index) => {
      initialArray[index] = false;
    });
    this.state = {
      result: '',
      inputsChecked: initialArray,
      sentAnswerToReduxStore: false,
    };
  }

  validate = e => {
    e.preventDefault();
    //We could use querySelector on a reference to the form element instead of document...
    let result = '';
    const userAnswerIndex = this.state.inputsChecked.findIndex(checked => checked);
    if (userAnswerIndex >= 0) {
      const isCorrectAnswer = this.props.question.answers[userAnswerIndex].isCorrect;
      result = isCorrectAnswer ? questionResults.correct : questionResults.wrong;
      this.setState({ result }, this.updateReduxState);
    } else {
      result = questionResults.pending;
      this.setState({ result }, this.updateReduxState);
    }
  };

  updateReduxState = () => {
    if (!this.state.sentAnswerToReduxStore) {
      //testing action creator
      const payload = {};
      payload[this.props.questionKey] = this.state.result.type;
      this.props.updateJavascript(payload);
      //if we submitted an answer we want to prevent further submission to redux
      if (this.state.result.type !== 'PENDING') {
        this.setState({ sentAnswerToReduxStore: true });
      }
    }
  };

  handleInputChange = e => {
    const index = e.target.value;
    this.setState(state => {
      const cleanArray = state.inputsChecked.map(i => false);
      cleanArray[index] = true;
      return { inputsChecked: cleanArray };
    });
  };

  render() {
    const { question, file } = this.props;
    const { inputsChecked, result } = this.state;

    return (
      <Question
        question={question}
        file={file}
        inputsChecked={inputsChecked}
        result={result}
        onChange={this.handleInputChange}
        onSubmit={this.validate}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateJavascript: payload => {
      dispatch(updateJavascriptResults(payload));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(QuestionPage);
