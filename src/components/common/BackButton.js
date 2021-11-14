import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Link, IconButton, useMediaQuery } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';


export var historyGoback = () => { };

export const BackButton = (props) => {
  const matches = useMediaQuery('(max-width:335px)');
  let history = useHistory();
  useEffect(() => { historyGoback = history.goBack; }, [history]);
  return (
    <Link id="backBUTTON" onClick={() => {
      if (!(props.disableHistoryBack))
        history.goBack();
      if (props.onClick instanceof Function)
        props.onClick();
    }}>
      <IconButton
        size={matches ? 'small' : 'medium'}
        style={{ padding: 0, color: props?.color ?? 'white' }}
      >
        <ArrowBack />
      </IconButton>
    </Link>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func,
  disableHistoryBack: PropTypes.bool,
  color: PropTypes.string
};