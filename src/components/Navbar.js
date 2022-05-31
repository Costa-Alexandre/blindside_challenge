import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useTheme } from '@mui/styles';
import { ReactComponent as Logo } from '../assets/Logotype_White_Web.svg';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { displayName, email, photoURL } = currentUser;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  let navigate = useNavigate();
  const {
    palette: { primary, secondary },
  } = useTheme();

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

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <AppBar position="absolute" sx={{ bgcolor: primary.dark }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SvgIcon
            component={Logo}
            inheritViewBox
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 60,
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
              <MenuItem onClick={navigateHome}>
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
              onClick={navigateHome}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Blindside Library
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={displayName}
                  src={photoURL}
                  sx={{ width: 56, height: 56 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                style: {
                  backgroundColor: '#32323b',
                  color: 'white',
                },
              }}
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
                  subheaderTypographyProps={{
                    color: secondary.main,
                  }}
                  avatar={
                    <Avatar
                      alt={displayName}
                      src={photoURL}
                      sx={{ width: 56, height: 56 }}
                    />
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
  );
}

export default Navbar;
