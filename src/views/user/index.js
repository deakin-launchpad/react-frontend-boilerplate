import { useEffect, useCallback ,useState} from 'react';
import { API } from '../../helpers';
import { EnhancedDataGrid, Loading, notify } from '../../components';
import { useIsMountedRef } from '../../helpers/hooks';
import { Box, Container, Typography } from '@mui/material';

export const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const isMounted = useIsMountedRef();

  const getUsers = useCallback(async () => {
    try {
      const response = await API.getUsers();
      if (response?.success) {
        if (isMounted) {
          setUsers(response.data.data);
          setLoading(false);
        }
      }
      else {
        setUsers([]);
        setLoading(false);
        notify('Failed to Fetch Users List');
      }
    } catch (err) {
      setUsers([]);
      setLoading(false);
      notify('Failed to Fetch Users List');
    }
  }, [isMounted]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  let content = (
    <Box sx={{
      backgroundColor: 'background.default',
    }} >
      {loading ? <Loading></Loading> :<Container maxWidth="xl">
        {users?.length > 0 ? <EnhancedDataGrid  title={'Users Manager'} 
          isToolBarOn={true} 
          dataRow={users} 
          pageSize={8}
          rowsPerPageOptions={[5]}
          ignoreKeys={['_id','deakinSSO','firstLogin']} 
        >
        </EnhancedDataGrid> :<Box><Typography>No User Found</Typography></Box>}
        
      </Container>}
    </Box>
  );
  return content;
};