import React, { Component } from 'react';
import { withRouteData } from 'react-static';

class QuestionPage extends Component {
  render() {
    const { question, file } = this.props;
    console.log('==== props', this.props);
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{question.title}</h1>
        <p>{question.description}</p>
        <pre>{file}</pre>
        <ul>
          {question.answers.map(a => (
            <li>{a.answer}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouteData(QuestionPage);
