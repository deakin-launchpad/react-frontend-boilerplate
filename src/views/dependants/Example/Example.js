import React, { useState } from 'react';
import { Grid, Container, Typography, Button, Card, CardContent, CardActions, makeStyles } from '@material-ui/core';
import { EnhancedEditor } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}))

export const Example = () => {
  const classes = useStyles();
  const [contentStorage, setContentStorage] = useState('');
  let content = (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems='center'>
        <Grid item xs={6}>
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
      </Grid>
    </div>);
  return content;
};
