import React from 'react';
import PropTypes from 'prop-types';
import Pane from 'evergreen-ui/esm/layers/src/Pane';
import { majorScale } from 'evergreen-ui';

/**
 *
 * @description Occupies one row inside a Grid
 * @returns {*}
 * @constructor
 */
const Row = props => {
  return (
    <Pane
      gridColumn={'1/13'}
      display={'grid'}
      gridTemplateColumns={'repeat(12, 1fr)'}
      gridTemplateRows={'auto'}
      gridColumnGap={majorScale(2)}
      gridRowGap={majorScale(2)}
    >
      {props.children}
    </Pane>
  );
};

Row.propTypes = {};

export default Row;
