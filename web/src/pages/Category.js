import React from 'react';
import { withRouteData, Link } from 'react-static';
import Grid from '../presentational/Shared/Grid';
import { Card, Heading, majorScale } from 'evergreen-ui';
import Row from '../presentational/Shared/Row';
import Cell from '../presentational/Shared/Cell';
//

const Category = ({ name, quizzes, category }) => {
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
        {quizzes.map((q, index) => (
          <Cell height={250} hoverElevation={3} columns={4} key={index}>
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
              <Heading size={700}>
                <Card>{q.title}</Card>
              </Heading>
            </Link>
          </Cell>
        ))}
      </Row>
    </Grid>
  );
};

export default withRouteData(Category);
