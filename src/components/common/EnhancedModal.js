import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
/**
 * Params to send are as follows:
 * @isOpen : type<Boolean> : toggles the Modal
 * @dialogTitle : type<String> : Title for the modal
 * @dialogContent : type<Node/Component> : Component to be displayed as component
 * @submitButtonName : type<String> : Custom name for the submit button
 * @cancelButtonName : type<String> : Custom name for cancel button
 * @onClose : type<function> : function to perform onClose
 * @onSubmit : type<function> : function to perfrom onSubmit
 */

export const EnhancedModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_DialogTitle, _setDialogTitle] = useState('');
  const [_DialogContent, _setDialogContent] = useState('');
  const [submitButtonName, setSubmitButtonName] = useState('Submit');
  const [cancelButtonName, setCancelButtonName] = useState('Cancel');

  useEffect(() => {
    if (props.isOpen) {
      setIsOpen(true)
    } else if (props.isOpen) {
      setIsOpen(false)
    }
  }, [props.isOpen])

  useEffect(() => {
    if (props.dialogTitle)
      _setDialogTitle(props.dialogTitle)
    if (props.dialogContent)
      _setDialogContent(props.dialogContent)
    if (props.submitButtonName)
      setSubmitButtonName(props.submitButtonName)
    if (props.cancelButtonName)
      setCancelButtonName(props.cancelButtonName)

  }, [props]);

  const onClose = () => {
    setIsOpen(false)
    if (props.onClose !== undefined) {
      props.onClose()
    }
  }

  const onSubmit = () => {
    setIsOpen(false)
    if (props.onClose !== undefined) {
      props.onSubmit()
    }
  }

  let content = (
    <Dialog fullWidth={true} open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title"  >
      <DialogTitle id="form-dialog-title">{_DialogTitle}</DialogTitle>
      <DialogContent>{_DialogContent}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSubmit} color="primary">{submitButtonName}</Button>
        <Button variant="contained" onClick={onClose} color="secondary">{cancelButtonName}</Button>
      </DialogActions>
    </Dialog>
  );
  return content;
}
