import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/user/userSlice'
import AuthBox from '../components/ui/AuthBox'
import CustomInput from '../components/ui/CustomInput'
import CustomButton from '../components/ui/CustomButton'
import { Typography, CircularProgress, Link, Grid } from '@mui/material'
import AuthLayout from '../layouts/AuthLayout'
import {  Link as RouterLink, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formData))
      .unwrap()
      .then((res) => {
        console.log('Registered user:', res)
      })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.error('Register error:', err)
      })
  }

  return (
    <AuthLayout>
      <AuthBox>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <CustomInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
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
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </CustomButton>
        </form>
        <Grid container justifyContent="space-between" sx={{ marginTop: '1rem' }}>
          <Grid item>
            <Link component={RouterLink} to="/" variant="body2">
              Go back to Home
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </AuthBox>
      </AuthLayout> 
  )
}

export default RegisterPage
