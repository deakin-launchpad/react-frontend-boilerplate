import React, { useState, useEffect, useCallback } from 'react';
import { API } from 'helpers';
import { EnhancedTable, notify } from 'components/index';
import { useIsMountedRef } from '../../../helpers/hooks/index';
import { Box, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const isMounted = useIsMountedRef();

  const getUsers = useCallback(async () => {
    const response = await API.getUsers();
    if (response.success) {
      if (isMounted) setUsers(response.data.data);
    }
    else {
      // setUsers([]);
      notify('Failed to Fetch Users List');
      history.replace('/error');
    }
  }, [isMounted, history]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  let content = (
    <Box sx={{
      backgroundColor: 'background.default',
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh'
    }} >
      <Container maxWidth="lg" sx={{
        py: {
          xs: '100px',
          sm: window.screen.availHeight / 50
        }
      }}>
        <EnhancedTable users={users} title="Users Manager" />
      </Container>
    </Box>
  );
  return content;
};
