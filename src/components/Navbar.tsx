import { AppBar, Toolbar, Typography, Button, Box, List, Divider, ListItem, ListItemText, Drawer, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutSetState } from '../redux/userSlice';
import { useAuth } from '../utils/useAuth';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu } from '@mui/icons-material';

// interface NavbarProps {
//   isLoggedIn?: boolean;
//   username?: string;
// }

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLogin, setIsLogin, user } = useAuth()
  const isLoggedIn = isLogin
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const logout = () => {
    dispatch(logoutSetState())
    localStorage.removeItem('currentUser')
    setIsLogin(false)
    navigate('/login')
  }

  const drawerLinks = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/" selected={location.pathname === '/'} key="home">
          <ListItemText primary="Movie Listing" />
        </ListItem>
        <ListItem button component={Link} to="/favorites" selected={location.pathname === '/favorites'} key="favorites">
          <ListItemText primary="Favorites" />
        </ListItem>
        <Divider />
        {isLoggedIn ? (
          <>
            <ListItem>
              <Typography variant="body1" fontWeight={'Bold'}>
                Welcome, {user[0]?.user?.name}
              </Typography>
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  // console.log(isLoggedIn)

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 100 }}>
        <Toolbar sx={{ maxWidth: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>

          <Typography variant="h6" fontWeight={'Bold'} component="div" sx={{ flexGrow: 1 }}>
            Movies.Cyclopedia
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button component={Link} to="/" color="inherit" variant="text">
              Movie Listing
            </Button>
            <Button component={Link} to="/favorites" color="inherit" variant="text">
              Favorites
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn && (
              <Typography variant="body1" fontWeight={'Bold'} sx={{ mr: { xs: 1, sm: 2 }, display: { xs: 'none', md: 'inline', sm: 'inline'} }}>
                Welcome, {user[0]?.user?.name}
              </Typography>
            )}
            {isLoggedIn ? (
              <Button color="inherit" variant='text' onClick={logout} sx={{position: 'absolute', ml: 1, right: 2}}>
                <LogoutIcon />
              </Button>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit" variant="text">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit" variant="text">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawerLinks}
      </Drawer>
    </>
  );
};

{/* <AppBar position="static" sx={{position: 'fixed', zIndex: 100, top: 0, left: 0, width: '100%'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movies.Cyclopedia
        </Typography>

        <Button component={Link} to="/" color="inherit" variant="text">
          Movie Listing
        </Button>

        <Button component={Link} to="/favorites" color="inherit" variant="text">
          Favorites
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {isLoggedIn ? (
          <>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Welcome, {user[0]?.user?.name}
            </Typography>
            <Button color="inherit" variant="outlined" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit" variant="text">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit" variant="text">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
     */}
export default Navbar;
