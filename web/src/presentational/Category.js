import React from 'react';
import * as PropTypes from 'prop-types';
import Grid from './Shared/Grid';
import Row from './Shared/Row';
import Cell from './Shared/Cell';
import { Heading, majorScale } from 'evergreen-ui';
import { Link } from 'react-static';
import queryString from 'query-string';

console.log('queryString', queryString);

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
 * @param name
 * @param category
 * @param javascriptResults
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
    const { name, category, javascriptResults, history } = this.props;
    const { quizzes, subcategories } = category;
    const parsed = queryString.parse(history.location.search);
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
            .filter(q => {
              return q.subcategory.indexOf(parsed.filter || '') >= 0;
            })
            .map((q, index) => {
              const { border, background } = colors[javascriptResults[q.key]];
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
                    to={`/${category.category}/${q.key}`}
                  >
                    <Heading size={700}>{q.title}</Heading>
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
};

export default Category;
