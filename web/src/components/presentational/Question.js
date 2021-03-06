import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Prism from 'prismjs';
import { Alert, Button, Card, Heading, majorScale, Pane, Paragraph } from 'evergreen-ui';
import Grid from 'presentational/Shared/Grid';
import Row from 'presentational/Shared/Row';
import Cell from 'presentational/Shared/Cell';
import 'styles/prism.css';
import QuestionNav from './QuestionNav';

class Question extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }
  render() {
    const {
      question,
      file,
      inputChecked,
      result,
      category,
      currentIndex,
      quizzes,
      onChange,
      onSubmit,
    } = this.props;
    let Answer;
    switch (result.type) {
      case 'CORRECT':
        Answer = <Alert intent="success" title={result.text} marginTop={majorScale(4)} />;
        break;
      case 'WRONG':
        Answer = <Alert intent="danger" title={result.text} marginTop={majorScale(4)} />;
        break;
      case 'PENDING':
        Answer = <Alert intent="warning" title={result.text} marginTop={majorScale(4)} />;
        break;
      default:
        Answer = <span />;
    }
    return (
      <Grid elevation={1} margin={majorScale(2)}>
        <Row>
          <Cell padding={majorScale(2)} background={'lightest'} columns={6} offset={4}>
            <QuestionNav category={category} currentIndex={currentIndex} quizzes={quizzes} />
          </Cell>
        </Row>
        <Row>
          <Cell padding={majorScale(2)} background={'lightest'} columns={6} offset={4}>
            <Heading size={900}>{question.title}</Heading>
            <Paragraph size={500}>{question.description}</Paragraph>
            <div className="code-container">
              <div className="traffic traffic_red" />
              <div className="traffic traffic_yellow" />
              <div className="traffic traffic_green" />
              <pre>
                <code className="language-javascript">{file}</code>
              </pre>
            </div>

            <Card>
              <form action="">
                {question.answers.map((a, index) => {
                  return (
                    <Pane padding={majorScale(1)} key={index}>
                      <input
                        onChange={onChange}
                        checked={a.answer === inputChecked}
                        type="radio"
                        name="answer"
                        value={a.answer}
                      />
                      {a.answer}
                      <br />
                    </Pane>
                  );
                })}
                <Button
                  type={'submit'}
                  onClick={onSubmit}
                  marginTop={majorScale(2)}
                  appearance="primary"
                >
                  Submit
                </Button>
              </form>
            </Card>
            {Answer}
          </Cell>
        </Row>
      </Grid>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    questionFile: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    answers: PropTypes.array.isRequired,
  }),
  file: PropTypes.string.isRequired,
  inputChecked: PropTypes.string.isRequired,
  result: PropTypes.oneOfType([
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
    PropTypes.oneOf(['']),
  ]),
  category: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      subcategory: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Question;
