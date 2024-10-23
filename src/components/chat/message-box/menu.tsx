import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Menu } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  isServerMessage: boolean;
  onDownloadFile?: () => void;
  onClose: () => void;
};

export const MessageBoxMenu = ({ anchorEl, open, onClose, isServerMessage, onDownloadFile }: Props) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuList
        sx={{
          outline: 'none',
          '&.MuiList-root': { padding: 0 },
        }}
      >
        {isServerMessage && (
          <MenuItem>
            <ListItemIcon>
              <FolderOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <ModeEditOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        {onDownloadFile && (
          <MenuItem onClick={onDownloadFile}>
            <ListItemIcon>
              <FileDownloadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Download</ListItemText>
          </MenuItem>
        )}
        {!isServerMessage && (
          <MenuItem>
            <ListItemIcon>
              <FileUploadOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Publish</ListItemText>
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Remove</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
