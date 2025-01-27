import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthBox from '../components/ui/AuthBox';
import CustomInput from '../components/ui/CustomInput';
import CustomButton from '../components/ui/CustomButton';
import { loginUser } from '../features/user/userSlice';
import { Typography, CircularProgress, Link, Grid } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout'
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then((res) => {
        // login success
        console.log('Logged in user:', res);
        // possibly redirect to a dashboard or home page
      })  
      .then(() => {
        navigate('/'); // or whichever page
      })
      .catch((err) => {
        // handle error in UI or console
        console.error('Login error:', err);
      });
  };

  return (
    <AuthLayout>
      <AuthBox>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <CustomInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && (
            <Typography color="error" variant="body2">
              {typeof error === 'object' ? error.message : "sonething went wrong"}
            </Typography>
          )}

          <CustomButton type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </CustomButton>
        </form>
         <Grid container justifyContent="space-between" sx={{ marginTop: '1rem' }}>
                  <Grid item>
                    <Link component={RouterLink} to="/" variant="body2">
                      Go back to Home
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/register" variant="body2">
                    Don&apos;t have an account? Create one
                    </Link>
                  </Grid>
                </Grid>
      
        </AuthBox>
      </AuthLayout>
    );
};

export default LoginPage;
