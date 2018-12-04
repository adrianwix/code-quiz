import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import { Alert, Button, Card, Heading, majorScale, Pane, Paragraph } from 'evergreen-ui';
import Grid from '../Shared/Grid';
import Row from '../Shared/Row';
import Cell from '../Shared/Cell';
import '../../prism.css';

class Question extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }
  render() {
    const { question, file, inputsChecked, result, onChange, onSubmit } = this.props;
    console.log(result);
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
            <pre>
              <code className="language-javascript">{file}</code>
            </pre>
            <Card>
              <form action="">
                {question.answers.map((a, index) => {
                  return (
                    <Pane padding={majorScale(1)} key={index}>
                      <input
                        onChange={onChange}
                        checked={inputsChecked[index]}
                        type="radio"
                        name="answer"
                        value={index}
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
    questionFile: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    answers: PropTypes.array.isRequired,
  }),
  file: PropTypes.string.isRequired,
  inputsChecked: PropTypes.array.isRequired,
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
