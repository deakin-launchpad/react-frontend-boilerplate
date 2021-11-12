
import PropTypes from 'prop-types';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%'
  }
}));
export const LoadingScreen = (props) => {
  let classes = useStyles();
  return (<Grid style={{
    height: '100vh',
    width: '100%',
    margin: 'auto auto'
  }} container spacing={0} direction={'column'} justifyContent="center" alignItems="center" className={classes.root}>
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
