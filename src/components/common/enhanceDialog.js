import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EnhanceDialog(props) {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={'md'}
        disableEnforceFocus={true}
        disableAutoFocus={ true}
      >
        <DialogTitle  style={{width:500}}>{props.title}</DialogTitle>
        <DialogContent dividers>
          {props.contentElement}
        </DialogContent>
        <DialogActions style={{margin:10}}>
          <Button onClick={props.onClose} style={{marginRight:10}}>{props.cancelButtonName ? props.cancelButtonName :'Cancel'}</Button>
          <Button variant='contained' onClick={()=>{
            props.buttonFunc();
            props.onClose();
          }}>{props.submitButtonName ? props.submitButtonName :'Submit'}</Button>
          {props?.bottomButtons}
        </DialogActions>
      </Dialog>
    </div>
  );
}

EnhanceDialog.propTypes= {
  isOpen:PropTypes.bool,
  title: PropTypes.string,
  contentElement: PropTypes.element,
  onClose: PropTypes.onClose,
  buttonFunc:PropTypes.buttonFunc,
  cancelButtonName: PropTypes.string,
  submitButtonName: PropTypes.string,
  bottomButtons: PropTypes.element,
};