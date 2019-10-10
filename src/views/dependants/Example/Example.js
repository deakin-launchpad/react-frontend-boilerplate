import React, { useState } from 'react';
import { Grid, Typography, Button, Card, CardContent, CardActions, makeStyles } from '@material-ui/core';
import { EnhancedEditor, EnhancedDrawer } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}))

export const Example = () => {
  const classes = useStyles();
  const [contentStorage, setContentStorage] = useState('');
  const [drawerContent] = useState(<p>Example Content</p>);
  const [bottomDrawerStatus, setBottomDrawerStatus] = useState(false);
  let content = (
    <div className={classes.root}>
      <Grid container spacing={1} justify='flex-start' alignItems='flex-start'>
        <Grid item xs={5}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Text Editor Example</Typography>
              <EnhancedEditor id={'textEditor'} getContent={(content) => setContentStorage(content)} />
            </CardContent>
            <CardActions>
              <Button variant="outlined" onClick={() => console.log(contentStorage)}>Console Data</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Bottom Drawer Example
              </Typography>
              <EnhancedDrawer
                anchor={'bottom'}
                title='Example Drawer'
                content={drawerContent}
                isOpen={bottomDrawerStatus}
                onClose={() => { setBottomDrawerStatus(false); }} />
            </CardContent>
            <CardActions>
              <Button variant='outlined' onClick={() => { bottomDrawerStatus ? setBottomDrawerStatus(false) : setBottomDrawerStatus(true); }} >
                Toggle BottomDrawer
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>);
  return content;
};
