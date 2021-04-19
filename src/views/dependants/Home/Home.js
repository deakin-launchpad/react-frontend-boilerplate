import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Image } from 'components';
import { LayoutConfig } from 'constants/index';
export const Home = () => {
  return (<Grid container justifyContent='flex-start' direction='column' alignItems='center' sx={LayoutConfig.defaultContainerSX}>
    <Grid item xs={12} xl={2} lg={4} md={6} sm={8}>
      <Image src={'https://upload.wikimedia.org/wikipedia/commons/8/88/Mini-Robot.png'} />
    </Grid>
    <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
      <Typography color="secondary" variant="h5" align="center">
        Welcome to React Boiler Plate
      </Typography> 
    </Grid>
  </Grid>);
};
