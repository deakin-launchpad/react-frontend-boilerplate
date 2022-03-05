import {Box, Typography, Card, CardContent, CardActions, Button} from "@mui/material";
import { EnhancedTable, EnhancedModal, EnhancedEditor } from "components/index";
import { useState } from "react";

export const Tutorial = () => {

  const [contentStorage, setContentStorage] = useState('');
  let sampleEditor = (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">Text Editor Example</Typography>
        <EnhancedEditor id={'textEditor'} onEditorChange={(newValue) => setContentStorage(newValue)} />
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={() => console.log(contentStorage)}>Console Data</Button>
      </CardActions>
    </Card>
  );
  const [modalStatus, setModalStatus] = useState(false);
  const dialogContent = useState("Modal opened successfully!");

  let sampleModal = (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          This is a sample Modal.
        </Typography>
        <EnhancedModal
          dialogTitle = "Sample Modal"
          dialogContent = { dialogContent }
          onSubmit = {()=>{
            setModalStatus(false);
          }}
          onClose = {()=>{
            setModalStatus(false);
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          onClick = {()=>{
            modalStatus ? setModalStatus(false) : setModalStatus(true);
          }}>
          Open
        </Button>
      </CardActions>
    </Card>
  );

  let sampleTable = (
    <EnhancedTable
      data = {[
        {
          Name: "Julius Caeser",
          Age: 24,
          Job: "Getting backstabbed"
        },
        {
          Name: "Alexander the great",
          Age: 34,
          Job: "Conquest"
        },
        {
          Name: "Putin",
          Age: 69,
          Job: "Invade"
        }
      ]}
    />
  );

  let content = (
    <Box>
      <Typography gutterBottom variant="h5" component="h2">
            Yo! This is a great tutorial. Thanks XIAORAN.
      </Typography>
      { sampleTable }
      { sampleModal }
      { sampleEditor }
    </Box>
  );

  return content;
};