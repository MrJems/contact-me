/** @jsxImportSource @emotion/react */
import { Button } from '@mui/material'

const CustomButton = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      type={type}
      fullWidth
      sx={{
        marginTop: '1rem',
        textTransform: 'none',  // avoid uppercase if preferred
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton
