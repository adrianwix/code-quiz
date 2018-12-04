import React, { Component } from 'react';
import { withRouteData } from 'react-static';
import Prism from 'prismjs';
import '../prism.css';

const questionResults = {
  pending: 'Select an answer!',
  correct: 'Right Answer!',
  wrong: 'Wrong Answer... try again!',
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
    };
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  validate = e => {
    e.preventDefault();
    //We could use querySelector on a reference to the form element instead of document...
    let result = '';
    const userAnswerIndex = this.state.inputsChecked.findIndex(checked => checked);
    if (userAnswerIndex >= 0) {
      const isCorrectAnswer = this.props.question.answers[userAnswerIndex].isCorrect;
      result = isCorrectAnswer ? questionResults.correct : questionResults.wrong;
      this.setState({ result });
    } else {
      result = questionResults.pending;
      this.setState({ result });
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
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{question.title}</h1>
        <p>{question.description}</p>
        <pre>
          <code className="language-javascript">{file}</code>
        </pre>
        <form action="">
          {question.answers.map((a, index) => (
            <div key={index}>
              <input
                onChange={this.handleInputChange}
                checked={this.state.inputsChecked[index] ? true : false}
                type="radio"
                name="answer"
                value={index}
              />
              {a.answer}
              <br />
            </div>
          ))}
          <input type="submit" value="submit" onClick={this.validate} />
        </form>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

export default withRouteData(QuestionPage);
