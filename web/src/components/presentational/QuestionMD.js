import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Prism from 'prismjs';
import { Alert, Button, Card, Heading, majorScale, Pane, Paragraph } from 'evergreen-ui';
import Grid from 'presentational/Shared/Grid';
import Row from 'presentational/Shared/Row';
import Cell from 'presentational/Shared/Cell';
import 'styles/prism.css';

class Question extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }
  render() {
    const { question, content, inputChecked, result, onChange, onSubmit } = this.props;
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
            <Heading size={900}>{question.title}</Heading>
            <Paragraph size={500}>{question.description}</Paragraph>

            <div dangerouslySetInnerHTML={{ __html: content }} />

            <div className="code-container">
              <div className="traffic traffic_red" />
              <div className="traffic traffic_yellow" />
              <div className="traffic traffic_green" />
              <pre>
                <code className="language-javascript">{content}</code>
              </pre>
            </div>

            <Card>
              <form action="">
                {question.answers.map((answer, index) => {
                  answer = String(answer);
                  return (
                    <Pane padding={majorScale(1)} key={index}>
                      <input
                        onChange={onChange}
                        checked={answer === inputChecked}
                        type="radio"
                        name="answer"
                        value={answer}
                      />
                      {answer}
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
                  Primary
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
    correctAnswer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    answers: PropTypes.array.isRequired,
  }),
  content: PropTypes.string.isRequired,
  inputChecked: PropTypes.string.isRequired,
  result: PropTypes.oneOfType([
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
    PropTypes.oneOf(['']),
  ]),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Question;
