import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';

const Cell = ({ columns = 12, background = 'tint2', elevation = 1, ...props }) => {
  return (
    <Pane
      elevation={elevation}
      background={background}
      gridColumnEnd={`span ${columns}`}
      {...props}
    >
      {props.children}
    </Pane>
  );
};

Cell.propTypes = {
  columns: PropTypes.number,
};

export default Cell;
