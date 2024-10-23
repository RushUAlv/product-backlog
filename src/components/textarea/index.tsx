import { ReactElement } from 'react';

import TextareaAutosize, { TextareaAutosizeProps } from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

const MuiTextarea = styled(TextareaAutosize)(
  () => `
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
`
);

export const Textarea = (props: TextareaAutosizeProps): ReactElement => {
  return <MuiTextarea {...props} />;
};
