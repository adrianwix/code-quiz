import { Card, Text } from 'evergreen-ui';
import React from 'react';

/**
 *
 * @param {number} colNum x number of <Card> elements returned. Max 12
 * @returns {Array}
 * @constructor
 */
const Cols = ({ colNum }) => {
  let cols = [];
  for (let i = colNum; i >= 1; i--) {
    cols.push(
      <Card background={'tint2'} height={100}>
        <Text>{i}</Text>
      </Card>,
    );
  }
  return cols;
};

export default Cols;
