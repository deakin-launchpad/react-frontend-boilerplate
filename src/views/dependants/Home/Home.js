import { useState, useEffect, useCallback } from 'react';
import { Container, Typography,Box } from '@mui/material';
import { LayoutConfig } from 'constants/index';
import { API } from 'helpers';
import { EnhancedTable, notify } from 'components/index';
import { useIsMountedRef } from '../../../helpers/hooks/index';


export const Home = () => {
  const [merchants, setMerchants] = useState([]);

  const isMounted = useIsMountedRef();

  const getMerchants = useCallback(async () => {
    try {
      const response = await API.getMerchants();
      if (response.success) {
        console.log(response.data.data);
        if (isMounted) setMerchants(response.data.data);
      }
      else {
        setMerchants([]);
        notify('Failed to Fetch Merchants List');
      }
    } catch (err) {
      setMerchants([]);
      notify('Failed to Fetch Merchants List');
    }

  }, [isMounted]);

  useEffect(() => {
    getMerchants();
  }, [getMerchants]);

  async function verifyMerchant(verify,merchantId){
    const data = {
      "merchantId" : merchantId,
      "verify" : verify
    };
    try {
      const response = await API.verivyMerchants(data);
      console.log(response);
      if (response.success) {
        console.log(response.data.data);
      }
      else {
        notify('Failed to Fetch Merchants List');
      }
    } catch (err) {
      console.log(err);
      notify('Failed to Fetch Merchants List');
    }
    getMerchants();
  }

  return (<Box sx={LayoutConfig.defaultContainerSX}>
    <Container
      style={{
        margin: 'auto auto'
      }}
      maxWidth="md"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        px: {
          md: '130px !important'
        }
      }}
    >
      <Typography
        color="primary"
        variant="overline"
      >
        Welcome to
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="h3"
      >
        React Frontend Boilerplate
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        variant="body1"
        sx={{ py: 3 }}
      >
        To explore more visit the examples tab on the left.
      </Typography>

      <EnhancedTable data={merchants} title="Merchants" options={{ ignoreKeys: ['_id'],actions: [{name: 'Action', label: 'Verify', type:'button', function: (e, data) => { verifyMerchant(!data.isVerified,data._id); }}], }} />
       
    </Container>
  </Box>);
};
