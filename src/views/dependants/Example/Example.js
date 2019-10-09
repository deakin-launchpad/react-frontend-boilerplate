import React, { useState } from 'react';
import { Grid, Container, Typography, Button, Card, CardContent, CardActions, makeStyles } from '@material-ui/core';
import { EnhancedEditor } from 'components';

const useStyles = makeStyles({
  root: {
    marginTop: '2vh'
  }
})

export const Example = () => {
  const classes = useStyles();
  const [contentStorage, setContentStorage] = useState('');
  let content = (
    <Container className={classes.root}>
      <Grid container alignItems='center'>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Text Editor Example</Typography>
              <EnhancedEditor id={'textEditor'} getContent={(content) => setContentStorage(content)} options={{ menuBar: false }} />
            </CardContent>
            <CardActions>
              <Button variant="outlined" onClick={() => console.log(contentStorage)}>Console Data</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>);
  return content;
};
