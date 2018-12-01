import React from 'react';
import { withRouteData, Link } from 'react-static';
//

const Category = ({ name, quizzes, category }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{name}</h1>
      <ul>
        {quizzes.map(q => (
          <li>
            <Link to={`/${category.category}/${q.key}`}>{q.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouteData(Category);
