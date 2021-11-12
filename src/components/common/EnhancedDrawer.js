import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SwipeableDrawer, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const EnhancedDrawer = (props) => {
  const [drawerHeight, setDrawerHeight] = useState('50vh');
  const [drawerWidth, setDrawerWidth] = useState('50vh');
  const [drawerMargin, setDrawerMargin] = useState(null);
  const useStyles = makeStyles(theme => ({
    container: {
      height: drawerHeight,
      width: drawerWidth,
      margin: drawerMargin !== null ? drawerMargin : theme.spacing(2)
    },
    title: {
    }
  }));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('DrawerTitle');
  const [drawerContent, setDrawerContent] = useState(<p>Please pass content for the drawer</p>);
  const [anchor, setAnchor] = useState('bottom');
  const [drawerElevation, setDrawerElevation] = useState(16);
  useEffect(() => {
    if (props.title)
      setTitle(props.title);
    if (props.content)
      setDrawerContent(props.content);
    if (props.isOpen !== undefined)
      setIsOpen(props.isOpen);
    if (props.anchor)
      setAnchor(props.anchor);
    if (props.options) {
      if (props.options.height)
        setDrawerHeight(props.options.height);
      if (props.options.width)
        setDrawerWidth(props.options.width);
      if (props.options.margin)
        setDrawerMargin(props.options.margin);
      if (props.options.elevation !== undefined && props.options.elevation !== null)
        setDrawerElevation(props.options.elevation);
    }
  }, [props]);
  let drawer = (<SwipeableDrawer
    elevation={drawerElevation}
    anchor={anchor}
    disableBackdropTransition={!iOS} disableDiscovery={iOS}
    open={isOpen}
    onOpen={() => {
      setIsOpen(false);
      if (props.onOpen)
        if (typeof props.onOpen === 'function')
          props.onOpen();
    }}
    onClose={() => {
      setIsOpen(false);
      if (props.onClose)
        if (typeof props.onClose === 'function')
          props.onClose();
    }}
  >
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant={'h5'} component={'h5'} >{title}</Typography>
      </div>
      <div className={classes.content}>
        {drawerContent}
      </div>
    </div>
  </SwipeableDrawer >);
  return drawer;
};

EnhancedDrawer.propTypes = {
  content: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  anchor: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  title: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  options: PropTypes.shape({
    height: PropTypes.string,
    width: PropTypes.string,
    margin: PropTypes.string,
    elevation: PropTypes.number
  })
};
