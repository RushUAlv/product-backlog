import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

type Props = {
  files: File[] | string[];
  onDownloadFile?: (fileName: string) => void;
};
type FileContainerProps = {
  file: File | string;
  onDownloadFile?: (filename: string) => void;
};

const defaultLinkColors = 'cursor-pointer';

const FileContainer = ({ file, onDownloadFile }: FileContainerProps) => {
  const isFilename = typeof file === 'string';

  return isFilename ? (
    <div className={`${defaultLinkColors} flex gap-2`} onClick={() => onDownloadFile?.(file)}>
      <InsertDriveFileOutlinedIcon />
      {file}
    </div>
  ) : (
    <a className={`${defaultLinkColors} flex gap-2`} href={URL.createObjectURL(file)} target="_blank">
      <InsertDriveFileOutlinedIcon />
      {file.name}
    </a>
  );
};

export const FileList = ({ files, onDownloadFile }: Props) => {
  const fileItemList = files.map((file: File | string) => {
    const isFilename = typeof file === 'string';
    return <FileContainer key={isFilename ? file : file.name} file={file} onDownloadFile={onDownloadFile} />;
  });

  return <div>{fileItemList}</div>;
};
