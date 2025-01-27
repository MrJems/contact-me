/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box, useTheme } from '@mui/material'

const AuthBox = ({ children }) => {
  const theme = useTheme();

  const styles = {
    container: css`
      max-width: 600px;
      width: 90%;
      margin: 0 auto;
      padding: 2rem;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);

      /* For mobile-first design, you can adjust the styling */
      @media(min-width: 600px) {
        margin-top: 4rem;
      }
    `,
  }

  return (
    <Box css={styles.container}>
      {children}
    </Box>
  )
}

export default AuthBox
