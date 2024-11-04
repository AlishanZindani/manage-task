import * as React from 'react';
import Button from '@mui/material/Button';

const PrimaryButton = ({children, sx, onClick}) => {
  return <Button sx={sx} onClick={onClick} variant="contained">{children}</Button>;
};

export default React.memo(PrimaryButton);
