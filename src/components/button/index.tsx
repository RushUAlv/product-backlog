import { ReactElement } from 'react';

import MuiButton, { ButtonProps } from '@mui/material/Button';

export const Button = (props: ButtonProps): ReactElement => {
  return <MuiButton {...props} />;
};
