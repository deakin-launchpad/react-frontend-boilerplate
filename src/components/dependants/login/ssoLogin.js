import React from 'react';
import { Button } from '@material-ui/core';
import { APIKeys } from 'constants/index';

export const SsoLogin = () => {
  return <Button component={'a'}
    href={APIKeys.jwt.url}
    style={{
      backgroundColor: 'rgb(0, 125, 155)'
    }}
    fullWidth
    size="large"
    variant="contained"
  >Login With Deakin</Button>;
};