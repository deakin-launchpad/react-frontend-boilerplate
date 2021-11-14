import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export const ConfirmationDailog = (props) => {
  const { isOpen, setIsOpen } = props;
  const [cancelButtonName, setCancelButtonName] = useState('Cancel');
  const [submitButtonName, setSubmitButtonName] = useState('OK');

  const radioGroupRef = useRef(null);

  useEffect(() => {
    if (props.cancelButtonName) {
      setCancelButtonName(props.cancelButtonName);
    }
    if (props.submitButtonName) {
      setSubmitButtonName(props.submitButtonName);
    }
  }, [props.cancelButtonName, props.submitButtonName]);

  const handleEntering = () => {
    if (radioGroupRef.current !== null) {
      radioGroupRef.current.focus();
    }
  };

  let dailog = (
    <Dialog
      onEntering={handleEntering}
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={isOpen}
    >
      <DialogTitle >{props.title}</DialogTitle>
      <DialogContent>
        {props.message}
      </DialogContent>
      <DialogActions>
        {props.onCancel || props.callBackNo ? <Button variant={props?.cancelColor ? "contained" : ""} style={{ backgroundColor: props?.cancelColor ? props.cancelColor : "", color: props?.cancelColor ? 'black' : "" }} autoFocus onClick={(e) => {
          if (setIsOpen instanceof Function)
            setIsOpen(false);
          if (props.onCancel instanceof Function)
            props.onCancel(e);
        }} color="primary">
          {cancelButtonName}
        </Button> : null}
        <Button variant={props?.submitColor ? "contained" : ""} style={{ backgroundColor: props?.submitColor ? props.submitColor : "", color: props?.cancelColor ? 'black' : "" }} onClick={(e) => {
          if (props.onSubmit instanceof Function)
            props.onSubmit(e);
        }} color="primary">
          {submitButtonName}
        </Button>
      </DialogActions>
    </Dialog >
  );
  return dailog;
};

ConfirmationDailog.propTypes = {
  cancelButtonName: PropTypes.string,
  cancelColor: PropTypes.string,
  submitColor: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};