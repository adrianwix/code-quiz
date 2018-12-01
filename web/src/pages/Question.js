import React, { Component } from 'react';
import { withRouteData } from 'react-static';
import Prism from 'prismjs';
import '../prism.css';

class QuestionPage extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const { question, file } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{question.title}</h1>
        <p>{question.description}</p>
        <pre>
          <code className="language-javascript">{file}</code>
        </pre>
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
