// import { MouseEvent, useState } from 'react';

import { Avatar } from '@mui/material';

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { Link } from '@tanstack/react-router';

function stringToColor(str: string) {
  let hash = 0;
  let i;

  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(fullName: string) {
  const [name, surname] = fullName.split(' ');

  const nameLetter = name[0];
  const surnameLetter = surname ? surname[0] : '';

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 42,
      height: 42,
      cursor: 'pointer',
    },
    children: `${nameLetter}${surnameLetter}`,
  };
}

export const UserProfile = () => {
  // const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: MouseEvent<HTMLDivElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      <Avatar
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        {...stringAvatar('User Admin')}
        // onClick={handleClick}
      />

      {/* <Menu
        id="user-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-profile',
        }}
      >
        <Link to="/settings">
          <MenuItem onClick={handleClose}>Settings</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> */}
    </>
  );
};
