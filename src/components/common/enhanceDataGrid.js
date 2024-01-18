/**
 * Created by Qiaoli Wang.
 */
import { Typography,Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * 
 * @param {Object[]} props.dataRow Accepts data for the table to display.
 * @param {Array} props.ignoreKeys send the keys you want to ignore.
 * @param {Objects[]} props.actions array to set actions per row basis.

* @example <EnhancedDataGrid 
        title={'Example'} 
        isToolBarOn={true} 
        dataRow={rows} 
        pageSize={5}
        rowsPerPageOptions={[5]}
        actions={[
          {buttonName:'Edit',function:editItem},
          {buttonName:'View',function:editItem}
        ]}
        ignoreKeys={['createdAt', 'updatedAt', 'id']}
      >
      </EnhancedDataGrid>
 */

export default function EnhancedDataGrid(props) {
  const [columns, setColumns] = useState([]);

  const arrayDiff = (arrayA, arrayB) => {
    var result = [];
    for (var i = 0; i < arrayA.length; i++) {
      if (arrayB.indexOf(arrayA[i]) <= -1) {
        result.push(arrayA[i]);
      }
    }
    return result;
  };

  useEffect(()=>{
    let rowKeys;
    let originalKeys = Object.keys(props?.dataRow[0]);
    if(props?.ignoreKeys) {
      rowKeys = arrayDiff(originalKeys, props?.ignoreKeys);
    }
    else{
      rowKeys = originalKeys;
    }  

    let columns =rowKeys?.map((key)=>{
      return {
        field: key,
        headerName: key.replaceAll("_", ""),
        description: '',
        sortable: true,
        width: 160,
      };
    });
    if(!props?.actions){
      setColumns(columns);
    }
    else{
      setColumns([...columns,{
        field: "action",
        headerName: "Action",
        sortable: false,
        minWidth:200,
        renderCell: (params) => {
          return props?.actions?.map((action,i)=>{
            return <Box key={i}>
              <Button onClick={(e)=>{
                e.stopPropagation(); 
                action?.function(params?.row);
              }}>{action?.buttonName}</Button>
            </Box>;
          });
        }
      },]);
    }
    
  },[props?.actions, props?.dataRow, props?.ignoreKeys]);

  return (
    <Box sx={{ height: 665, width: '100%'}}>
      <Typography variant='h5' className='table-title'>{props?.title ?? ''}</Typography>  
      {props?.dataRow.length > 0 ?
        <DataGrid
          loading={props?.loading ?? false}
          isCellEditable={() =>props?.isCellEditable ?? false}
          checkboxSelection ={props?.isCheckboxSelection ?? false}
          components={{ Toolbar: props?.isToolBarOn ? GridToolbar : '' }}
          getRowId={(row) => row?._id}
          rows={props?.dataRow}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: props?.pageSize ?? 10,
              },
            },
          }}
          onRowSelectionModelChange={(newSelection)=>{
            props?.onRowSelectionModelChange(newSelection) ?? console.log(newSelection);
          }}
          rowsPerPageOptions={props?.rowsPerPageOptions ?? [5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
        :<Box><Typography>No data</Typography></Box>}
    </Box>
  );
}
EnhancedDataGrid.propTypes ={
  title:PropTypes.string,
  loading:PropTypes.bool,
  isCellEditable:PropTypes.bool,
  isCheckboxSelection:PropTypes.bool,
  isToolBarOn:PropTypes.bool,
  onRowSelectionModelChange:PropTypes.func,
  dataRow:PropTypes.array.isRequired,
  pageSize:PropTypes.number,
  rowsPerPageOptions:PropTypes.array,
  actions:PropTypes.array,
  ignoreKeys:PropTypes.array
};