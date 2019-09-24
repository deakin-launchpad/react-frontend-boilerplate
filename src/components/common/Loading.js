import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%'
  }
}));
export const LoadingScreen = (props) => {
  let classes = useStyles();
  return (<Grid container spacing={0} direction={'column'} justify="center" alignItems="center" className={classes.root}>
    < Grid item className={classes.loadingCircle}>
      <CircularProgress disableShrink />
    </Grid>
    {props.loadingText !== undefined ?
      < Grid item className={classes.loadingText}>
        <Typography variant="body1">
          {props.loadingText}
        </Typography>
      </ Grid> : null}
  </Grid >);
};

LoadingScreen.propTypes = {
  loadingText: PropTypes.string
};
