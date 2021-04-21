import React from 'react';
import { Button } from '@material-ui/core';
import { APIKeys } from 'constants/index';

export const SsoLogin = () => {
  return <Button component={'a'} href={APIKeys.jwt.url} color="primary"
    fullWidth
    size="large"
    variant="contained"
  >Login With Deakin</Button>;
};