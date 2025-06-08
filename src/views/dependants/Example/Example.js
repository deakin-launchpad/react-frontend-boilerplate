import { useState } from 'react';
import { Grid, Typography, Button, Card, CardContent, CardActions, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EnhancedEditor, EnhancedDrawer, EnhancedModal } from 'components';
import { useGeoLocation } from 'helpers';
import { EnhancedTable } from 'components/index';
import { LayoutConfig } from 'constants/index';

const RootBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const Example = () => {
  const [contentStorage, setContentStorage] = useState('');
  const [drawerContent] = useState(<p>Example Content</p>);
  const [bottomDrawerStatus, setBottomDrawerStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  let [location] = useGeoLocation();
  let content = (
    <RootBox sx={LayoutConfig.defaultContainerSX}>
      <Grid container spacing={1} justifyContent='flex-start' alignItems='flex-start'>
        <Grid xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">Text Editor Example</Typography>
              <EnhancedEditor id={'textEditor'} onEditorChange={(newValue) => setContentStorage(newValue)} />
            </CardContent>
            <CardActions>
              <Button variant="outlined" onClick={() => console.log(contentStorage)}>Console Data</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
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
        <Grid xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Enhanced Modal Example
              </Typography>
              <EnhancedModal
                dialogTitle='Example Modal'
                dialogContent={drawerContent}
                isOpen={modalStatus}
                onSubmit={() => { setModalStatus(false); }}
                onClose={() => { setModalStatus(false); }}
                options={{
                  swapButtonColors: false
                }}
              />
            </CardContent>
            <CardActions>
              <Button variant='outlined' onClick={() => { modalStatus ? setModalStatus(false) : setModalStatus(true); }} >
                Toggle Enhanced Modal
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                useLocation Example
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='outlined' onClick={() => { console.log(location); }} >
                Console Current Location
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <EnhancedTable data={[{
            Name: 'DeadPool',
            Age: 5
          }, {
            Name: 'Logan',
            Age: 10
          }]} />
        </Grid>
      </Grid>
    </RootBox>);
  return content;
};
