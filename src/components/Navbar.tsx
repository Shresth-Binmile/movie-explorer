import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn?: boolean;
  username?: string;
}

const Navbar = ({ isLoggedIn, username }:NavbarProps) => {
  return (
    <AppBar position="static" sx={{position: 'fixed', zIndex: 100, top: 0, left: 0, width: '100%'}}>
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
              Welcome, {username}
            </Typography>
            <Button color="inherit" variant="outlined">
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

export default Navbar;
