import React from 'react'
import { Box } from '@mui/material'

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      {children}
    </Box>
  )
}

export default AuthLayout
