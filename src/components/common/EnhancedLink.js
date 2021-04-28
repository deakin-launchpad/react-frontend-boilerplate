
import React from 'react';
import { Link as MaterialLink } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';

export const Link = (props) => {
  return (<MaterialLink
    to={props.to}
    className={props.className}
    style={props.style}
    component={RouterLink} >{props.children}</MaterialLink>);
};
Link.propTypes = {
  to: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};