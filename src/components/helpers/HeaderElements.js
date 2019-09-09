import React from 'react';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  content: {
    display: 'contents'
  }
}));

export const HeaderElements = (props) => {
  const classes = useStyles();
  return (<div className={classes.content}>{props.children}</div>);
};
