
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const Content = styled('div')(() => ({
  display: 'contents'
}));

export const HeaderElements = (props) => {
  return (<Content>{props.children}</Content>);
};
HeaderElements.propTypes = {
  children: PropTypes.node.isRequired
};
