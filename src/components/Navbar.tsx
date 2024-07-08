import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSetState } from '../redux/userSlice';
import { useAuth } from '../utils/useAuth';

// interface NavbarProps {
//   isLoggedIn?: boolean;
//   username?: string;
// }

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLogin, setIsLogin, user} = useAuth()
  const isLoggedIn = isLogin

  const logout = () => {
    dispatch(logoutSetState())
    localStorage.removeItem('currentUser')
    setIsLogin(false)
    navigate('/login')
  }

  // console.log(isLoggedIn)

  return (
    <AppBar position="fixed" sx={{ zIndex: 100 }}>
      <Toolbar sx={{ maxWidth: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
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
            <Typography variant="body1" sx={{ mr: { xs: 1, sm: 2 } }}>
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
