
import PropTypes from 'prop-types';

export const Image = (props) => {
  return (<img style={props.style !== undefined ? props.style instanceof Object ? props.style : {} : {}} sx={{
    height: 'auto',
    maxWidth: '100%'
  }} src={props.src} alt={props.alt !== undefined ? props.alt : String(props.src)} />);
};
Image.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  alt: PropTypes.string
};
