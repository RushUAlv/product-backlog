import Dropzone, { DropzoneProps } from 'react-dropzone';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

type Props = {
  supportedFormats?: string[];
  maxFileSize?: number;
} & DropzoneProps;

export const FileUploader = ({ supportedFormats, maxFileSize, ...props }: Props) => {
  return (
    <div className="w-full">
      <Dropzone {...props}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({
              className:
                'flex flex-col items-center bg-transparent hover:bg-white cursor-pointer transition-[border] duration-[0.24s] ease-[ease-in-out] p-32 rounded-lg border border-[--dusty-grey] hover:border-[--dxc-purple] border-dashed',
            })}
          >
            <input {...getInputProps()} />
            <CloudUploadOutlinedIcon sx={{ color: 'var(--dusty-grey)' }} fontSize="large" />
            <p className="my-2 text-3xl text-[var(--shuttle-grey)]">Upload a file to get started</p>
            <p className="text-lg text-[var(--dusty-grey)]">
              Drag-and-drop your file for analysis or <span className="text-[var(--picton-blue)] underline">Open</span>
            </p>
          </div>
        )}
      </Dropzone>

      {(supportedFormats || maxFileSize) && (
        <div className="flex justify-between text-[var(--dusty-grey)] mt-2">
          {supportedFormats && <div>Supported formats: {supportedFormats.join(', ')}</div>}
          {maxFileSize && <div>Maximum size: {maxFileSize}MB</div>}
        </div>
      )}
    </div>
  );
};
