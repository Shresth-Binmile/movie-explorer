import { Box, TextField, Typography } from "@mui/material"
import MovieCard from "../components/CommonMovieCard"
import Navbar from "../components/Navbar"
// import { useSelector } from "react-redux"
// import { RootState } from "../redux/store"
// import movies from '../data/movies.json'
import { useSearchBar } from "../utils/useSearchBar"
import { useAuth } from "../utils/useAuth"

const MovieListing = () => {

  // const userState = useSelector((state: RootState) => state.userReducer.name)
  const {searchText, setSearchText, results} = useSearchBar()
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
          results.map((movie, index) => (
            <MovieCard movie={movie} indx={index} key={index}/>
          ))
        }
      </Box>
    </>
  )
}

export default MovieListing