
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  content: {
    display: 'contents'
  }
}));

export const HeaderElements = (props) => {
  const classes = useStyles();
  return (<div className={classes.content}>{props.children}</div>);
};
HeaderElements.propTypes = {
  children: PropTypes.node.isRequired
};
