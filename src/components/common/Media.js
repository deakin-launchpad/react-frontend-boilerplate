
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  responsiveImage: {
    height: 'auto',
    maxWidth: '100%'
  }
}));

export const Image = (props) => {
  const classes = useStyles();
  return (<img style={props.style !== undefined ? props.style instanceof Object ? props.style : {} : {}} className={classes.responsiveImage} src={props.src} alt={props.alt !== undefined ? props.alt : String(props.src)} />);
};
Image.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  alt: PropTypes.string
};
