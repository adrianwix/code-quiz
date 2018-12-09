import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';

const Cell = ({ columns = 12, background = 'tint2', elevation = 1, offset = 0, ...props }) => {
  return (
    <Pane
      elevation={elevation}
      background={background}
      gridColumnStart={offset}
      gridColumnEnd={`span ${columns}`}
      {...props}
    >
      {props.children}
    </Pane>
  );
};

Cell.propTypes = {
  columns: PropTypes.number,
  background: PropTypes.string,
  elevation: PropTypes.number,
  offset: PropTypes.number,
};

export default Cell;
