import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import SvgIcon from '@mui/material/SvgIcon';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import profilePlaceholder from '../assets/profile-placeholder.jpg';
import { ReactComponent as Logo } from '../assets/Logotype_White_Web.svg';
import '../styles/Navbar.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { displayName, email, photoURL } = currentUser;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SvgIcon
              component={Logo}
              inheritViewBox
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                width: '130px',
              }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Blindside Library</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <SvgIcon
              component={Logo}
              inheritViewBox
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
                width: '130px',
              }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Blindside Library
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {photoURL ? (
                    <Avatar
                      alt="avatar"
                      src={photoURL ? photoURL : profilePlaceholder}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <Avatar>
                      <FaceRoundedIcon />
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '50px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="displayName">
                  <CardHeader
                    avatar={
                      photoURL ? (
                        <Avatar
                          alt="avatar"
                          src={photoURL ? photoURL : profilePlaceholder}
                          sx={{ width: 56, height: 56 }}
                        />
                      ) : (
                        <Avatar>
                          <FaceRoundedIcon />
                        </Avatar>
                      )
                    }
                    title={displayName}
                    subheader={email}
                  />
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center" width="100%">
                    Log Out
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#32323b',
      darker: '#32323b',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export default Navbar;
