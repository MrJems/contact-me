/** @jsxImportSource @emotion/react */
import { TextField } from '@mui/material'

const CustomInput = ({
  label,
  type='text',
  value,
  onChange,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      margin="normal"
      {...props}
    />
  )
}

export default CustomInput
