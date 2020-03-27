import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Image } from 'components';
export const Home = () => {
  return (<Grid container justify='flex-start' direction='column' alignItems='center'>
    <Grid item xs={12} xl={2} lg={4} md={6} sm={8}>
      <Image src={'https://upload.wikimedia.org/wikipedia/commons/8/88/Mini-Robot.png'} />
    </Grid>
    <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
      <Typography variant="h5" align="center">
        Welcome to React Boiler Plate
      </Typography>
      <Typography variant="body2" align="center" >
        This boilerplate is made possible using <a href='https://material-ui.com/' rel="noopener noreferrer" target="_blank">Material-UI</a>
      </Typography>
      <Typography variant="body2" align="center" >
        Try typing pikachu, ufo, homer, fly, spongebob, <a href='https://codepen.io/WeiChiaChang/full/xLQVXm?editors=1100' rel="noopener noreferrer" target="_blank">etc.</a>
      </Typography>
    </Grid>
  </Grid>);
};
