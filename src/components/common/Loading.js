
import PropTypes from 'prop-types';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Grid)(() => ({
  height: '100vh',
  width: '100%',
  margin: 'auto auto'
}));

export const LoadingScreen = (props) => {
  return (<Root container spacing={0} direction={'column'} justifyContent="center" alignItems="center" >
    <CircularProgress disableShrink />
    {props.loadingText !== undefined ?
      <Typography variant="body1">
        {props.loadingText}
      </Typography> : null}
  </Root >);
};

LoadingScreen.propTypes = {
  loadingText: PropTypes.string
};
