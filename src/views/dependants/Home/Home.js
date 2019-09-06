import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Image } from 'components';

export const Home = () => {

  return (<Grid container>
    <Grid item xs={12}>
      <Image src={'https://upload.wikimedia.org/wikipedia/commons/8/88/Mini-Robot.png'} />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h5" align="center">
        Welcome to React Boiler Plate
      </Typography>
      <Typography variant="body2" align="center" >
        This boilerplate is made possible using <a href='https://material-ui.com/' rel="noopener noreferrer" target="_blank">Material-UI</a>
      </Typography>
    </Grid>
  </Grid>);
};
