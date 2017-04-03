import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';

export default (props) => {
  const bsStyle = "success";
  return (
      <Button bsStyle={bsStyle} onClick={props.handleClick}>
        <Glyphicon glyph="arrow-up" />
      </Button>
  );
};
