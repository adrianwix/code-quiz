import { majorScale, Pane } from 'evergreen-ui';
import React from 'react';

/**
 *
 * @description Create a Grid layout of 12 Columns
 * @param props
 * @returns {*}
 * @constructor
 */
const Grid = props => (
  <Pane
    margin={majorScale(2)}
    display={'grid'}
    gridTemplateColumns={'1fr'}
    gridTemplateRows={'auto'}
    gridRowGap={majorScale(2)}
  >
    {props.children}
  </Pane>
);

export default Grid;
