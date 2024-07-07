import { Box, TextField, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
// import { useSelector } from "react-redux"
// import { RootState } from "../redux/store"
import MovieCard from "../components/CommonMovieCard"
import movies from '../data/movies.json'
import { useSearchBar } from "../utils/useSearchBar"
import { useAuth } from "../utils/useAuth"

const FavoriteMovies = () => {

  // const userState = useSelector((state: RootState) => state.userReducer.name)
  const {searchText, setSearchText, indexes} = useSearchBar()
  const {isLogin, userState} = useAuth()
  const isLoggedIn = isLogin

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} username={`${userState}`} />
      <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box>
          <TextField
            id="standard-basic"
            placeholder="Search"
            variant="standard"
            fullWidth
            sx={{ width: 500 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {
            searchText && <Typography textAlign={"center"}>Showing Results for "{searchText}"</Typography>
          }
        </Box>
        {
          indexes.map((movie) => (
            <MovieCard movie={movies[movie]} indx={movie} />
          ))
        }
      </Box>
    </>
  )
}

export default FavoriteMovies