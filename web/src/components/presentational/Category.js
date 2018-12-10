import React from 'react';
import * as PropTypes from 'prop-types';
import { Heading, majorScale } from 'evergreen-ui';
import { Link } from 'react-static';
import Grid from 'presentational/Shared/Grid';
import Row from 'presentational/Shared/Row';
import Cell from 'presentational/Shared/Cell';
import queryString from 'query-string';

const colors = {
  CORRECT: {
    border: '#47B881',
    background: '#D4EEE2',
  },
  PENDING: {
    border: '#E4E7EB',
    background: '#F5F6F7',
  },
  WRONG: {
    border: '#EC4C47',
    background: '#FEF6F6',
  },
  UNSOLVED: {
    border: '#E4E7EB',
    background: '#F5F6F7',
  },
};

/**
 *
 * @param {Object} props
 * @param {Object} props.name src: withRouteDate
 * @param {Object} props.category src: withRouteDate
 * @param {Object} props.categoryAnswers src: connect()
 * @returns {*}
 * @constructor
 */
class Category extends React.Component {
  handleFilter = event => {
    const { history } = this.props;
    const currentPath = history.location.pathname;
    const filter = event.target.innerText;
    const location = filter === 'all' ? `${currentPath}` : `${currentPath}?filter=${filter}`;
    history.push(location);
  };

  render() {
    const { name, category, categoryAnswers, history } = this.props;
    const { quizzes, subcategories } = category;
    const parsed = queryString.parse(history.location.search);

    // TODO(Adrian): Filter logic should be in container
    return (
      <Grid>
        <Row>
          <Cell
            marginY={majorScale(3)}
            paddingY={majorScale(2)}
            elevation={0}
            background={'white'}
            columns={12}
            justifyContent={'center'}
          >
            <Heading size={900} is={'h1'} textAlign={'center'}>
              {name}
            </Heading>
          </Cell>
        </Row>
        <Row>
          {subcategories.map(subcategory => (
            <div key={subcategory}>
              <button onClick={this.handleFilter}>{subcategory}</button>
            </div>
          ))}
        </Row>
        <Row>
          {quizzes
            .filter(quiz => {
              return quiz.subcategory.indexOf(parsed.filter || '') >= 0;
            })
            .map((quiz, index) => {
              let answerResult = 'PENDING';
              if (typeof categoryAnswers !== 'undefined') {
                const answer = categoryAnswers.filter(answer => answer.questionKey === quiz.key);
                answerResult = answer.length === 0 ? 'PENDING' : answer[0].result;
              }
              const { border, background } = colors[answerResult];
              console.log(categoryAnswers);
              console.log(colors[answerResult]);
              return (
                <Cell
                  style={{ border: `2px solid ${border}` }}
                  background={background}
                  borderRadius={majorScale(2)}
                  height={250}
                  hoverElevation={3}
                  columns={4}
                  key={index}
                >
                  <Link
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    to={`/${category.category}/${quiz.key}`}
                  >
                    <Heading style={{ textAlign: 'center' }} size={700}>
                      {quiz.title}
                    </Heading>
                  </Link>
                </Cell>
              );
            })}
        </Row>
      </Grid>
    );
  }
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    maximumDifficulty: PropTypes.number.isRequired,
    minimumDifficulty: PropTypes.number.isRequired,
    quizzes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        categories: PropTypes.array.isRequired,
      }),
    ),
  }).isRequired,
  categoryAnswers: PropTypes.array,
};

export default Category;
