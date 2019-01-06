import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'evergreen-ui';

function QuestionNav({ category, currentIndex, quizzes }) {
  return (
    <React.Fragment>
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${category}`}>
        <Button marginRight={12} iconBefore="manual">
          Category
        </Button>
      </Link>
      {currentIndex > 0 && (
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={`/${category}/${quizzes[currentIndex - 1].key}`}
        >
          <Button appearance="minimal" marginRight={12} iconBefore="arrow-left">
            Previous
          </Button>
        </Link>
      )}
      {currentIndex < quizzes.length - 1 && (
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={`/${category}/${quizzes[currentIndex + 1].key}`}
        >
          <Button appearance="primary" marginRight={12} iconBefore="arrow-right">
            Next
          </Button>
        </Link>
      )}
    </React.Fragment>
  );
}

QuestionNav.propTypes = {
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
};

export default QuestionNav;
