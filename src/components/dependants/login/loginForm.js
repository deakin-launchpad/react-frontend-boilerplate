import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { LoginContext } from 'contexts';
import { ConnectionConfig, DeveloperConfig } from 'constants/index';

export const LoginForm = (props) => {
  const { devMode, setAccessToken } = useContext(LoginContext);

  const formik = useFormik({
    initialValues:
    {
      emailId: '',
      password: '',
    },
    validationSchema: () => {
      if (devMode) return Yup.object().shape({
        emailId: Yup.string().email('Must be a valid Email').max(255),
        password: Yup
          .string()
          .max(255)
      });
      return Yup.object().shape({
        emailId: Yup.string().email('Must be a valid Email').max(255)
          .required('Email is required'),
        password: Yup
          .string().min(6)
          .max(255)
          .required('Password is required')
      });
    },
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (devMode)
        values = {
          emailId: DeveloperConfig.devDetails.user,
          password: DeveloperConfig.devDetails.password
        };
      const response = await props.login(values);
      if (response.success) {
        if (!(props.onSuccess instanceof Function) || !ConnectionConfig.useACL) {
          setAccessToken(response.accessToken);
          setStatus({ success: true });
        } else {
          const response = await props.onSuccess();
          if (response) {
            setAccessToken(response.accessToken);
            setStatus({ success: true });
          }
          else setStatus({ success: false });
        }
        setSubmitting(false);
      } else {
        setStatus({ success: false });
        setSubmitting(false);
      }
    },
  });

  let form = (
    <form noValidate onSubmit={formik.handleSubmit}>
      <TextField

        error={formik.touched.emailId && Boolean(formik.errors.emailId)}
        fullWidth
        helperText={formik.touched.emailId && formik.errors.emailId}
        label="Email Address"
        margin="normal"
        name="emailId"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={devMode ? DeveloperConfig.devDetails.user : formik.values.emailId}
        variant="outlined"
      />
      <TextField
        error={formik.touched.password && Boolean(formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Password"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={devMode ? DeveloperConfig.devDetails.password : formik.values.password}
        variant="outlined"
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          color="primary"
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Log In
        </Button>
      </Box>
    </form>

  );
  return form;
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};