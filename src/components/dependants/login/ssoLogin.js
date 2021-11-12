import { Button } from '@mui/material';
import { APIKeys } from 'constants/index';

export const SsoLogin = () => {
  return <Button component={'a'}
    href={APIKeys.jwt.url}
    style={{
      backgroundColor: 'rgb(0, 125, 155)'
    }}
    fullWidth
    type='button'
    size="large"
    onClick={(e) => {
      e.stopPropagation();
    }}
    variant="contained"
  >Login With Deakin</Button>;
};