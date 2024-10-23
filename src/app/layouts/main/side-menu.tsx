import { ReactNode } from 'react';

// import HistoryIcon from '@mui/icons-material/History';
// import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  // Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Theme,
  Toolbar,
} from '@mui/material';
// import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';

import { useUiStore } from '@/app/stores/ui';

const drawerWidth = 360;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(11),
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

type MenuItemType = {
  label: string;
  icon: ReactNode;
  mini?: boolean;
  route?: string;
  handler?: () => void;
};

// const MAIN_MENU: MenuItemType[] = [
//   {
//     label: 'Review History',
//     icon: <HistoryIcon />,
//     mini: true,
//   },
// ];
const BOTTOM_MENU: MenuItemType[] = [
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    route: '/settings',
    mini: true,
  },
];

const MenuList = ({ open, items }: { open: boolean; items: MenuItemType[] }) => {
  const listItems = items
    .filter((item) => open || (!open && item.mini))
    .map((item) => {
      const listItemButton = (
        <ListItemButton>
          <ListItemIcon sx={{ color: 'var(--black)' }}>{item.icon}</ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary={item.label} />
        </ListItemButton>
      );

      const listComponent = item.route ? (
        <Link key={item.label} to={item.route} className="w-full">
          {listItemButton}
        </Link>
      ) : (
        listItemButton
      );

      return <ListItem key={item.label}>{listComponent}</ListItem>;
    });

  return <List>{listItems}</List>;
};

export const SideMenu = () => {
  const { isDrawerOpen } = useUiStore();

  return (
    <Drawer variant="permanent" open={isDrawerOpen} PaperProps={{ sx: { backgroundColor: 'var(--dxc-white)' } }}>
      <Toolbar />
      <Box
        sx={{
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* <MenuList open={isDrawerOpen} items={MAIN_MENU} />

          {isDrawerOpen && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          )} */}

          {/* <Divider /> */}
        </div>
        <div>
          <MenuList open={isDrawerOpen} items={BOTTOM_MENU} />
        </div>
      </Box>
    </Drawer>
  );
};

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   border: '1px solid black',
//   borderRadius: theme.shape.borderRadius,
//   marginBottom: theme.spacing(2),
//   marginLeft: theme.spacing(2),
//   marginRight: theme.spacing(2),
//   width: 'auto',
//   overflow: 'hidden',
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: 'auto',
//   },
// }));
