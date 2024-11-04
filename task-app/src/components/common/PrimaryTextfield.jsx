import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function PrimaryTextfield({ label, value, onChange , helperText}) {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      helperText={helperText}
      sx={{ mb:'0.625rem' }}
    />
  );
}
