
import { Box,Grid, Container,Card ,CardContent,Typography,CardActions,Button} from '@mui/material';
import { LayoutConfig } from '../../constants';
import { EnhancedDataGrid,EnhancedEditor } from '../../components';
import { useState } from 'react';

const rows = [
  { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { _id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { _id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { _id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { _id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { _id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { _id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { _id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { _id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { _id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const editItem = (item)=>{
  console.log(item);
};

export const Example = () => {
  const [contentStorage, setContentStorage] = useState('');

  return (<Box sx={LayoutConfig.defaultContainerSX}>
    <Container
      maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <EnhancedDataGrid 
            title={'Table Example'} 
            isToolBarOn={true} 
            dataRow={rows} 
            pageSize={8}
            rowsPerPageOptions={[5]}
            actions={[
              {buttonName:'Edit',function:editItem},
              {buttonName:'View',function:editItem}
            ]}
            ignoreKeys={['age']} 
          >
          </EnhancedDataGrid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{mt:5}}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">Text Editor Example</Typography>
                <EnhancedEditor id={'textEditor'} onEditorChange={(newValue) => setContentStorage(newValue)} />
              </CardContent>
              <CardActions>
                <Button variant="outlined" onClick={() => console.log(contentStorage)}>Console Data</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>);
};
