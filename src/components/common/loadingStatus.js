
import PropTypes from 'prop-types';
import { CircularProgress, Grid, Typography } from '@mui/material';

export const Loading = (props) => {
  return (<Grid style={{
    height: '100vh',
    width: '100%',
    margin: 'auto auto'
  }} container spacing={0} direction={'column'} justifyContent="center" alignItems="center">
    < Grid item>
      <CircularProgress disableShrink />
    </Grid>
    {props.loadingText !== undefined ?
      < Grid item>
        <Typography variant="body1">
          {props.loadingText}
        </Typography>
      </ Grid> : null}
  </Grid >);
};

Loading.propTypes = {
  loadingText: PropTypes.string
};
