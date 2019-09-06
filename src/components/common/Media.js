import React from 'react';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  responsiveImage: {
    height: 'auto',
    maxWidth: '100%'
  }
}));

export const Image = (props) => {
  const classes = useStyles();
  return (<img className={classes.responsiveImage} src={props.src} alt={props.alt !== undefined ? props.alt : String(props.src)} />);
};
